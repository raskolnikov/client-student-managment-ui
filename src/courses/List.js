import React, { useState, useEffect } from 'react'
import { Button, Icon, Grid } from 'semantic-ui-react';
import { getCoursesApiCall, deleteCourseApiCall } from '../_helpers/ApiCall'
import { history } from "../_helpers/";
import { getUrlParam } from '../_helpers/setUrlParams'
import CourseTable from '../_components/CourseTable'
import FilterTable from '../_components/FilterTable'
import confirmService from '../_helpers/confirmService';
import { alertService } from '../_services/alert.service'
import { convertErrorToMessage } from '../_helpers/parseServerError'


const List = () => {

    const [courses, setCourses] = useState([])
    const [isLoading, setLoading] = useState(false);
    const initialPage = parseInt(getUrlParam("page") || 1)
    const initalStatus = getUrlParam("status") || "ACTIVE"
    const initalSearchValue = getUrlParam("search") || ''
    const initalLimit = getUrlParam("limit") || "24"

    const [filterParams, setFilterParam] = useState({ offset: initialPage - 1, limit: initalLimit, status: initalStatus, search: initalSearchValue })

    useEffect(() => {

        setLoading(true);
        getCoursesApiCall(filterParams).then(res => {

            setCourses(res.data);

        }).catch(err => {

            alertService.error(convertErrorToMessage(err))

        }).finally(() => {

            setLoading(false);

        })

    }, [filterParams])


    const deleteCourse = async (course) => {

        const result = await confirmService.show({
            message: 'Are you sure of delete this course?'
        })

        if (result) {

            let examId = course.id;

            setLoading(true);

            deleteCourseApiCall(course.id).then(res => {

                let newCourseList = courses.filter(course => course.id !== examId)

                setCourses(newCourseList)

                alertService.success({ message: 'Course successfully deleted!' })

            }).catch(err => {

                alertService.error(convertErrorToMessage(err))

            }).finally(() => {

                setLoading(false);

            })
        }
    }

    const onChangeFilter = (filter) => {

        setFilterParam({ ...filterParams, ...filter })

    }

    return (

        <React.Fragment>
            <Grid>

                <Grid.Row columns="2">
                    <Grid.Column>
                        <FilterTable onChangeFilter={onChangeFilter} filterStatus={filterParams.status} defaultSearchValue={filterParams.search} />
                    </Grid.Column>
                    <Grid.Column>
                        <Button
                            floated='right' icon labelPosition='left' primary size='small' onClick={() => { history.push("/courses/new") }}>
                            <Icon name='course' /> Add Course
                    </Button>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row columns='1'>
                    <Grid.Column>
                        <CourseTable courses={courses} currentPage={filterParams.offset + 1} isLoading={isLoading} deleteCourse={deleteCourse} onChangeFilter={onChangeFilter} />
                    </Grid.Column>
                </Grid.Row>

            </Grid>

        </React.Fragment>

    )


}



export { List }
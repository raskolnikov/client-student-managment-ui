import React, { useEffect, useState } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import { history, convertErrorToMessage, getStudentCoursesApiCall, getUrlParam, deleteStudentCourseApiCall } from '../../_helpers'
import confirmService from '../../_helpers/confirmService'
import { alertService } from '../../_services'
import { StudentCoursesTable } from '../../_components/StudentCoursesTable'

const List = ({ studentId }) => {

    const [studentCourses, setStudentCourses] = useState([])
    const [isLoading, setLoading] = useState(false)
    const initialPage = parseInt(getUrlParam("page") || 1)
    const initalStatus = getUrlParam("status") || "ACTIVE"
    const initalSearchValue = getUrlParam("search") || ''

    const [filterParams, setFilterParam] = useState({ offset: initialPage - 1, status: initalStatus, search: initalSearchValue })

    useEffect(() => {

        setLoading(true)
        getStudentCoursesApiCall(studentId, filterParams).then(res => {

            setStudentCourses(res.data)

        }).catch(err => {

            alertService.error(convertErrorToMessage(err))

        }).finally(() => {

            setLoading(false)

        })

    }, [studentId])

    const deleteStudentCourse = async (studentCourse) => {

        const result = await confirmService.show({

            message: 'Are you sure of delete this student course?'

        })

        if (result) {

            let studentCourseId = studentCourse.id;

            setLoading(true);

            deleteStudentCourseApiCall(studentCourseId).then(res => {

                let newStudentCoursesList = studentCourses.filter(studentCourse => studentCourse.id !== studentCourseId)

                setStudentCourses(newStudentCoursesList)

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

            <h2 style={{ marginTop: "1em" }}>Student Courses</h2>
            <Grid>

                <Grid.Row Column='1'>
                    <Grid.Column>
                        <Button
                            floated='right' icon labelPosition='left' primary size='small' onClick={() => { history.push(`/students/${studentId}/courses/new/`) }}>
                            Add Student Course
                    </Button>
                    </Grid.Column>

                </Grid.Row>
                <Grid.Row columns='1'>
                    <Grid.Column>
                        <StudentCoursesTable studentCourses={studentCourses} currentPage={filterParams.offset + 1} isLoading={isLoading} deleteStudentCourse={deleteStudentCourse} onChangeFilter={onChangeFilter} />
                    </Grid.Column>
                </Grid.Row>

            </Grid>

        </React.Fragment>
    )

}


export { List }
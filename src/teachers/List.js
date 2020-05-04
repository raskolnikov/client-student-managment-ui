import React, { useState, useEffect, useContext } from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';
import { getTeachersApiCall, deleteTeacherApiCall } from '../_helpers/ApiCall'
import Context from '../_helpers/context'
import FlashMessage from '../_components/FlashMessage'
import { getUrlParam } from '../_helpers/setUrlParams'
import TeacherTable from '../_components/TeacherTable'
import FilterTable from '../_components/FilterTable'
import history from '../_helpers/history'
import confirmService from '../_helpers/confirmService';

/**
 * Created by Mehmet Aktas on 2020-03-10
 */

const StudentListPage = () => {

    const context = useContext(Context);

    const [teachers, setTeachers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const initialPage = parseInt(getUrlParam("page") || 1)
    const initalStatus = getUrlParam("status") || "ACTIVE"
    const initalSearchValue = getUrlParam("search") || ''

    const [filterParams, setFilterParam] = useState({ offset: initialPage - 1, status: initalStatus, search: initalSearchValue })

    useEffect(() => {

        setLoading(true);
        getTeachersApiCall(filterParams).then(res => {

            setTeachers(res.data);

            setLoading(false);

        }).catch(err => {

            context.flashErrorMessage(err)
            setLoading(false);

        })

    }, [filterParams])

    const deleteStudent = async (teacher) => {

        const result = await confirmService.show({
            message: 'Are you sure of delete this teacher?'
        })

        if (result) {

            let studentId = teacher.id;

            setLoading(true);

            deleteTeacherApiCall(teacher.id).then(res => {

                let newStudentList = teachers.filter(teacher => teacher.id !== studentId)

                setTeachers(newStudentList)

                setLoading(false);

            }).catch(err => {

                context.flashErrorMessage(err)
                setLoading(false);

            })
        }
    }


    const onChangeFilter = (filter) => {

        setFilterParam({ ...filterParams, ...filter })

    }

    return (

        <React.Fragment>

            {context.stateAuth.message && <FlashMessage message={context.stateAuth.message} />}

            <Grid>

                <Grid.Row columns="2">
                    <Grid.Column>
                        <FilterTable onChangeFilter={onChangeFilter} filterStatus={filterParams.status} defaultSearchValue={filterParams.search} />
                    </Grid.Column>
                    <Grid.Column>
                        <Button
                            floated='right' icon labelPosition='left' primary size='small' onClick={() => { history.push("/teachers/new") }}>
                            <Icon name='teacher' /> Add Teacher
                    </Button>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row columns='1'>
                    <Grid.Column>
                        <TeacherTable teachers={teachers} currentPage={filterParams.offset + 1} isLoading={isLoading} deleteStudent={deleteStudent} onChangeFilter={onChangeFilter} />
                    </Grid.Column>
                </Grid.Row>

            </Grid>

        </React.Fragment>

    )
}

export default StudentListPage
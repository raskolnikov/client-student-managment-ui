import React, { useState, useEffect, useContext } from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';
import { getStudentsApiCall, deleteStudentApiCall } from '../_helpers/ApiCall'
import Context from '../_helpers/context'
import FlashMessage from '../_components/FlashMessage'
import { getUrlParam } from '../_helpers/setUrlParams'
import StudentTable from '../_components/StudentTable'
import FilterTable from '../_components/FilterTable'
import history from '../_helpers/history'
import confirmService from '../_helpers/confirmService';

/**
 * Created by Mehmet Aktas on 2020-03-10
 */

const StudentListPage = () => {

    const context = useContext(Context);

    const [students, setStudents] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const initialPage = parseInt(getUrlParam("page") || 1)
    const initalStatus = getUrlParam("status") || "ACTIVE"
    const initalSearchValue = getUrlParam("search") || ''

    const [filterParams, setFilterParam] = useState({ offset: initialPage - 1, status: initalStatus, search: initalSearchValue })

    useEffect(() => {

        setLoading(true);
        getStudentsApiCall(filterParams).then(res => {

            setStudents(res.data);

            setLoading(false);

        }).catch(err => {

            context.flashErrorMessage(err)
            setLoading(false);

        })

    }, [filterParams])

    const deleteStudent = async (student) => {

        const result = await confirmService.show({
            message: 'Are you sure of delete this student?'
        })

        if (result) {

            let studentId = student.id;

            setLoading(true);

            deleteStudentApiCall(student.id).then(res => {

                let newStudentList = students.filter(student => student.id !== studentId)

                setStudents(newStudentList)

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
                            floated='right' icon labelPosition='left' primary size='small' onClick={() => { history.push("/students/new") }}>
                            <Icon name='student' /> Add Student
                    </Button>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row columns='1'>
                    <Grid.Column>
                        <StudentTable students={students} currentPage={filterParams.offset + 1} isLoading={isLoading} deleteStudent={deleteStudent} onChangeFilter={onChangeFilter} />
                    </Grid.Column>
                </Grid.Row>

            </Grid>

        </React.Fragment>

    )
}

export default StudentListPage
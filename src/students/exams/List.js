import React, { useEffect, useState } from 'react';
import { Grid, Button } from 'semantic-ui-react'
import { alertService } from '../../_services';
import { history, convertErrorToMessage, getStudentExamsApiCall, getUrlParam, deleteStudentExamApiCall } from '../../_helpers'
import { StudentExamsTable } from '../../_components'
import confirmService from '../../_helpers/confirmService';
import { render } from 'react-dom';


const List = ({ studentId }) => {

    const [studentExams, setStudentExams] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const initialPage = parseInt(getUrlParam("page") || 1)
    const initalStatus = getUrlParam("status") || "ACTIVE"
    const initalSearchValue = getUrlParam("search") || ''

    const [filterParams, setFilterParam] = useState({ offset: initialPage - 1, status: initalStatus, search: initalSearchValue })


    useEffect(() => {

        setLoading(false);
        getStudentExamsApiCall(studentId, filterParams).then((res) => {

            setStudentExams(res.data);

        }).catch((err) => {

            alertService.err(convertErrorToMessage(err))

        }).finally(() => {

            setLoading(false);

        })


    }, [studentId, filterParams]);

    const deleteStudentExam = async (studentExam) => {

        const result = await confirmService.show({message: "Are you sure of delete this student exam?"})

        if(result) {

            setLoading(true)
            
            const studentExamId = studentExam.id

            deleteStudentExamApiCall(studentExamId).then(res=>{

            }).catch(err=>{
                
                alertService.error(convertErrorToMessage(err))

            }).finally(()=>{

                setLoading(false)

            })
            
        }

    }

    const onChangeFilter = (filter) => {

        setFilterParam({ ...filterParams, ...filter })

    }
    
    return (


        <React.Fragment>

            <Grid>

                <Grid.Row Column='1'>
                    <Grid.Column>
                        <Button
                            floated='right' icon labelPosition='left' primary size='small' onClick={() => { history.push(`/students/${studentId}/exams/new/`) }}>
                            Add Student Exam
                </Button>
                    </Grid.Column>

                </Grid.Row>
                <Grid.Row columns='1'>
                    <Grid.Column>
                        <StudentExamsTable studentExams={studentExams} currentPage={filterParams.offset + 1} isLoading={isLoading} deleteStudentExam={deleteStudentExam} onChangeFilter={onChangeFilter} />
                    </Grid.Column>
                </Grid.Row>

            </Grid>

        </React.Fragment>

    )

}

export { List }
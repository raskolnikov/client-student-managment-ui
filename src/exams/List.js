import React, { useState, useEffect } from 'react'
import { Button, Icon, Grid } from 'semantic-ui-react';
import { getExamsApiCall, deleteExamApiCall } from '../_helpers/ApiCall'
import { history } from "../_helpers/";
import { getUrlParam } from '../_helpers/setUrlParams'
import ExamTable from '../_components/ExamTable'
import FilterTable from '../_components/FilterTable'
import confirmService from '../_helpers/confirmService';
import { alertService } from '../_services/alert.service'
import { convertErrorToMessage } from '../_helpers/parseServerError'


const List = () => {

    const [exams, setExams] = useState([])
    const [isLoading, setLoading] = useState(false);
    const initialPage = parseInt(getUrlParam("page") || 1)
    const initalStatus = getUrlParam("status") || "ACTIVE"
    const initalSearchValue = getUrlParam("search") || ''

    const [filterParams, setFilterParam] = useState({ offset: initialPage - 1, status: initalStatus, search: initalSearchValue })

    useEffect(() => {

        setLoading(true);
        getExamsApiCall(filterParams).then(res => {

            setExams(res.data);

        }).catch(err => {

            alertService.error(convertErrorToMessage(err))

        }).finally(() => {

            setLoading(false);

        })

    }, [filterParams])


    const deleteExam = async (exam) => {

        const result = await confirmService.show({
            message: 'Are you sure of delete this exam?'
        })

        if (result) {

            let examId = exam.id;

            setLoading(true);

            deleteExamApiCall(exam.id).then(res => {

                let newExamList = exams.filter(exam => exam.id !== examId)

                setExams(newExamList)

                alertService.success({ message: 'Exam successfully deleted!' })

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
                            floated='right' icon labelPosition='left' primary size='small' onClick={() => { history.push("/exams/new") }}>
                            Add Exam
                    </Button>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row columns='1'>
                    <Grid.Column>
                        <ExamTable exams={exams} currentPage={filterParams.offset + 1} isLoading={isLoading} deleteExam={deleteExam} onChangeFilter={onChangeFilter} />
                    </Grid.Column>
                </Grid.Row>

            </Grid>

        </React.Fragment>

    )


}



export { List }
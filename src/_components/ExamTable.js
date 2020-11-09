import React, { Fragment } from 'react'
import { Table, Loader } from 'semantic-ui-react'
import ExamTableRow from './ExamTableRow'
import CustomPagination from './CustomPagination'

const ExamTable = ({ isLoading, exams, deleteExam, currentPage, onChangeFilter }) => {

    const totalCount = exams.length

    return (
        <Fragment>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Course Id</Table.HeaderCell>
                        <Table.HeaderCell>Education Term</Table.HeaderCell>
                        <Table.HeaderCell>Exam Date</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                        <Table.HeaderCell>Taken Status</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {(
                        exams.map(exam => {

                            return <ExamTableRow exam={exam} key={exam.id} onClickDelete={deleteExam} />

                        })
                    )}

                </Table.Body>

                <Table.Footer>
                    <Table.Row>

                        <Table.HeaderCell colSpan='8'>
                            <CustomPagination totalCount={totalCount} current={currentPage} handleOnClick={onChangeFilter} />
                        </Table.HeaderCell>

                    </Table.Row>
                </Table.Footer>
            </Table>

            {isLoading && <Loader active />}

        </Fragment>
    )

}


export default ExamTable
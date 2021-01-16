import React, { Fragment } from 'react'
import { Table, Loader } from 'semantic-ui-react'
import CustomPagination from './CustomPagination'
import StudentExamTableRow from './StudentCourseTableRow'

const StudentExamsTable = ({ isLoading, studentExams, deleteStudentExam, currentPage, onChangeFilter }) => {

    const totalCount = studentExams.length

    return (
        <Fragment>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Course Name</Table.HeaderCell>
                        <Table.HeaderCell>Education Term</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {(
                        studentExams.map(studentExam => {

                            return <StudentExamTableRow studentExam={studentExam} key={studentExam.id} onClickDelete={deleteStudentExam} />

                        })
                    )}

                </Table.Body>

                <Table.Footer>
                    <Table.Row>

                        <Table.HeaderCell colSpan='6'>
                            <CustomPagination totalCount={totalCount} current={currentPage} handleOnClick={onChangeFilter} />
                        </Table.HeaderCell>

                    </Table.Row>
                </Table.Footer>
            </Table>

            {isLoading && <Loader active />}

        </Fragment>
    )

}


export { StudentExamsTable }
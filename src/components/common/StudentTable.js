import React, { Fragment } from 'react'
import { Table, Loader } from 'semantic-ui-react'
import StudentTableRow from './StudentTableRow'
import CustomPagination from './CustomPagination'

const StudentTable = ({ isLoading, students, deleteStudent, currentPage, onChangeFilter }) => {

    const totalCount = students.length

    return (
        <Fragment>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Mobile</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {(
                        students.map(student => {

                            return <StudentTableRow student={student} key={student.id} onClickDelete={deleteStudent} />

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


export default StudentTable
import React, { Fragment } from 'react'
import { Table, Loader } from 'semantic-ui-react'
import TeacherTableRow from './TeacherTableRow'
import CustomPagination from './CustomPagination'

const TeacherTable = ({ isLoading, teachers, deleteTeacher, currentPage, onChangeFilter }) => {

    const totalCount = teachers.length

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
                        teachers.map(teacher => {

                            return <TeacherTableRow teacher={teacher} key={teacher.id} onClickDelete={deleteTeacher} />

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


export default TeacherTable
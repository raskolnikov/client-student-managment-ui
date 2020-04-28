import React, { Fragment } from 'react'
import { Table, Loader } from 'semantic-ui-react'
import UserTableRow from './UserTableRow'
import CustomPagination from './CustomPagination'
import YesNoModal from './YesNoModal'

const UserTable = ({ isLoading, users, deleteUser, currentPage, onChangeFilter }) => {

    const totalCount = users.length

    return (
        <Fragment>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Mobile</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Role</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {(
                        users.map(user => {

                            return <UserTableRow user={user} onClickDelete={deleteUser} />

                        })
                    )}

                    {isLoading && <Loader active />}

                </Table.Body>

                <Table.Footer>
                    <Table.Row>

                        <Table.HeaderCell colSpan='6'>
                            <CustomPagination totalCount={totalCount} current={currentPage} handleOnClick={onChangeFilter} />
                        </Table.HeaderCell>

                    </Table.Row>
                </Table.Footer>
            </Table>
        </Fragment>
    )

}


export default UserTable
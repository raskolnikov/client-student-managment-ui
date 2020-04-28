import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const UserTableRow = ({ user, onClickDelete }) => {

    return (

        <Table.Row>
            <Table.Cell>{user.firstName}</Table.Cell>
            <Table.Cell>{user.lastName}</Table.Cell>
            <Table.Cell>{user.mobileNumber}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>

            <Table.Cell>
                <div className="ui two buttons">
                    <Link to={`/users/edit/${user.id}`} className="ui basic button green">Edit</Link>
                    <Button basic color="red" onClick={() => onClickDelete(user)}>Delete</Button>
                </div>
            </Table.Cell>

        </Table.Row>

    )

}

UserTableRow.propTypes = {

    user: PropTypes.object.isRequired,
    onClickDelete: PropTypes.func.isRequired

}


export default UserTableRow
import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const StudentTableRow = ({ student, onClickDelete }) => {

    return (

        <Table.Row>
            <Table.Cell>{student.firstName}</Table.Cell>
            <Table.Cell>{student.lastName}</Table.Cell>
            <Table.Cell>{student.mobileNumber}</Table.Cell>
            <Table.Cell>{student.email}</Table.Cell>
            <Table.Cell>{student.status}</Table.Cell>

            <Table.Cell>
                <div className="ui two buttons">
                    <Link to={`/students/edit/${student.id}`} className="ui basic button green">Edit</Link>
                    <Button basic color="red" onClick={() => onClickDelete(student)}>Delete</Button>
                </div>
            </Table.Cell>

        </Table.Row>

    )

}

StudentTableRow.propTypes = {

    user: PropTypes.object.isRequired,
    onClickDelete: PropTypes.func.isRequired

}


export default StudentTableRow
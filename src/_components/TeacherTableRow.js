import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const TeacherTableRow = ({ teacher, onClickDelete }) => {

    return (

        <Table.Row>
            <Table.Cell>{teacher.firstName}</Table.Cell>
            <Table.Cell>{teacher.lastName}</Table.Cell>
            <Table.Cell>{teacher.mobileNumber}</Table.Cell>
            <Table.Cell>{teacher.email}</Table.Cell>

            <Table.Cell>
                <div className="ui two buttons">
                    <Link to={`/teachers/edit/${teacher.id}`} className="ui basic button green">Edit</Link>
                    <Button basic color="red" onClick={() => onClickDelete(teacher)}>Delete</Button>
                </div>
            </Table.Cell>

        </Table.Row>

    )

}

TeacherTableRow.propTypes = {

    user: PropTypes.object.isRequired,
    onClickDelete: PropTypes.func.isRequired

}


export default TeacherTableRow
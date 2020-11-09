import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const CourseTableRow = ({ course, onClickDelete }) => {

    return (

        <Table.Row>
            <Table.Cell>{course.courseName}</Table.Cell>
            <Table.Cell>{course.credit}</Table.Cell>
            <Table.Cell>{course.status}</Table.Cell>

            <Table.Cell>
                <div className="ui two buttons">
                    <Link to={`/courses/edit/${course.id}`} className="ui basic button green">Edit</Link>
                    <Button basic color="red" onClick={() => onClickDelete(course)}>Delete</Button>
                </div>
            </Table.Cell>

        </Table.Row>

    )

}

CourseTableRow.propTypes = {

    exam: PropTypes.object.isRequired,
    onClickDelete: PropTypes.func.isRequired

}


export default CourseTableRow
import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const StudentCourseTableRow = ({ studentCourse, onClickDelete }) => {

    return (

        <Table.Row>
            <Table.Cell>{studentCourse.course.courseName}</Table.Cell>
            <Table.Cell>{studentCourse.educationTerm}</Table.Cell>
            <Table.Cell>{studentCourse.status}</Table.Cell>

            <Table.Cell>
                <div className="ui two buttons">
                    <Link to={`/students/${studentCourse.studentId}/courses/${studentCourse.id}/edit`} className="ui basic button green">Edit</Link>
                    <Button basic color="red" onClick={() => onClickDelete(studentCourse)}>Delete</Button>
                </div>
            </Table.Cell>

        </Table.Row>

    )

}

StudentCourseTableRow.propTypes = {

    studentExam: PropTypes.object.isRequired,
    onClickDelete: PropTypes.func.isRequired

}


export default StudentCourseTableRow
import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const StudentExamTableRow = ({ studentExam, onClickDelete }) => {

    return (

        <Table.Row>
            <Table.Cell>{studentExam.courseName}</Table.Cell>
            <Table.Cell>{studentExam.educationTerm}</Table.Cell>
            <Table.Cell>{studentExam.status}</Table.Cell>

            <Table.Cell>
                <div className="ui two buttons">
                    <Link to={`/students/exams/edit/${studentExam.id}`} className="ui basic button green">Edit</Link>
                    <Button basic color="red" onClick={() => onClickDelete(studentExam)}>Delete</Button>
                </div>
            </Table.Cell>

        </Table.Row>

    )

}

StudentExamTableRow.propTypes = {

    studentExam: PropTypes.object.isRequired,
    onClickDelete: PropTypes.func.isRequired

}


export default StudentExamTableRow
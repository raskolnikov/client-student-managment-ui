import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const ExamTableRow = ({ exam, onClickDelete }) => {

    return (

        <Table.Row>
            <Table.Cell>{exam.name}</Table.Cell>
            <Table.Cell>{exam.courseId}</Table.Cell>
            <Table.Cell>{exam.educationTerm}</Table.Cell>
            <Table.Cell>{exam.examDate}</Table.Cell>
            <Table.Cell>{exam.notes}</Table.Cell>
            <Table.Cell>{exam.takenStatus}</Table.Cell>
            <Table.Cell>{exam.status}</Table.Cell>

            <Table.Cell>
                <div className="ui two buttons">
                    <Link to={`/exams/edit/${exam.id}`} className="ui basic button green">Edit</Link>
                    <Button basic color="red" onClick={() => onClickDelete(exam)}>Delete</Button>
                </div>
            </Table.Cell>

        </Table.Row>

    )

}

ExamTableRow.propTypes = {

    exams: PropTypes.object.isRequired,
    onClickDelete: PropTypes.func.isRequired

}


export default ExamTableRow
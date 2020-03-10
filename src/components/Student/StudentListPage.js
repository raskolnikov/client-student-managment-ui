import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StudentList from './StudentList'

import { fetchStudents, deleteStudent } from '../../services/shelf/actions';

import './style.scss';
import { Card } from 'semantic-ui-react';

class StudentListPage extends Component {
    static propTypes = {
        fetchStudents: PropTypes.func.isRequired,
        students: PropTypes.array.isRequired
    }

    state = {
        isLoading: false
    }

    componentDidMount() {
        this.handleFetchStudents();
    }

    handleFetchStudents = () => {

        this.setState({ isLoading: true });

        this.props.fetchStudents(() => {
            this.setState({ isLoading: false });
        })
    }

    render() {

        const students = this.props.students;
        const isLoading = this.state.isLoading;

        return (
            <React.Fragment>
                {isLoading}
                <Card.Group>
                    <StudentList students={students} deleteStudent={this.props.deleteStudent}></StudentList>
                </Card.Group>
            </React.Fragment>

        )

    }
}

const mapStateToProps = state => ({
    students: state.shelf.students
});

export default connect(
    mapStateToProps,
    { fetchStudents, deleteStudent }
)(StudentListPage);
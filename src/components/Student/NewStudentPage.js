import React, { Component } from 'react';
import NewStudentForm from './NewStudentForm';
import { newStudent, saveStudent, fetchStudent, updateStudent } from '../../services/shelf/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';

class NewStudentPage extends Component {

    state = {
        redirect: false
    }

    componentDidMount() {

        const { id } = this.props.match.params;
        if (id) {

            this.props.fetchStudent(id);

        } else {

            this.props.newStudent();

        }

    }

    submit = (student) => {

        if (student.id) {

            return this.props.updateStudent(student)
                .then(response => this.setState({ redirect: true }))
                .catch(error => { throw new SubmissionError(this.props.errors) });


        } else {

            return this.props.saveStudent(student)
                .then(response => this.setState({ redirect: true }))
                .catch(err => {
                    throw new SubmissionError(this.props.errors)
                });
        }

    }


    render() {

        return (
            <div> {

                this.state.redirect ? <Redirect to="/" /> : <NewStudentForm student={this.props.student} loading={this.props.loading} onSubmit={this.submit} />

            }
            </div>
        )
    }


}

function mapStateToProps(state) {

    return {

        student: state.shelf.student,
        errors: state.shelf.errors,
        loading: state.shelf.loading

    }

}

export default connect(mapStateToProps, { newStudent, saveStudent, fetchStudent, updateStudent })(NewStudentPage);
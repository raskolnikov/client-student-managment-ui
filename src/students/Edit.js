import React, { useEffect, useReducer, useState } from 'react';
import { history, genderOptions, client } from "../_helpers/";
import { Form, Input, TextArea, Button, Select, Grid } from 'semantic-ui-react';

/**
 * Created by Mehmet Aktas on 2020-03-10
 */

const Edit = (props) => {

    const studentId = props.match.params.id;

    const initalState = {

        student: {},
        errors: [],
        isLoading: false

    }

    const [state, setState] = useState(initalState);


    useEffect(() => {

        client.get(`students/${studentId}`).then(res => {

            setState({ student: res.data });


        }).catch(err => {

            console.error(err);

        })


    }, [studentId]);

    const handleSubmit = (event) => {

        event.preventDefault();

        const newStudentRequest = {

            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            gender: event.target.gender,
            dateOfBirth: event.target.dateOfBirth.value,
            department: event.target.department.value,
            address: event.target.address.value,
            mobileNumber: event.target.mobileNumber.value,

        }

        client.put(`students/${studentId}`, newStudentRequest).then(res => {

            history.replace('/student/');

        }).catch(err => {

            console.log(err);

        })

    }

    const handleChange = event => {

        const value = event.target.value;
        const name = event.target.name;

        const student = { ...state.student, [name]: value };

        setState({ student: student });

    }

    return (

        <Grid centered columns={2}>
            <Grid.Column>
                <h1 style={{ marginTop: "1em" }}>Edit Student</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field name='firstName'
                            id='form-input-control-first-name'
                            control={Input}
                            label='First name'
                            placeholder='First name'
                            value={state.student.firstName}
                            onChange={handleChange}
                        />
                        <Form.Field name="lastName"
                            id='form-input-control-last-name'
                            control={Input}
                            label='Last name'
                            placeholder='Last name'
                            value={state.student.lastName}
                            onChange={handleChange}
                        />
                        <Form.Field name="gender"
                            control={Select}
                            id="gender"
                            options={genderOptions}
                            label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
                            placeholder='Gender'
                            search
                            searchInput={{ id: 'form-select-control-gender' }}
                            defaultValue={state.student.gender}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Field name='email'
                        id='form-input-control-error-email'
                        control={Input}
                        label='Email'
                        placeholder='joe@schmoe.com'
                        value={state.student.email}
                        onChange={handleChange}
                    />

                    <Form.Field name='address'
                        id='form-textarea-control-opinion'
                        control={TextArea}
                        label='Address'
                        placeholder='Address'
                        value={state.student.address}
                        onChange={handleChange}
                    />

                    <Form.Field name='mobileNumber'
                        id='form-input-control-error-mobile-number'
                        control={Input}
                        label='Mobile Number'
                        placeholder='07777777777'
                        value={state.student.mobileNumber}
                        onChange={handleChange}
                    />

                    <Form.Field name='department'
                        id='form-input-control-error-department'
                        control={Input}
                        label='Department'
                        placeholder='Computer Science'
                        value={state.student.department}
                        onChange={handleChange}
                    />

                    <Form.Field name='createdBy'
                        id='form-input-control-error-created-by'
                        control={Input}
                        label='Created By'
                        placeholder='David'
                        value={state.student.createdBy}
                        onChange={handleChange}
                    />


                    <Form.Field name='dateOfBirth'
                        id='form-input-control-error-date-of-birth'
                        control={Input}
                        label='Date Of Birth'
                        placeholder='2010-10-17'
                        value={state.student.dateOfBirth}
                        onChange={handleChange}
                    />

                    <Form.Field name='registerDate'
                        id='form-input-control-error-register-date'
                        control={Input}
                        label='Register Date'
                        placeholder='2010-10-17'
                        value={state.student.registerDate}
                        onChange={handleChange}
                    />

                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Confirm'
                        label='Label with htmlFor'
                    />
                </Form></Grid.Column></Grid>

    )

}

export { Edit };
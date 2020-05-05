import React, { useEffect, useReducer, useState } from 'react';
import { client, history, genderOptions, } from "../_helpers/";
import { Form, Input, TextArea, Button, Select, Grid } from 'semantic-ui-react';

/**
 * Created by Mehmet Aktas on 2020-02-1
 */

const Edit = (props) => {

    const teacherId = props.match.params.id;

    const initalState = {

        teacher: {},
        errors: [],
        isLoading: false

    }

    const [state, setState] = useState(initalState);


    useEffect(() => {

        client.get(`teachers/${teacherId}`).then(res => {

            setState({ teacher: res.data });


        }).catch(err => {

            console.error(err);

        })


    }, [teacherId]);

    const handleSubmit = (event) => {

        event.preventDefault();

        const newTeacherRequest = {

            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            gender: event.target.gender,
            dateOfBirth: event.target.dateOfBirth.value,
            department: event.target.department.value,
            address: event.target.address.value,
            mobileNumber: event.target.mobileNumber.value,

        }

        client.put(`teachers/${teacherId}`, newTeacherRequest).then(res => {

            history.replace('/teachers/');

        }).catch(err => {

            console.log(err);

        })

    }

    const handleChange = event => {

        const value = event.target.value;
        const name = event.target.name;

        const teacher = { ...state.teacher, [name]: value };

        setState({ 'teacher': teacher });

    }

    return (

        <Grid centered columns={2}>
            <Grid.Column>
                <h1 style={{ marginTop: "1em" }}>Edit Teacher</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field name='firstName'
                            id='form-input-control-first-name'
                            control={Input}
                            label='First name'
                            placeholder='First name'
                            value={state.teacher.firstName}
                            onChange={handleChange}
                        />
                        <Form.Field name="lastName"
                            id='form-input-control-last-name'
                            control={Input}
                            label='Last name'
                            placeholder='Last name'
                            value={state.teacher.lastName}
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
                            defaultValue={state.teacher.gender}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Field name='email'
                        id='form-input-control-error-email'
                        control={Input}
                        label='Email'
                        placeholder='joe@schmoe.com'
                        value={state.teacher.email}
                        onChange={handleChange}
                    />

                    <Form.Field name='address'
                        id='form-textarea-control-opinion'
                        control={TextArea}
                        label='Address'
                        placeholder='Address'
                        value={state.teacher.address}
                        onChange={handleChange}
                    />

                    <Form.Field name='mobileNumber'
                        id='form-input-control-error-mobile-number'
                        control={Input}
                        label='Mobile Number'
                        placeholder='07777777777'
                        value={state.teacher.mobileNumber}
                        onChange={handleChange}
                    />

                    <Form.Field name='department'
                        id='form-input-control-error-department'
                        control={Input}
                        label='Department'
                        placeholder='Computer Science'
                        value={state.teacher.department}
                        onChange={handleChange}
                    />

                    <Form.Field name='createdBy'
                        id='form-input-control-error-created-by'
                        control={Input}
                        label='Created By'
                        placeholder='David'
                        value={state.teacher.createdBy}
                        onChange={handleChange}
                    />


                    <Form.Field name='dateOfBirth'
                        id='form-input-control-error-date-of-birth'
                        control={Input}
                        label='Date Of Birth'
                        placeholder='2010-10-17'
                        value={state.teacher.dateOfBirth}
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
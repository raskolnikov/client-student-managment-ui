import React, { useState } from 'react';
import { history, registerUserApiCall, roleOptions } from "../_helpers/";
import { Form, Input, Button, Select, Grid } from 'semantic-ui-react';
import { Formik } from 'formik'
import { TextInput, SelectField } from '../_atoms'
import { Link } from 'react-router-dom'
import { alertService } from '../_services'
import { convertErrorToMessage, userFormValidationSchema } from '../_helpers'

/**
 * Created by Mehmet Aktas on 2020-04-11
 */


const Add = (props) => {

    const initialValues = {

        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        password: '',
        role: ''
    }

    const validationSchema = userFormValidationSchema(initialValues)

    const onSubmit = (fields, { setSubmitting }) => {

        alertService.clear()

        const newUser = {

            firstName: fields.firstName,
            lastName: fields.lastName,
            email: fields.email,
            mobileNumber: fields.mobileNumber,
            password: fields.password,
            role: fields.role
        }

        registerUserApiCall(newUser).then(res => {

            history.push("/users");

        }).catch(err => {

            alertService.error(convertErrorToMessage(err))

        }).finally(() => {

            setSubmitting(false)
        })

    }

    return (

        <div className="container" data-testid="register-page">
            <div className="row">
                <div className="col s12">
                    <Grid centered columns={1}>
                        <Grid.Column>
                            <h1 style={{ marginTop: "1em" }}>Add User</h1>


                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                {
                                    (formik) => (

                                        <Form onSubmit={formik.handleSubmit}>

                                            <TextInput
                                                id='form-input-control-firstName'
                                                name='firstName'
                                                placeholder='First Name'
                                            />

                                            <TextInput
                                                id='form-input-control-lastName'
                                                name='lastName'
                                                placeholder='Last Name'
                                            />

                                            <TextInput
                                                id='form-input-control-email'
                                                name='email'
                                                placeholder='Email'
                                            />

                                            <TextInput
                                                id='form-input-control-mobileNumber'
                                                name='mobileNumber'
                                                placeholder='Mobile Number'
                                            />

                                            <TextInput
                                                id='form-input-control-password'
                                                name='password'
                                                placeholder='Password'
                                            />

                                            <SelectField
                                                id='form-input-control-role'
                                                name='role'
                                                placeholder='Role'
                                                options={roleOptions}
                                            />

                                            <Button loading={formik.isSubmitting} type='submit'>Submit</Button>

                                            <Link to="."> Cancel </Link>

                                        </Form>
                                    )
                                }</Formik>

                        </Grid.Column></Grid>
                </div>
            </div>
        </div>
    )

}

export { Add }
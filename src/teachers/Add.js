import React, { useState } from 'react';
import { history, createTeacherApiCall, genderOptions } from "../_helpers/";
import { Form, Input, Button, Select, Grid } from 'semantic-ui-react';
import { Formik } from 'formik'
import { TextInput, SelectField } from '../_atoms'
import { Link } from 'react-router-dom'
import { alertService } from '../_services'
import { convertErrorToMessage, teacherFormValidationSchema } from '../_helpers'

/**
 * Created by Mehmet Aktas on 2020-04-11
 */


const Add = (props) => {

    const initialValues = {

        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        gender: '',
        dateOfBirth: '',
        department: '',
        address: ''
    }

    const validationSchema = teacherFormValidationSchema(initialValues)

    const onSubmit = (fields, { setSubmitting }) => {

        alertService.clear()

        const newTeacher = {

            firstName: fields.firstName,
            lastName: fields.lastName,
            email: fields.email,
            mobileNumber: fields.mobileNumber,
            gender: fields.gender,
            dateOfBirth: fields.dateOfBirth,
            department: fields.department,
            address: fields.address
        }

        createTeacherApiCall(newTeacher).then(res => {

            history.push("/teachers");

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
                            <h1 style={{ marginTop: "1em" }}>Add Teacher</h1>


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
                                                id='form-input-control-department'
                                                name='department'
                                                placeholder='Department'
                                            />

                                            <TextInput
                                                id='form-input-control-address'
                                                name='address'
                                                placeholder='Address'
                                            />


                                            <TextInput
                                                id='form-input-control-dateOfBirth'
                                                name='dateOfBirth'
                                                placeholder='Date Of Birth'
                                            />

                                            <SelectField
                                                id='form-input-control-gender'
                                                name='gender'
                                                placeholder='Gender'
                                                options={genderOptions}
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
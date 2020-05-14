import React, { useEffect, useState } from 'react'
import { Grid, Form, Button } from 'semantic-ui-react'
import { genderOptions, getStudentApiCall, updateStudentApiCall, convertErrorToMessage, studentFormValidationSchema } from '../_helpers/'
import { alertService } from '../_services'
import { Formik } from 'formik'
import { TextInput, SelectField } from '../_atoms'
import { Link } from 'react-router-dom'


const Edit = (props) => {

    const studentId = props.match.params.id;
    const [isLoading, setLoading] = useState(false);

    const initialValues = {

        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        gender: '',
        dateOfBirth: '',
        registerDate: '',
        address: ''
    }

    const [initialStudent, setiInitialStudent] = useState(initialValues)

    const validationSchema = studentFormValidationSchema(initialStudent)


    useEffect(() => {

        setLoading(true);
        getStudentApiCall(studentId).then(res => {

            initialValues.firstName = res.data.firstName
            initialValues.lastName = res.data.lastName
            initialValues.mobileNumber = res.data.mobileNumber
            initialValues.email = res.data.email
            initialValues.gender = res.data.gender
            initialValues.dateOfBirth = res.data.dateOfBirth
            initialValues.registerDate = res.data.registerDate
            initialValues.address = res.data.address

            setiInitialStudent(initialValues)

        }).catch(err => {

            alertService.error(convertErrorToMessage(err))

        }).finally(() => {

            setLoading(false);
        })

    }, [])

    const onSubmit = (fields, { setSubmitting }) => {

        alertService.clear()

        const student = {

            firstName: fields.firstName,
            lastName: fields.lastName,
            email: fields.email,
            mobileNumber: fields.mobileNumber,
            gender: fields.gender,
            dateOfBirth: fields.dateOfBirth,
            registerDate: fields.registerDate,
            address: fields.address
        }

        updateStudentApiCall(studentId, student).then(res => {

            alertService.success("Student saved successfully")

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
                            <h1 style={{ marginTop: "1em" }}>Edit Student</h1>


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
                                                id='form-input-control-registerDate'
                                                name='registerDate'
                                                placeholder='Register Date'
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

export { Edit }


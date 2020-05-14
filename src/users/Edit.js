import React, { useEffect, useState } from 'react'
import { Grid, Form, Button } from 'semantic-ui-react'
import { roleOptions, getUserApiCall, updateUserApiCall } from '../_helpers/'
import { alertService } from '../_services'
import { convertErrorToMessage, userFormValidationSchema } from '../_helpers'
import { Formik } from 'formik'
import { TextInput, SelectField } from '../_atoms'
import { Link } from 'react-router-dom'


const Edit = (props) => {

    const userId = props.match.params.id;
    const [isLoading, setLoading] = useState(false);

    const initialValues = {

        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        password: '',
        role: ''
    }

    const [initialUser, setiInitialUser] = useState(initialValues)

    const validationSchema = userFormValidationSchema(initialUser)


    useEffect(() => {

        setLoading(true);
        getUserApiCall(userId).then(res => {

            initialValues.firstName = res.data.firstName
            initialValues.lastName = res.data.lastName
            initialValues.mobileNumber = res.data.mobileNumber
            initialValues.email = res.data.email
            initialValues.password = res.data.password
            initialValues.role = res.data.role

            setiInitialUser(initialValues)

        }).catch(err => {

            alertService.error(convertErrorToMessage(err))

        }).finally(() => {

            setLoading(false);
        })

    }, [])

    const onSubmit = (fields, { setSubmitting }) => {

        alertService.clear()

        const user = {

            firstName: fields.firstName,
            lastName: fields.lastName,
            email: fields.email,
            mobileNumber: fields.mobileNumber,
            password: fields.password === initialUser.password ? null : fields.password,
            role: fields.role
        }

        updateUserApiCall(userId, user).then(res => {

            alertService.success("User saved successfully")

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
                            <h1 style={{ marginTop: "1em" }}>Edit User</h1>


                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                {
                                    (formik) => (

                                        <Form onSubmit={formik.handleSubmit} loading={isLoading || formik.isSubmitting}>

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
                                                type='password'
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

export { Edit }


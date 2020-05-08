import React from 'react'
import { Grid, Header, Button, Input, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { alertService } from '../_services'
import { convertErrorToMessage, forgotPasswordApiCall } from '../_helpers'
import * as Yup from 'yup'
import { Formik } from 'formik';
import { TextInput } from '../_atoms'

function ForgotPassword() {

    const initialValues = {
        logonName: ''
    }

    const validationSchema = Yup.object().shape({

        logonName: Yup.string().required('Email or mobile number is required')

    })

    function onSubmit({ logonName }, { setSubmitting }) {

        alertService.clear()

        const payload = { logonName: logonName }

        forgotPasswordApiCall(payload).then(response => {

            alertService.success('Please check your email for password reset instructions')

        }).catch(err => {

            alertService.error(convertErrorToMessage(err))

        }).finally(() => { setSubmitting(false) })

    }

    return (

        <Grid centered columns={1}>

            <Grid.Row>
                <Grid.Column width={8}>

                    <Header as='h3'>Forgot Password</Header>

                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {
                            (formik) => (

                                <Form onSubmit={formik.handleSubmit}>

                                    <TextInput
                                        id='form-input-control-logonName'
                                        name='logonName'
                                        placeholder='Email or Mobile Number'
                                    />

                                    <Button loading={formik.isSubmitting} type='submit'>Submit</Button>

                                    <Link to="login"> Cancel </Link>

                                </Form>

                            )
                        }

                    </Formik>

                </Grid.Column>
            </Grid.Row>
        </Grid>


    )

}

export { ForgotPassword }
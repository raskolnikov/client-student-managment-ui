import React, { useEffect, useContext, useState } from 'react';
import { Context, history, convertErrorToMessage, setAuthToken, loginApiCall } from "../_helpers/";
import jwtDecode from 'jwt-decode'
import { Grid, Form, Button, Header } from 'semantic-ui-react';
import { alertService } from '../_services/'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik } from 'formik';
import { TextInput } from '../_atoms'

const Login = ({ location }) => {

    const context = useContext(Context)

    useEffect(() => {

        if (context.stateAuth.user) {

            const { from } = location.state || { from: { pathname: "/users" } };
            history.push(from);

        }

    }, [context.stateAuth.user, location]);

    const initialValues = {

        logonName: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        logonName: Yup.string()
            .required('Email or mobile number is required'),
        password: Yup.string().required('Password is required')
    });


    function onSubmit({ logonName, password }, { setSubmitting }) {

        alertService.clear()

        const userData = {
            logonName: logonName,
            password: password
        }

        loginApiCall(userData).then((res) => {

            //const userToken = res.headers.get('Authorization');

            const { jwtToken } = res.data;

            localStorage.setItem("jwtToken", jwtToken);

            setAuthToken(jwtToken);

            // Decode token to get user data
            const currentUser = jwtDecode(jwtToken)
            // Set current user
            context.handleLoginSuccess(currentUser)

        }).catch(err => {

            alertService.error(convertErrorToMessage(err))

        }).finally(() => {

            setSubmitting(false)
        })
    }

    return (

        <Grid centered columns={1}>

            <Grid.Row>
                <Grid.Column width={8}>

                    <Header as='h3'>Login</Header>

                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {
                            (formik) => (

                                <Form onSubmit={formik.handleSubmit}>

                                    <TextInput
                                        id='form-input-control-logonName'
                                        name='logonName'
                                        placeholder='Email or Mobile Number'
                                    />

                                    <TextInput
                                        id='form-input-control-password'
                                        name='password'
                                        placeholder='Password'
                                        type='password'
                                    />

                                    <Button loading={formik.isSubmitting} type='submit'>Submit</Button>

                                    <Link to="login"> Cancel </Link>

                                </Form>

                            )
                        }

                    </Formik>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={8}>
                    <Link to="forgot-password">Forgot Password?</Link>
                </Grid.Column>
            </Grid.Row>

        </Grid>

    )

}

export { Login };
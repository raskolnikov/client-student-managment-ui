import React, { useEffect, useContext, useState } from 'react';
import Context from '../../utils/context';
import history from '../../utils/history';

import jwtDecode from 'jwt-decode'
import { setAuthToken } from '../../utils/authTokenActions';
import { loginApiCall } from '../../utils/ApiCall'
import { Grid, Form, Button, Checkbox, Icon, Header } from 'semantic-ui-react';
import { alertService } from '../../services/alert.service'
import { convertErrorToMessage } from '../../utils/parseServerError'


const Login = () => {

    const [errors, setErrors] = useState([]);
    const context = useContext(Context)
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

        if (context.stateAuth.user) {

            history.push("/users");

        }

    }, [context.stateAuth.user]);


    const loginUser = (userData) => {

        setLoading(true)

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

            setLoading(false)
        })

    }


    const onSubmit = (event) => {

        event.preventDefault()

        alertService.clear()

        const { logonName, password } = event.target.elements
        const userData = {
            logonName: logonName.value,
            password: password.value,
        }

        // since we handle the redirect within our component,
        // we don't need to pass in this.props.history as a parameter
        loginUser(userData);
    }

    return (

        <Grid centered columns={1}>

            <Grid.Row>
                <Grid.Column width={8}>

                    <Header as='h3'>Login</Header>

                    <Form onSubmit={onSubmit} loading={isLoading}>
                        <Form.Field>
                            <label>Email/Mobile Number</label>
                            <input placeholder='Email/Mobile Number' name='logonName' />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input type="password" placeholder='Password' name='password' />
                        </Form.Field>

                        <Button type='submit'>Login</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    )

}

export default Login;
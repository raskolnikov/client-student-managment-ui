import React, { useState } from 'react';
import { TextInputField } from '../atom/TextInputField';
import LoginButton from '../atom/Button';
import { Form, Input, TextArea, Button, Select, Grid } from 'semantic-ui-react';
import Login from './Login';

const LoginForm = (props) => {

    const { onSubmit, errors } = props;

    const [logonName, setLogonName] = useState('');
    const [password, setPassword] = useState('');

    return (

        <Grid centered columns={2}>
            <Grid.Column>

                <form noValidate onSubmit={onSubmit}>

                    <TextInputField
                        label="Email/Mobile Number/Username"
                        name="logonName"
                        type="text"
                        onChange={setLogonName}
                        value={logonName}
                        error={errors.email || errors.emailnotfound}
                    />

                    <TextInputField
                        label="Password"
                        name="password"
                        type="password"
                        onChange={setPassword}
                        value={password}
                    />

                    <LoginButton type="submit" text="Log in" />


                </form> </Grid.Column></Grid>
    )


}

export default LoginForm;
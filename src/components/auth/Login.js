import React, { useEffect, useContext, useState } from 'react';
import LoginForm from './LoginForm';
import Context from '../../utils/context';
import history from '../../utils/history';

import jwtDecode from 'jwt-decode'
import { setAuthToken } from '../../utils/authTokenActions';
import { loginApiCall } from '../../utils/ApiCall'


const Login = () => {

    const [errors, setErrors] = useState([]);
    const context = useContext(Context)

    useEffect(() => {

        if (context.authObj.isAuthenticated()) {

            history.push("/users");

        }

    }, [context.authObj.currentUser]);


    const loginUser = (userData) => {

        loginApiCall(userData).then((res) => {

            //const userToken = res.headers.get('Authorization');
            
            const { jwtToken } = res.data;
            
            localStorage.setItem("jwtToken", jwtToken);
            
            setAuthToken(jwtToken);
            
            // Decode token to get user data
            const currentUser = jwtDecode(jwtToken)
            
            // Set current user
            context.authObj.setCurrentUser(currentUser)
            context.handleLoginSuccess(currentUser)

        })

    }


    const onSubmit = (event) => {

        event.preventDefault()
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
        <div className="container" data-testid="login-page">
            <div style={{ marginTop: '4rem' }} className="row">
                <div className="col s6">
                    <LoginForm onSubmit={onSubmit} errors={errors} />
                </div>
            </div>
        </div>
    )

}

export default Login;
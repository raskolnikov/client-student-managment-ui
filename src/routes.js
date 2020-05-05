import React, { useContext, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from 'react-router';
import { Container } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode'
import { Alert, Header, PrivateRoute } from './_components'
import { Context, history, setAuthToken, removeAuthToken } from "./_helpers/";
import { Login } from "./account/Login";
import { Users } from './users'
import { Students } from './students'
import { Teachers } from './teachers'

const Routes = () => {

    const { pathname } = useLocation();
    const context = useContext(Context);
    useEffect(() => {

        if (localStorage.jwtToken) {

            const jwtToken = localStorage.jwtToken;
            // Decode token to get user data
            const currentUser = jwtDecode(jwtToken)

            // Set current user
            context.handleLoginSuccess(currentUser)
            setAuthToken(jwtToken);

            // Check for expired token
            const currentTime = Date.now() / 1000 // to get in milliseconds
            if (currentUser.exp < currentTime) {

                removeAuthToken();
                // Logout user
                context.handleLogout()

                // Redirect to login
                history.push("/login");
            }
        }

    }, [])


    return (

        <div>

            <div>

                <Container textAlign='center'>
                    <Header />

                    <Alert />

                    <Switch>
                        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute path="/students" component={Students} />
                        <PrivateRoute path="/teachers" component={Teachers} />
                        <PrivateRoute path="/users" component={Users} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Container>

            </div>

        </div>
    )

}

export default Routes;
import React, { useContext, useEffect } from "react";
import Context from "./_helpers/context";
import history from './_helpers/history';
import Header from './_components/Header';
import { Router, Route, Switch} from 'react-router';
import { Container } from 'semantic-ui-react';
import Login from "./components/layout/Login";
import PrivateRoute from "./_components/PrivateRoute";
import { Alert } from './_components/Alert'

import jwtDecode from 'jwt-decode'
import { setAuthToken, removeAuthToken } from './_helpers/authTokenActions';
import { Users } from './users/Index'
import { Students } from './students/Index'
import {Teachers} from './teachers/Index'

const Routes = () => {

    //const {pathname} = useLocation();
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
            <Router history={history} >
                <div>

                    <Container textAlign='center'>
                        <Header />

                        <Alert />

                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <PrivateRoute path="/students" component={Students} />
                            <PrivateRoute path="/teachers" component={Teachers} />
                            <PrivateRoute path="/users" component={Users} />
                        </Switch>
                    </Container>

                </div>


            </Router>

        </div>
    )

}

export default Routes;
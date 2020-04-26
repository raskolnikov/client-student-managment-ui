import React, { useContext, useEffect } from "react";
import Context from "./utils/context";
import history from './utils/history';
import Header from './components/Header';
import { Router, Route, Switch, Redirect } from 'react-router';
import { Container } from 'semantic-ui-react';
import StudentListPage from './components/layout/StudentListPage';
import NewStudentPage from './components/layout/NewStudentPage';
import EditStudentPage from './components/layout/EditStudentPage';
import TeacherListPage from './components/layout/TeacherListPage';
import NewTeacherPage from './components/layout/NewTeacherPage';
import EditTeacherPage from './components/layout/EditTeacherPage';
import Login from "./components/auth/Login";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import Navbar from "./components/layout/Navbar";

import jwtDecode from 'jwt-decode'
import { setAuthToken, removeAuthToken } from './utils/authTokenActions';
import NewUserPage from "./components/layout/NewUserPage";
import UserListPage from "./components/layout/UserListPage";

const Routes = () => {

    const context = useContext(Context);

    if (localStorage.jwtToken) {

        const jwtToken = localStorage.jwtToken;
        // Decode token to get user data
        const currentUser = jwtDecode(jwtToken)

        // Set current user
        context.authObj.setCurrentUser(currentUser)
        setAuthToken(jwtToken);

        // Check for expired token
        const currentTime = Date.now() / 1000 // to get in milliseconds
        if (currentUser.exp < currentTime) {

            removeAuthToken();
            // Logout user
            context.handleLogout()
            context.authObj.setCurrentUser(null)

            // Redirect to login
            history.push("/login");
        }
    }

    return (

        <div>
            <Router history={history} >

                <br />
                <div>


                    <Container textAlign='center'>
                        <Header />

                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <PrivateRoute exact path="/students" component={StudentListPage} />
                            <PrivateRoute exact path="/students/new" component={NewStudentPage} />
                            <PrivateRoute exact path="/students/edit/:id" component={EditStudentPage} />
                            <PrivateRoute exact path="/teachers/" component={TeacherListPage} />
                            <PrivateRoute exact path="/teachers/new" component={NewTeacherPage} />
                            <PrivateRoute exact path="/teachers/edit/:id" component={EditTeacherPage} />
                            <PrivateRoute exact path="/users/new" component={NewUserPage} />
                            <PrivateRoute exact path="/users" component={UserListPage} />
                        </Switch>
                    </Container>

                </div>


            </Router>

        </div>
    )

}

export default Routes;
import React, { useContext, useEffect } from "react";
import Context from "./utils/context";
import history from './utils/history';
import Header from './components/Header';
import { Router, Route, Switch, Redirect } from 'react-router';
import { Container } from 'semantic-ui-react';
import StudentListPage from './components/Student/StudentListPage';
import NewStudentPage from './components/Student/NewStudentPage';
import EditStudentPage from './components/Student/EditStudentPage';
import TeacherListPage from './components/Teacher/TeacherListPage';
import NewTeacherPage from './components/Teacher/NewTeacherPage';
import EditTeacherPage from './components/Teacher/EditTeacherPage';
import Login from "./components/auth/Login";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import Navbar from "./components/layout/Navbar";

import jwtDecode from 'jwt-decode'
import { setAuthToken, removeAuthToken } from './utils/authTokenActions';
import NewUserPage from "./components/auth/NewUserPage";

const Routes = () => {

    const context = useContext(Context);

    useEffect(() => {

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
                context.logoutUser()
                context.authObj.setCurrentUser(null)
                // Redirect to login
                window.location.href = './'
            }
        }

    }, [context.authObj.currentUser])


    return (

        <div>
            <Router history={history} >

                <br />
                <div>

                    <Route exact path="/login" component={Login} />

                    <Container textAlign='center'>
                        <Header />
                        School Managment System
                            <Switch>
                            <PrivateRoute exact path="/students" component={StudentListPage} />
                            <PrivateRoute exact path="/students/new" component={NewStudentPage} />
                            <PrivateRoute exact path="/students/edit/:id" component={EditStudentPage} />
                            <PrivateRoute exact path="/teachers/" component={TeacherListPage} />
                            <PrivateRoute exact path="/teachers/new" component={NewTeacherPage} />
                            <PrivateRoute exact path="/teachers/edit/:id" component={EditTeacherPage} />
                            <PrivateRoute exact path="/users/new" component={NewUserPage} />

                        </Switch>
                    </Container>

                </div>


            </Router>

        </div>
    )

}

export default Routes;
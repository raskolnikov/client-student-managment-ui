import React, { useContext, useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from 'react-router';
import { Container, Grid, Segment, Header as SmHeader } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode'
import { Alert, Header, PrivateRoute } from './_components'
import { Context, history, setAuthToken, removeAuthToken } from "./_helpers/";
import { Users } from './users'
import { Students } from './students'
import { Teachers } from './teachers'
import { Account } from "./account";
import { Reports } from "./report";
import { Exams } from "./exams";
import { Courses } from "./courses";

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
                history.push("/account/login");
            }
        }else {

            // Redirect to login
            history.push("/account/login");
            
        }

    }, [])


    return (

        <div>

            <div>

                <Container textAlign='center'>

                    <Grid>

                        <Grid.Row>

                            <Grid.Column width={16}>
                                <br />
                                <SmHeader as='h2' content='School Managment System' />

                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Column width={4}>

                            <Header />

                        </Grid.Column>

                        <Grid.Column stretched width={12}>
                            <Segment>

                                <Alert />

                                <Switch>
                                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                                    <PrivateRoute path="/students" component={Students} />
                                    <PrivateRoute path="/teachers" component={Teachers} />
                                    <PrivateRoute path="/users" component={Users} />
                                    <PrivateRoute path="/reports" component={Reports} />
                                    <PrivateRoute path="/exams" component={Exams} />
                                    <Route path="/account" component={Account} />
                                    <Route path="/courses" component={Courses} />
                                    <Redirect from="*" to="/" />
                                </Switch>

                            </Segment>
                        </Grid.Column>

                    </Grid>



                </Container>

            </div>

        </div>
    )

}

export default Routes;
import React, { useContext } from "react";
import Context from "./utils/context";
import history from './utils/history';
import Header from './components/Header';
import { Router, Route, Switch, Redirect } from 'react-router';

import StudentListPage from './components/Student/StudentListPage';
import NewStudentPage from './components/Student/NewStudentPage';
import TeacherListPage from './components/Teacher/TeacherListPage';
import NewTeacherPage from './components/Teacher/NewTeacherPage';


const Routes = () => {

    const context = useContext(Context);

    return (

        <div>
            <Router history={history} >
                <Header />

                <br />
                <div>

                    <Switch>

                        <Route exact path="/" component={StudentListPage} />
                        <Route path="/students/new" component={NewStudentPage} />
                        <Route path="/students/edit/:id" component={NewStudentPage} />
                        <Route exact path="/teachers/" component={TeacherListPage} />
                        <Route exact path="/teachers/new" component={NewTeacherPage} />

                    </Switch>

                </div>


            </Router>

        </div>
    )

}

export default Routes;
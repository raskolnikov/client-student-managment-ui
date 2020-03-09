import React, { useContext } from "react";
import Context from "./utils/context";
import history from './utils/history';
import Header from './components/Header';
import { Router, Route, Switch, Redirect } from 'react-router';

import StudentListPage from './components/Shelf/StudentListPage';
import NewStudentPage from './components/NewStudentPage';
import TeacherListPage from './components/Teacher/TeacherListPage';


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

                    </Switch>

                </div>


            </Router>

        </div>
    )

}

export default Routes;
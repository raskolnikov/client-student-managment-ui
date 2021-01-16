import React from 'react'
import { Route, Switch } from 'react-router-dom';
import {List} from './List'
import {Add} from './Add'
import {Edit} from './Edit'
import {Courses} from './courses/'


const Students = ({ match }) => {
    const { path } = match;
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/new`} component={Add} />
            <Route path={`${path}/edit/:id`} component={Edit} />
            <Route path={`${path}/:id/courses`} component={Courses} />
        </Switch>
    );

}

export { Students }
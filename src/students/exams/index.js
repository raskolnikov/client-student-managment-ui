import React from 'react';
import { Route, Switch } from 'react-router';
import { List } from './List'
import { Edit } from './Edit'


const Exams = ({ match }) => {

    const { path } = match;

    return (

        <Switch>

            <Route exact path={path} component={List} />
            <Route path={`${path}/new`} component={Add} />
            <Route path={`${path}/edit/:id`} component={Edit} />

        </Switch>

    )

}

export { Exams };
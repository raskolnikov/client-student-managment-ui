import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { List } from './List'
import { Add } from './Add'
import { Edit } from './Edit'

const Users = ({ match }) => {
    const { path } = match;
    return (

        

        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/new`} component={Add} />
            <Route path={`${path}/edit/:id`} component={Edit} />
        </Switch>
    );

}

export { Users }
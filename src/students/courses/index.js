import React from 'react'
import { Switch, Route } from 'react-router'
import { Add } from './Add'
import { List } from './List'
import { Edit } from './Edit'

const Courses = ({ match }) => {
    
    const { path } = match

    return (

        <Switch>

            <Route exact path={path} component={List} />
            <Route path={`${path}/new`} component={Add} />
            <Route path={`${path}/:id/edit`} component={Edit} />

        </Switch>
    )

}

export { Courses }

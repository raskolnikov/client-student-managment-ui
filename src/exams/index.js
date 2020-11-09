    import React from 'react'
    import { Switch, Route } from 'react-router'
    import { List } from './List'
    import { Edit } from './Edit'
    import { Add } from './Add'

    const Exams = ({ match }) => {

        const { path } = match

        return (

            <Switch>

                <Route exact path={path} component={List} />
                <Route path={`${path}/new`} component={Add} />
                <Route path={`${path}/edit/:id`} component={Edit} />

            </Switch>

        )

    }


    export { Exams }
import React from 'react'
import { Switch, Route } from 'react-router'

import { DashBoard } from './DashBoard'


const Reports = ({ match }) => {

    const { path } = match

    return (

        <Switch>
            <Route exact path={path} component={DashBoard} />
        </Switch>)



}

export { Reports }
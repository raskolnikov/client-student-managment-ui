import React, { useEffect, useContext } from "react"
import { Context } from '../_helpers'
import { Switch, Route } from "react-router-dom"
import { Login } from './Login'
import { ForgotPassword } from './ForgotPassword'



function Account({ history, match }) {

    const { path } = match
    const context = useContext(Context)

    useEffect(() => {

        if (context.stateAuth.user) {
            history.push('/')
        }

    }, [])

    return (
        <Switch>
            <Route path={`${path}/login`} component={Login} />
            <Route path={`${path}/forgot-password`} component={ForgotPassword} />
        </Switch>
    )

}

export { Account }
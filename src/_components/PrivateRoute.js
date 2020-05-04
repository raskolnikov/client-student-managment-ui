import React, { useContext } from 'react'
import { Route, Redirect } from "react-router"
import Context from '../_helpers/context';


const PrivateRoute = ({ component: Component, roles, ...rest }) => {

    const context = useContext(Context)

    return (
        <Route
            {...rest}

            render={(props) => {

                const user = context.stateAuth.user

                if (!user) {
                    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                }

                if (roles && roles.indexOf(user.role) === -1) {

                    return <Redirect to={{ pathname: '/' }} />
                }

                return <Component {...props} />
            }} />

    )
}

export default PrivateRoute


import React, { useContext } from 'react'
import { Route, Redirect } from "react-router"
import Context from '../../utils/context';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const context = useContext(Context)

    return (
        <Route
            {...rest}

            render={(props) => context.authObj.isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />}/>)

}

export default PrivateRoute


import React, { useEffect, useState, Fragment, useContext } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Context, Role } from "../_helpers/";
import { Button } from 'semantic-ui-react';


const Header = () => {

    const context = useContext(Context)
    const [user, setUser] = useState(null)

    useEffect(() => {

        setUser(context.stateAuth.user)

    }, [context.stateAuth.user])

    if (!user) {
        return null
    }

    const role = user.role.toLowerCase()

    return (

        <Fragment>

            <div className="ui four item menu">

                <NavLink className="item" to='/students'>Students</NavLink>
                <NavLink className="item" to='/teachers'> Teachers</NavLink>
                {role === Role.ADMIN && (

                    <NavLink className="item" to='/users'> Users</NavLink>
                )}
                <Button className="item red" onClick={context.handleLogout}> Logout</Button>

            </div>

        </Fragment>
    )
}


export { Header };
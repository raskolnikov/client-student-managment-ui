import React, { useEffect, useState, Fragment, useContext } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Context, Role } from "../_helpers/";
import { Button, Menu } from 'semantic-ui-react';


const Header = () => {

    const context = useContext(Context)
    const [user, setUser] = useState(null)
    const [activeItem, setActiveItem] = useState('bio')

    useEffect(() => {

        setUser(context.stateAuth.user)

    }, [context.stateAuth.user])

    if (!user) {
         return null
    }
    
    const role = user.role.toLowerCase()

    const handleItemClick = (e, { name }) => {

        setActiveItem(name)

    }


    return (

        <Fragment>

            <Menu fluid vertical tabular>
                <Menu.Item as={NavLink}
                    to='/students'
                    name='students'
                />
                <Menu.Item
                    as={NavLink}
                    to='/teachers'
                    name='teachers'
                />

                <Menu.Item
                    as={NavLink}
                    to='/courses'
                    name='courses'
                />

                <Menu.Item
                    as={NavLink}
                    to='/exams'
                    name='exams'
                />

                <Menu.Item
                    as={NavLink}
                    to='/reports'
                    name='reports'
                />

                {role === Role.ADMIN && (

                    <Menu.Item
                        as={NavLink}
                        to='/users'
                        name='users'
                    />
                )}

                <Menu.Item
                    className="item red"
                    name='Logout'
                    onClick={context.handleLogout}
                />
            </Menu>

        </Fragment>
    )
}


export { Header };
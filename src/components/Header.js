import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

    return (

        <div className="ui four item menu">
            <NavLink className="item" to='/students'>
                Students
          </NavLink>
            <NavLink className="item" to='/teachers'>
                Teachers
          </NavLink>
            <NavLink className="item" to='/users'>
                Users
          </NavLink>

        </div>

    )

}


export default Header;
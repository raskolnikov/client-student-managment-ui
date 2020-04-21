import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

    return (

        <div className="ui four item menu">
            <NavLink className="item" to='/students'>
                Students
          </NavLink>
            <NavLink className="item" to='/students/new'>
                Add Student
          </NavLink>
            <NavLink className="item" to='/teachers'>
                Teachers
          </NavLink>
            <NavLink className="item" to='/teachers/new'>
                Add Teacher
          </NavLink>
            <NavLink className="item" to='/users/new'>
                Add User
          </NavLink>

        </div>

    )

}


export default Header;
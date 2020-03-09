import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return (

        <div>
            <Link to='/' style={{ padding: '5px' }}>
                Students
          </Link>
            <Link to='/students/new' style={{ padding: '5px' }}>
                Add Student
          </Link>
            <Link to='/teachers' style={{ padding: '5px' }}>
                Teachers
          </Link>
            <Link to='/teachers/new' style={{ padding: '5px' }}>
                Add Teacher
          </Link>


        </div>

    )

}


export default Header;
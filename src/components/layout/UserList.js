import React from 'react'
import PropTypes from 'prop-types'
import UserCard from './UserCard'

export const UserList = ({ users, deleteUser }) => {

    return (

        users.map(user => {
            return <UserCard user={user} key={user.id} deleteUser={deleteUser} />
        })
    )
}

UserList.propTypes = {

    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    deleteUser: PropTypes.func.isRequired
}

export default UserList
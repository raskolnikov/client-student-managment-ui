import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react';

const UserCard = ({ user, deleteUser }) => {

  return (

    <Card>
      <Card.Content>

        <Card.Header>
          <Icon name='user outline' /> {user.firstName + ' ' + user.lastName}
        </Card.Header>

        <Card.Description>
          <p> <Icon name='phone' /> {user.mobileNumber}</p>
          <p> <Icon name='mail outline' />  {user.email} </p>
        </Card.Description>

      </Card.Content>

      <Card.Content extra>

        <div className="ui two buttons">
          <Link to={`/users/edit/${user.id}`} className="ui basic button green">Edit</Link>
          <Button basic color="red" onClick={() => deleteUser(user)}>Delete</Button>
        </div>

      </Card.Content>

    </Card>

  );

}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired
};

export default UserCard;
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react';


const StudentCard = ({ product: student }) => {

  return (

    <Card>
      <Card.Content>

        <Card.Header>
          <Icon name='user outline' /> {student.name + ' ' + student.surname}
        </Card.Header>

        <Card.Description>
          <p> <Icon name='phone' /> {student.phone}</p>
          <p> <Icon name='mail outline' />  {student.email} </p>
        </Card.Description>

      </Card.Content>

      <Card.Content extra>

        <div className="ui two buttons">
          <Button basic color="green">Edit</Button>
          <Button basic color="red">Delete</Button>
        </div>

      </Card.Content>

    </Card>

  );

}

StudentCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default StudentCard;
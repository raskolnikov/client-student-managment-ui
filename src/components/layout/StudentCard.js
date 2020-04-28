import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react';

/**
 * Created by Mehmet Aktas on 2020-04-02
 */

const StudentCard = ({ student, deleteStudent }) => {

  return (

    <Card>
      <Card.Content>

        <Card.Header>
          <Icon name='user outline' /> {student.firstName + ' ' + student.lastName}
        </Card.Header>

        <Card.Description>
          <p> <Icon name='phone' /> {student.mobileNumber}</p>
          <p> <Icon name='mail outline' />  {student.email} </p>
        </Card.Description>

      </Card.Content>

      <Card.Content extra>

        <div className="ui two buttons">
          <Link to={`/students/edit/${student.id}`} className="ui basic button green">Edit</Link>
          <Button basic color="red" onClick={()=> deleteStudent(student)}>Delete</Button>
        </div>

      </Card.Content>

    </Card>

  );

}

StudentCard.propTypes = {
  student: PropTypes.object.isRequired,
  deleteStudent: PropTypes.func.isRequired
};

export default StudentCard;
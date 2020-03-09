import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const TeacherCard = ({ teacher }) => {

    return (

        <Card>
            <Card.Content>

                <Card.Header>
                    <Icon name='user outline' /> {teacher.firstName + ' ' + teacher.lastName}
                </Card.Header>

                <Card.Description>
                    <p> <Icon name='phone' /> {teacher.mobileNumber}</p>
                    <p> <Icon name='mail outline' />  {teacher.email} </p>
                </Card.Description>

            </Card.Content>

            <Card.Content extra>

                <div className="ui two buttons">
                    <Link to={`/teachers/edit/${teacher.id}`} className="ui basic button green">Edit</Link>
                    <Button basic color="red" onClick="">Delete</Button>
                </div>

            </Card.Content>

        </Card>


    )

}

export default TeacherCard;
import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { Form, Input, TextArea, Button, Select, Grid } from 'semantic-ui-react';
import genderOptions from '../../utils/genderOptions';
import { client } from '../../utils/util';
import history from '../../utils/history';


const NewStudentPage = () => {

    const initialState = {

    }

    const [state, setState] = useState(initialState);

    useEffect(() => {

        Moment.locale('en');
        momentLocalizer();

    }, []);

    const handleSubmit = (event) => {

        event.preventDefault();

        const newStudentRequest = {

            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            gender: event.target.gender,
            dateOfBirth: event.target.dateOfBirth.value,
            registerDate: event.target.registerDate.value,
            address: event.target.address.value,
            mobileNumber: event.target.mobileNumber.value,
            createdBy: event.target.createdBy.value

        }

        client.post("students/", newStudentRequest).then(res => {

            history.replace('/students/');

        }).catch(err => {

            console.log(err);

        })

    }

    return (

        <Grid centered columns={2}>
            <Grid.Column>
                <h1 style={{ marginTop: "1em" }}>Add New Student</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field name='firstName'
                            id='form-input-control-first-name'
                            control={Input}
                            label='First name'
                            placeholder='First name'
                        />
                        <Form.Field name="lastName"
                            id='form-input-control-last-name'
                            control={Input}
                            label='Last name'
                            placeholder='Last name'
                        />
                        <Form.Field name="gender"
                            control={Select}
                            options={genderOptions}
                            label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
                            placeholder='Gender'
                            search
                            searchInput={{ id: 'form-select-control-gender' }}
                        />
                    </Form.Group>

                    <Form.Field name='email'
                        id='form-input-control-error-email'
                        control={Input}
                        label='Email'
                        placeholder='joe@schmoe.com'
                    />

                    <Form.Field name='address'
                        id='form-textarea-control-opinion'
                        control={TextArea}
                        label='Address'
                        placeholder='Address'
                    />

                    <Form.Field name='mobileNumber'
                        id='form-input-control-error-mobile-number'
                        control={Input}
                        label='Mobile Number'
                        placeholder='07777777777'
                    />

                    <Form.Field name='createdBy'
                        id='form-input-control-error-created-by'
                        control={Input}
                        label='Created By'
                        placeholder='David'
                    />


                    <Form.Field name='dateOfBirth' value='2010-10-17'
                        id='form-input-control-error-date-of-birth'
                        control={Input}
                        label='Date Of Birth'
                        placeholder='2010-10-17'
                    />

                    <Form.Field name='registerDate' value='2010-10-17'
                        id='form-input-control-error-register-date'
                        control={Input}
                        label='Register Date'
                        placeholder='2010-10-17'
                    />

                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Confirm'
                        label='Label with htmlFor'
                    />
                </Form></Grid.Column></Grid>


    )
}


const validate = (values) => {

    const errors = {};
    if (!values.firstName) {
        errors.firstName = {
            message: 'You need to provide First Name'
        }
    }
    /*
    if(!values.mobileNumber) {
      errors.mobileNumber = {
        message: 'You need to provide a mobile number number'
      }
    } else if(!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(values.mobileNumber)) {
      errors.mobileNumber = {
        message: 'Mobile number number must be in International format'
      }
    }
    */
    if (!values.email) {
        errors.email = {
            message: 'You need to provide an Email address'
        }
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = {
            message: 'Invalid email address'
        }
    }
    return errors;
}

export default NewStudentPage;
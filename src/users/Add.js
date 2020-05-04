import React, { useState } from 'react';

import Context from '../_helpers/context';
import history from '../_helpers/history';
import { registerUserApiCall } from '../_helpers/ApiCall'
import { Form, Input, TextArea, Button, Select, Grid } from 'semantic-ui-react';
import {roleOptions} from '../_helpers/roleOptions'

/**
 * Created by Mehmet Aktas on 2020-04-11
 */


const NewUserPage = (props) => {

    const [errors, setErrors] = useState([]);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('OFFICER')

    const handleSubmit = (event) => {

        event.preventDefault()

        const newUser = {

            firstName: firstName,
            lastName: lastName,
            email: email,
            mobileNumber: mobileNumber,
            password: password,
            role: role
        }

        registerUserApiCall(newUser).then(res => {

            history.push("/users");

        }).catch(err => {

            setErrors(err.response.data);
        })

    }

    return (

        <div className="container" data-testid="register-page">
            <div className="row">
                <div className="col s12">
                    <Grid centered columns={1}>
                        <Grid.Column>
                            <h1 style={{ marginTop: "1em" }}>Add User</h1>

                            <Form onSubmit={handleSubmit}>

                                <Form.Field name='firstName'
                                    id='form-input-control-first-name'
                                    control={Input}
                                    label='First name'
                                    placeholder='First name'
                                    value={firstName}
                                    required={true}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                                <Form.Field name="lastName"
                                    id='form-input-control-last-name'
                                    control={Input}
                                    label='Last name'
                                    placeholder='Last name'
                                    value={lastName}
                                    required={true}
                                    onChange={e => setLastName(e.target.value)}
                                />

                                <Form.Field name='email'
                                    id='form-input-control-error-email'
                                    control={Input}
                                    label='Email'
                                    placeholder='joe@schmoe.com'
                                    value={email}
                                    required={true}
                                    type='email'
                                    onChange={e => setEmail(e.target.value)}
                                />

                                <Form.Field name='mobileNumber'
                                    id='form-input-control-error-mobile-number'
                                    control={Input}
                                    label='Mobile Number'
                                    placeholder='07777777777'
                                    value={mobileNumber}
                                    required={true}
                                    type='phone'
                                    onChange={e => setMobileNumber(e.target.value)}
                                />

                                <Form.Field name='password'
                                    id='form-input-control-error-password'
                                    control={Input}
                                    label='Password'
                                    value={password}
                                    type="password"
                                    required={true}
                                    onChange={e => setPassword(e.target.value)}
                                />

                                <Form.Field name="role"
                                    control={Select}
                                    id="role"
                                    options={roleOptions}
                                    label={{ children: 'Role', htmlFor: 'form-select-control-role' }}
                                    placeholder='Role'
                                    required={true}
                                    onChange={(e, {value}) => setRole(value)}
                                />

                                <Form.Field
                                    id='form-button-control-public'
                                    control={Button}
                                    content='Save'
                                    label='Label with htmlFor'
                                />
                            </Form></Grid.Column></Grid>
                </div>
            </div>
        </div>
    )

}

export default NewUserPage
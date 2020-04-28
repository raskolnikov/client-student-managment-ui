import React, { useState } from 'react';

import Context from '../../utils/context';
import history from '../../utils/history';
import { registerUserApiCall } from '../../utils/ApiCall'
import { Form, Input, TextArea, Button, Select, Grid } from 'semantic-ui-react';

/**
 * Created by Mehmet Aktas on 2020-03-19
 */

const roleOptions = [{ key: "OFFICER", value: "OFFICER", text: "Officer" }, { ley: "ADMIN", value: "ADMIN", text: "Admin" }]

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
                                    onChange={e => setFirstName(e.target.value)}
                                />
                                <Form.Field name="lastName"
                                    id='form-input-control-last-name'
                                    control={Input}
                                    label='Last name'
                                    placeholder='Last name'
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />

                                <Form.Field name='email'
                                    id='form-input-control-error-email'
                                    control={Input}
                                    label='Email'
                                    placeholder='joe@schmoe.com'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />

                                <Form.Field name='mobileNumber'
                                    id='form-input-control-error-mobile-number'
                                    control={Input}
                                    label='Mobile Number'
                                    placeholder='07777777777'
                                    value={mobileNumber}
                                    onChange={e => setMobileNumber(e.target.value)}
                                />

                                <Form.Field name='password'
                                    id='form-input-control-error-password'
                                    control={Input}
                                    label='Password'
                                    value={password}
                                    type="password"
                                    onChange={e => setPassword(e.target.value)}
                                />

                                <Form.Field name="role"
                                    control={Select}
                                    id="role"
                                    options={roleOptions}
                                    label={{ children: 'Role', htmlFor: 'form-select-control-role' }}
                                    placeholder='Role'
                                    search
                                    searchInput={{ id: 'form-select-control-role' }}
                                    onChange={(e) => setRole(e.value)}
                                />

                                <Form.Field
                                    id='form-button-control-public'
                                    control={Button}
                                    content='Confirm'
                                    label='Label with htmlFor'
                                />
                            </Form></Grid.Column></Grid>
                </div>
            </div>
        </div>
    )

}

export default NewUserPage
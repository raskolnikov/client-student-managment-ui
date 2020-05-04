import React, { useEffect, useState, useContext } from 'react'
import { getUserApiCall, updateUserApiCall } from '../_helpers/ApiCall';
import Context from '../_helpers/context'
import { Grid, Form, Input, Button, Select, Message } from 'semantic-ui-react'
import { roleOptions } from '../_helpers/roleOptions'


const EditUserPage = (props) => {

    const context = useContext(Context);

    const userId = props.match.params.id;
    const [isLoading, setLoading] = useState(false);
    const [isSaving, setSaving] = useState(false);
    const [user, setUser] = useState({})
    const [success, setSuccess] = useState(false);

    useEffect(() => {

        setLoading(true);
        getUserApiCall(userId).then(res => {

            setUser(res.data);

            setLoading(false);

        }).catch(err => {

            context.flashErrorMessage(err)

            setLoading(false);
        })

    }, [])

    const handleSubmit = (event) => {

        event.preventDefault()

        setSaving(true);

        updateUserApiCall(userId, user).then(res => {

            setSuccess(true)
            setSaving(false);

        }).catch(err => {

            setSaving(false);

        })

    }

    const handleChange = (event, { value, name }) => {

        setUser({ ...user, [name]: value });

        setSuccess(false)

    }

    return (

        <div className="container" data-testid="register-page">
            <div className="row">
                <div className="col s12">
                    <Grid centered columns={1}>
                        <Grid.Column>
                            <h1 style={{ marginTop: "1em" }}>Edit User</h1>

                            <Form onSubmit={handleSubmit} loading={isSaving || isLoading} success={success}>

                                <Form.Field name='firstName'
                                    id='form-input-control-first-name'
                                    control={Input}
                                    label='First name'
                                    placeholder='First name'
                                    value={user.firstName}
                                    required={true}
                                    onChange={handleChange}
                                />
                                <Form.Field name="lastName"
                                    id='form-input-control-last-name'
                                    control={Input}
                                    label='Last name'
                                    placeholder='Last name'
                                    value={user.lastName}
                                    required={true}
                                    onChange={handleChange}
                                />

                                <Form.Field name='email'
                                    id='form-input-control-error-email'
                                    control={Input}
                                    label='Email'
                                    placeholder='joe@schmoe.com'
                                    value={user.email}
                                    required={true}
                                    type='email'
                                    onChange={handleChange}
                                />

                                <Form.Field name='mobileNumber'
                                    id='form-input-control-error-mobile-number'
                                    control={Input}
                                    label='Mobile Number'
                                    placeholder='07777777777'
                                    value={user.mobileNumber}
                                    required={true}
                                    type='phone'
                                    onChange={handleChange}
                                />

                                <Form.Field name='password'
                                    id='form-input-control-error-password'
                                    control={Input}
                                    label='Password'
                                    value={user.password}
                                    type="password"
                                    required={true}
                                    onChange={handleChange}
                                />

                                <Form.Field name="role"
                                    control={Select}
                                    id="role"
                                    options={roleOptions}
                                    label={{ children: 'Role', htmlFor: 'form-select-control-role' }}
                                    placeholder='Role'
                                    required={true}
                                    value={user.role}
                                    onChange={handleChange}
                                />

                                <Form.Field>

                                    <Button loading={isSaving} content={success? 'Saved' : 'Save'}></Button>

                                </Form.Field>

                            </Form></Grid.Column></Grid>
                </div>
            </div>
        </div>

    )

}

export default EditUserPage


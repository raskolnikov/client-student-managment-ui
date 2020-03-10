import React from 'react';
import { Form, Input, TextArea, Button, Select, Grid } from 'semantic-ui-react'

const TeacherForm = (props) => {

    const genderOptions = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
    ]


    return (

        <Grid centered columns={2}>
            <Grid.Column>
                <h1 style={{ marginTop: "1em" }}>Add New Teacher</h1>

                <Form onSubmit={props.handleSubmit}>
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

                    <Form.Field name='department'
                        id='form-input-control-error-department'
                        control={Input}
                        label='Department'
                        placeholder='Computer Science'
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

                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Confirm'
                        label='Label with htmlFor'
                    />
                </Form></Grid.Column></Grid>

    )

}

export default TeacherForm;

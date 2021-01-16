import React from 'react'
import { Form, Select } from 'semantic-ui-react';
import { genderOptions } from '../_helpers/';


const GenderSelection = (setGender) => {

    return (

        <Form.Field name="gender"
            control={Select}
            options={genderOptions}
            label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
            placeholder='Gender'
            search
            searchInput={{ id: 'form-select-control-gender' }}
        />

    )

}
export { GenderSelection }
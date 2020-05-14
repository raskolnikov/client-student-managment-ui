import React from 'react'
import { useField } from "formik"
import { Form, Select } from 'semantic-ui-react'

const SelectField = ({ label, ...props }) => {

    const [fields, meta] = useField(props)
    return (

        <Form.Field
            control={Select}
            {...fields} {...props}
            onChange={(e, { name, value }) => {

                const event = {
                    target: {
                        name: name,
                        value: value
                    }
                }
                
                fields.onChange(event)
            }}
            error={meta.touched && meta.error ? { content: meta.error } : false}
        />
    )

}

export { SelectField }
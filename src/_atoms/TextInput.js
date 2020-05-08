import React from 'react'
import { useField } from "formik"
import { Form, Input } from 'semantic-ui-react'

const TextInput = ({ label, ...props }) => {

    const [fields, meta] = useField(props)

    return (

        <Form.Field
            control={Input}
            {...fields} {...props}
            error={meta.touched && meta.error ? { content: meta.error } : false}
        />
    )

}

export { TextInput }
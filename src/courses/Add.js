import React, { useState, useEffect } from 'react';
import { history, createCourseApiCall,getUrlParam, convertErrorToMessage, courseFormValidationSchema, statusOptions } from "../_helpers/";
import { Form, Input, Button, Select, Grid } from 'semantic-ui-react';
import { Formik } from 'formik'
import { TextInput, SelectField } from '../_atoms'
import { Link } from 'react-router-dom'
import { alertService } from '../_services'

/**
 * Created by Mehmet Aktas on 2020-06-18
 */

const Add = (props) => {

    const initialValues = {

        courseName: '',
        content: '',
        credit: '',
        material: '',
        status: ''
    }

    const validationSchema = courseFormValidationSchema(initialValues)

    const onSubmit = (fields, { setSubmitting }) => {

        alertService.clear()

        const newCourse = {

            courseName: fields.courseName,
            content: fields.content,
            credit: fields.credit,
            material: fields.material,
            status: fields.status
        }

        createCourseApiCall(newCourse).then(res => {

            history.push("/courses");

        }).catch(err => {

            alertService.error(convertErrorToMessage(err))

        }).finally(() => {

            setSubmitting(false)
        })

    }

    return (

        <div className="container" data-testid="register-page">
            <div className="row">
                <div className="col s12">
                    <Grid centered columns={1}>
                        <Grid.Column>
                            <h1 style={{ marginTop: "1em" }}>Add Exam</h1>

                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                {
                                    (formik) => (

                                        <Form onSubmit={formik.handleSubmit}>

                                            <TextInput
                                                id='form-input-control-courseName'
                                                name='courseName'
                                                placeholder='Name'
                                            />

                                            <TextInput
                                                id='form-input-control-content'
                                                name='content'
                                                placeholder='Content'
                                            />

                                            <TextInput
                                                id='form-input-control-credit'
                                                name='credit'
                                                placeholder='Credit'
                                            />

                                            <TextInput
                                                id='form-input-control-material'
                                                name='material'
                                                placeholder='Material'
                                            />

                                            <SelectField
                                                id='form-input-control-status'
                                                name='status'
                                                placeholder='Status'
                                                options={statusOptions}
                                            />

                                            <Button loading={formik.isSubmitting} type='submit'>Submit</Button>

                                            <Link to="."> Cancel </Link>

                                        </Form>
                                    )
                                }</Formik>

                        </Grid.Column></Grid>
                </div>
            </div>
        </div>
    )

}

export { Add }
import React, { useEffect, useState } from 'react'
import { Grid, Form, Button } from 'semantic-ui-react'
import { statusOptions, getCourseApiCall, updateCourseApiCall } from '../_helpers/'
import { alertService } from '../_services'
import { convertErrorToMessage, courseFormValidationSchema } from '../_helpers'
import { Formik } from 'formik'
import { TextInput, SelectField } from '../_atoms'
import { Link } from 'react-router-dom'


const Edit = (props) => {

    const courseId = props.match.params.id;
    const [isLoading, setLoading] = useState(false);

    const initialValues = {

        courseName: '',
        credit: '',
        content: '',
        material: '',
        status: ''
    }

    const [initialCourse, setiInitialCourse] = useState(initialValues)

    const validationSchema = courseFormValidationSchema(initialCourse)


    useEffect(() => {

        setLoading(true);
        getCourseApiCall(courseId).then(res => {

            initialValues.courseName = res.data.courseName
            initialValues.credit = res.data.credit
            initialValues.content = res.data.content
            initialValues.material = res.data.material
            initialValues.status = res.data.status

            setiInitialCourse(initialValues)

        }).catch(err => {

            alertService.error(convertErrorToMessage(err))

        }).finally(() => {

            setLoading(false);
        })

    }, [])

    const onSubmit = (fields, { setSubmitting }) => {

        alertService.clear()

        const course = {

            courseName: fields.courseName,
            credit: fields.credit,
            content: fields.content,
            material: fields.material,
            status: fields.status
        }

        updateCourseApiCall(courseId, course).then(res => {

            alertService.success("Course saved successfully")

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
                            <h1 style={{ marginTop: "1em" }}>Edit Course</h1>


                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                {
                                    (formik) => (

                                        <Form onSubmit={formik.handleSubmit} loading={isLoading || formik.isSubmitting}>

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

export { Edit }


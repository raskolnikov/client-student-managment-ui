import React, { useEffect, useState } from 'react'
import { history, createStudentCourseApiCall, getCoursesApiCall, courseFormValidationSchema, convertErrorToMessage, getUrlParam } from '../../_helpers'
import { alertService } from '../../_services'
import { Form, Input, Button, Select, Grid } from 'semantic-ui-react';
import { TextInput, SelectField } from '../../_atoms'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'

const Add = (props) => {

    const initialValues = {

        courseId: '',
        studentId: '',
        educationTerm: ''

    }

    const educationTermsOptions = [{ key: 2020202101, text: '2020-2021/01 Winterm Term', value: 2020202101 },
    { key: 2020202102, text: '2020-2021/02 Spring Term', value: 2020202102 },
    { key: 2020202103, text: '2020-2021/03 Summer Term', value: 2020202103 }]


    const studentId = props.match.params.id
    const [isLoading, setLoading] = useState(false)
    const [coursesOptions, setCoursesOptions] = useState([])
    const initialPage = parseInt(getUrlParam("page") || 1)
    const initalStatus = getUrlParam("status") || "ACTIVE"
    const initalSearchValue = getUrlParam("search") || ''

    const [filterParams, setFilterParam] = useState({ offset: initialPage - 1, status: initalStatus, search: initalSearchValue })


    useEffect(() => {

        setLoading(true)

        getCoursesApiCall(filterParams).then(res => {

            setCoursesOptions(convertCoursesToOptions(res.data))

        }).catch(err => {

            alertService.error(convertErrorToMessage(err))

        }).finally(() => {

            setLoading(false)

        })

    }, [studentId])


    /*
    const validationSchema = Yup.object().shape({

        courseName: Yup.string()
            .required('Course is required'),
        credit: Yup.number()
            .required('Credit is required'),
        content: Yup.string()
            .required('Content is required'),
        material: Yup.string()
            .required('Material is required'),
        status: Yup.string()
            .required('Status is required')
    })
    */

    const onSubmit = (fields, { setSubmitting }) => {

        alertService.clear()
        
        const newStudentCourse = {

            courseId: fields.course,
            educationTerm: fields.educationTerm

        }

        createStudentCourseApiCall(studentId, newStudentCourse).then(res => {

            history.push("/students/edit/" + studentId);


        }).catch(err => {

            alertService.error(convertErrorToMessage(err))

        }).finally(() => {

            setSubmitting(false)

        })

    }

    const convertCoursesToOptions = (courses => {

        return courses.map(course => {

            return { key: course.id, text: course.courseName, value: course.id }

        })

    })

    return (

        <div className="container" data-testid="register-page">
            <div className="row">
                <div className="col s12">
                    <Grid centered columns={1}>
                        <Grid.Column>
                            <h1 style={{ marginTop: "1em" }}>Add Student</h1>

                            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                {
                                    (formik) => (

                                        <Form onSubmit={formik.handleSubmit}>

                                            <SelectField
                                                id='form-input-control-course'
                                                name='course'
                                                placeholder='Course'
                                                options={coursesOptions}
                                            />

                                            <SelectField
                                                id='form-input-control-education-term'
                                                name='educationTerm'
                                                placeholder='Education Term'
                                                options={educationTermsOptions}
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
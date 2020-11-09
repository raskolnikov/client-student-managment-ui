import React, { useState, useEffect } from 'react';
import { history, createExamApiCall, getCoursesApiCall, getUrlParam, convertErrorToMessage, examFormValidationSchema, examTakenStatusOptions, statusOptions } from "../_helpers/";
import { Form, Input, Button, Select, Grid } from 'semantic-ui-react';
import { Formik } from 'formik'
import { TextInput, SelectField } from '../_atoms'
import { Link } from 'react-router-dom'
import { alertService } from '../_services'

/**
 * Created by Mehmet Aktas on 2020-04-11
 */


const Add = (props) => {

    const [courseOptions, setCourseOptions] = useState([])

    const initialValues = {

        name: '',
        courseId: '',
        educationTerm: '',
        examDate: '',
        notes: '',
        takenStatus: '',
        status: ''
    }

    const validationSchema = examFormValidationSchema(initialValues)

    const initialPage = parseInt(getUrlParam("page") || 1)
    const initalStatus = getUrlParam("status") || "ACTIVE"
    const initalSearchValue = getUrlParam("search") || ''

    const [filterParams, setFilterParam] = useState({ offset: initialPage - 1, status: initalStatus, search: initalSearchValue })

    useEffect(() => {

        getCoursesApiCall(filterParams).then(res => {

            const courses = res.data

            const coursesArr = courses.map(course => {

                return { key: course.id, value: course.id, text: course.courseName }

            })

            setCourseOptions(coursesArr)


        })

    }, [])


    const onSubmit = (fields, { setSubmitting }) => {

        alertService.clear()

        const newExam = {

            name: fields.name,
            courseId: fields.courseId,
            educationTerm: fields.educationTerm,
            examDate: fields.examDate,
            notes: fields.notes,
            takenStatus: fields.takenStatus,
            status: fields.status
        }

        createExamApiCall(newExam).then(res => {

            history.push("/exams");

        }).catch(err => {

            debugger

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
                                                id='form-input-control-name'
                                                name='name'
                                                placeholder='Name'
                                            />

                                            <SelectField
                                                id='form-input-control-courseId'
                                                name='courseId'
                                                placeholder='Course'
                                                options={courseOptions}
                                            />

                                            <TextInput
                                                id='form-input-control-educationTerm'
                                                name='educationTerm'
                                                placeholder='Education Term'
                                            />

                                            <TextInput
                                                id='form-input-control-examDate'
                                                name='examDate'
                                                placeholder='Exam Date'
                                            />

                                            <TextInput
                                                id='form-input-control-notes'
                                                name='notes'
                                                placeholder='notes'
                                            />

                                            <SelectField
                                                id='form-input-control-takenStatus'
                                                name='takenStatus'
                                                placeholder='Taken Status'
                                                options={examTakenStatusOptions}
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
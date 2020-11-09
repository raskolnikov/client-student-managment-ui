import React, { useEffect, useState } from 'react'
import { Grid, Form, Button } from 'semantic-ui-react'
import { statusOptions, examTakenStatusOptions, getExamApiCall, getCoursesApiCall, updateExamApiCall, getUrlParam } from '../_helpers/'
import { alertService } from '../_services'
import { convertErrorToMessage, examFormValidationSchema } from '../_helpers'
import { Formik } from 'formik'
import { TextInput, SelectField } from '../_atoms'
import { Link } from 'react-router-dom'


const Edit = (props) => {

    const examId = props.match.params.id;
    const [isLoading, setLoading] = useState(false);

    const initialPage = parseInt(getUrlParam("page") || 1)
    const initalStatus = getUrlParam("status") || "ACTIVE"
    const initalSearchValue = getUrlParam("search") || ''

    const [filterParams, setFilterParam] = useState({ offset: initialPage - 1, status: initalStatus, search: initalSearchValue })


    const initialValues = {

        name: '',
        courseId: '',
        educationTerm: '',
        examDate: '',
        notes: '',
        takenStatus: '',
        status: ''
    }

    const [initialExam, setiInitialExam] = useState(initialValues)

    const [courseOptions, setCourseOptions] = useState([])

    const validationSchema = examFormValidationSchema(initialExam)


    useEffect(() => {

        setLoading(true);
        getExamApiCall(examId).then(res => {

            initialValues.name = res.data.name
            initialValues.courseId = res.data.courseId
            initialValues.educationTerm = res.data.educationTerm
            initialValues.examDate = res.data.examDate
            initialValues.notes = res.data.notes
            initialValues.takenStatus = res.data.takenStatus
            initialValues.status = res.data.status

            setiInitialExam(initialValues)

        }).catch(err => {

            alertService.error(convertErrorToMessage(err))

        }).finally(() => {

            setLoading(false);
        })

        getCoursesApiCall((filterParams)).then(res => {

            const courses = res.data

            const coursesArr = courses.map(course => {

                return { key: course.id, value: course.id, text: course.courseName }

            })

            setCourseOptions(coursesArr)

        })

    }, [])

    const onSubmit = (fields, { setSubmitting }) => {

        alertService.clear()

        const exam = {

            name: fields.name,
            courseId: fields.courseId,
            educationTerm: fields.educationTerm,
            examDate: fields.examDate,
            notes: fields.notes,
            takenStatus: fields.takenStatus,
            status: fields.status
        }

        updateExamApiCall(examId, exam).then(res => {

            alertService.success("Exam saved successfully")

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
                            <h1 style={{ marginTop: "1em" }}>Edit Exam</h1>


                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                {
                                    (formik) => (

                                        <Form onSubmit={formik.handleSubmit} loading={isLoading || formik.isSubmitting}>

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

export { Edit }


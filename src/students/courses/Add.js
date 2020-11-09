import React, { useEffect, useState } from 'react'
import { getCoursesApiCall } from '../../_helpers'
import { alertService } from '../../_services'
import { convertErrorToMessage, getStudentCoursesApiCall, getUrlParam } from '../../_helpers'


const Add = (props) => {

    const initialValues = {

        courseId: '',
        studentId: '',
        educationTerm: ''

    }

    const educationTerms = [{ key: 2020202101, text: '2020-2021/01 Winterm Term', value: 2020202101 },
    { key: 2020202102, text: '2020-2021/02 Spring Term', value: 2020202102 },
    { key: 2020202103, text: '2020-2021/03 Summer Term', value: 2020202103 }]


    const studentId = props.match.params.id
    const [isLoading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])
    const initialPage = parseInt(getUrlParam("page") || 1)
    const initalStatus = getUrlParam("status") || "ACTIVE"
    const initalSearchValue = getUrlParam("search") || ''

    const [filterParams, setFilterParam] = useState({ offset: initialPage - 1, status: initalStatus, search: initalSearchValue })

    const validationSchema = courseFormValidationSchema(initialValues)

    useEffect(() => {

        setLoading(true)

        getCoursesApiCall(filterParams).then(res => {

            setCourses(res.data)

        }).catch(err => {

            alertService.error(convertErrorToMessage(err))

        }).finally(() => {

            setLoading(false)

        })

    }, [studentId])




}
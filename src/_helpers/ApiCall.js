import axios from 'axios';
import {
    LOGIN_URL, API_BASE_URL, REGISTER_USER_URL, GET_USERS_URL, GET_STUDENTS_URL, GET_TEACHERS_URL, GET_EXAMS_URL, GET_COURSES_URL, AUTH_URL
} from './ApiUrl'


export const loginApiCall = (param) => {

    return axios.post(process.env.REACT_APP_API_URL + LOGIN_URL, param).then(response => response);

}

export const deleteTeacherApiCall = (teacherId) => {

    return axios.delete(process.env.REACT_APP_API_URL + API_BASE_URL + GET_TEACHERS_URL + teacherId).then(response => response);

}

export const getTeacherApiCall = (teacherId) => {

    return axios.get(process.env.REACT_APP_API_URL + API_BASE_URL + GET_TEACHERS_URL + teacherId).then(response => response);

}

export const createTeacherApiCall = (param) => {

    return axios.post(process.env.REACT_APP_API_URL + API_BASE_URL + GET_TEACHERS_URL, param).then(response => response);

}

export const updateTeacherApiCall = (teacherId, teacher) => {

    return axios.put(process.env.REACT_APP_API_URL + API_BASE_URL + GET_TEACHERS_URL + teacherId, teacher).then(response => response);

}

export const registerUserApiCall = (param) => {

    return axios.post(process.env.REACT_APP_API_URL + API_BASE_URL + REGISTER_USER_URL, param).then(response => response);

}

export const getUsersApiCall = (param) => {

    return axios.get(process.env.REACT_APP_API_URL + API_BASE_URL + GET_USERS_URL, { params: { ...param } }).then(response => response);

}

export const deleteUserApiCall = (userId) => {

    return axios.delete(process.env.REACT_APP_API_URL + API_BASE_URL + GET_USERS_URL + userId).then(response => response);

}


export const isEmailValidForUserApiCall = (param) => {

    return axios.post(process.env.REACT_APP_API_URL + API_BASE_URL + GET_USERS_URL + "email-validation", param).then(response => response);

}

export const isMobileNumberValidForUserApiCall = (param) => {

    return axios.post(process.env.REACT_APP_API_URL + API_BASE_URL + GET_USERS_URL + "mobile-number-validation", param).then(response => response);

}

export const getUserApiCall = (userId) => {

    return axios.get(process.env.REACT_APP_API_URL + API_BASE_URL + GET_USERS_URL + userId).then(response => response);

}

export const forgotPasswordApiCall = (param) => {
    return axios.post(process.env.REACT_APP_API_URL + API_BASE_URL + AUTH_URL + "forgot-password", param).then(response => response);
}

export const updateUserApiCall = (userId, user) => {

    return axios.put(process.env.REACT_APP_API_URL + API_BASE_URL + GET_USERS_URL + userId, user).then(response => response);

}

export const getStudentsApiCall = (param) => {

    return axios.get(process.env.REACT_APP_API_URL + API_BASE_URL + GET_STUDENTS_URL, { params: { ...param } }).then(response => response);

}

export const deleteStudentApiCall = (studentId) => {

    return axios.delete(process.env.REACT_APP_API_URL + API_BASE_URL + GET_STUDENTS_URL + studentId).then(response => response);

}


export const getStudentApiCall = (studentId) => {

    return axios.get(process.env.REACT_APP_API_URL + API_BASE_URL + GET_STUDENTS_URL + studentId).then(response => response);

}

export const updateStudentApiCall = (studentId, student) => {

    return axios.put(process.env.REACT_APP_API_URL + API_BASE_URL + GET_STUDENTS_URL + studentId, student).then(response => response);

}

export const createStudentApiCall = (param) => {

    return axios.post(process.env.REACT_APP_API_URL + API_BASE_URL + GET_STUDENTS_URL, param).then(response => response);

}

export const getTeachersApiCall = (param) => {

    return axios.get(process.env.REACT_APP_API_URL + API_BASE_URL + GET_TEACHERS_URL, { params: { ...param } }).then(response => response);

}

export const getExamsApiCall = (param) => {

    return axios.get(process.env.REACT_APP_API_URL + API_BASE_URL + GET_EXAMS_URL, { params: { ...param } }).then(response => response);

}

export const deleteExamApiCall = (studentId) => {

    return axios.delete(process.env.REACT_APP_API_URL + API_BASE_URL + GET_EXAMS_URL + studentId).then(response => response);

}


export const getExamApiCall = (examId) => {

    return axios.get(process.env.REACT_APP_API_URL + API_BASE_URL + GET_EXAMS_URL + examId).then(response => response);

}

export const updateExamApiCall = (examId, exam) => {

    return axios.put(process.env.REACT_APP_API_URL + API_BASE_URL + GET_EXAMS_URL + examId, exam).then(response => response);

}

export const createExamApiCall = (param) => {

    return axios.post(process.env.REACT_APP_API_URL + API_BASE_URL + GET_EXAMS_URL, param).then(response => response);

}

export const getCoursesApiCall = (param) => {

    return axios.get(process.env.REACT_APP_API_URL + API_BASE_URL + GET_COURSES_URL, { params: { ...param } }).then(response => response);

}

export const deleteCourseApiCall = (courseId) => {

    return axios.delete(process.env.REACT_APP_API_URL + API_BASE_URL + GET_COURSES_URL + courseId).then(response => response);

}

export const getCourseApiCall = (courseId) => {

    return axios.get(process.env.REACT_APP_API_URL + API_BASE_URL + GET_COURSES_URL + courseId).then(response => response);

}

export const createCourseApiCall = (param) => {

    return axios.post(process.env.REACT_APP_API_URL + API_BASE_URL + GET_COURSES_URL, param).then(response => response);

}

export const updateCourseApiCall = (courseId, course) => {

    return axios.put(process.env.REACT_APP_API_URL + API_BASE_URL + GET_COURSES_URL + courseId, course).then(response => response);

}


export const deleteStudentCourseApiCall = (studentCourseId) => {

    return axios.delete(process.env.REACT_APP_API_URL + API_BASE_URL + GET_STUDENTS_URL + GET_COURSES_URL + studentCourseId).then(response => response);

}

export const getStudentCourseApiCall = (studentCourseId) => {

    return axios.get(process.env.REACT_APP_API_URL + API_BASE_URL + GET_STUDENTS_URL + GET_COURSES_URL + studentCourseId).then(response => response);

}

export const createStudentCourseApiCall = (param) => {

    return axios.post(process.env.REACT_APP_API_URL + API_BASE_URL + GET_STUDENTS_URL + GET_COURSES_URL, param).then(response => response);

}

export const updateStudentCourseApiCall = (studentCourseId, studentCourse) => {

    return axios.put(process.env.REACT_APP_API_URL + API_BASE_URL + GET_STUDENTS_URL + GET_COURSES_URL + studentCourseId, studentCourse).then(response => response);

}

export const getStudentCoursesApiCall = (studentId) => {

    return axios.get(process.env.REACT_APP_API_URL + API_BASE_URL + GET_STUDENTS_URL + studentId + '/' + GET_COURSES_URL).then(response => response);

}

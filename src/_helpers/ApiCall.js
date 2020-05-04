import axios from 'axios';
import {
    LOGIN_URL, REGISTER_USER_URL, GET_USERS_URL, GET_STUDENTS_URL, GET_TEACHERS_URL
} from './ApiUrl'


export const loginApiCall = (param) => {

    return axios.post(process.env.REACT_APP_API_URL + LOGIN_URL, param).then(response => response);

}

export const registerUserApiCall = (param) => {

    return axios.post(process.env.REACT_APP_API_URL + REGISTER_USER_URL, param).then(response => response);

}

export const getUsersApiCall = (param) => {

    return axios.get(process.env.REACT_APP_API_URL + GET_USERS_URL, { params: { ...param } }).then(response => response);

}

export const deleteUserApiCall = (userId) => {

    return axios.delete(process.env.REACT_APP_API_URL + GET_USERS_URL + userId).then(response => response);

}


export const getUserApiCall = (userId) => {

    return axios.get(process.env.REACT_APP_API_URL + GET_USERS_URL + userId).then(response => response);

}

export const updateUserApiCall = (userId, user) => {

    return axios.put(process.env.REACT_APP_API_URL + GET_USERS_URL + userId, user).then(response => response);

}

export const getStudentsApiCall = (param) => {

    return axios.get(process.env.REACT_APP_API_URL + GET_STUDENTS_URL, { params: { ...param } }).then(response => response);

}

export const deleteStudentApiCall = (studentId) => {

    return axios.delete(process.env.REACT_APP_API_URL + GET_STUDENTS_URL + studentId).then(response => response);

}


export const getStudentApiCall = (studentId) => {

    return axios.get(process.env.REACT_APP_API_URL + GET_STUDENTS_URL + studentId).then(response => response);

}

export const updateStudentApiCall = (studentId, student) => {

    return axios.put(process.env.REACT_APP_API_URL + GET_STUDENTS_URL + studentId, student).then(response => response);

}

export const getTeachersApiCall = (param) => {

    return axios.get(process.env.REACT_APP_API_URL + GET_TEACHERS_URL, { params: { ...param } }).then(response => response);

}

export const deleteTeacherApiCall = (teacherId) => {

    return axios.delete(process.env.REACT_APP_API_URL + GET_TEACHERS_URL + teacherId).then(response => response);

}


export const getTeacherApiCall = (teacherId) => {

    return axios.get(process.env.REACT_APP_API_URL + GET_TEACHERS_URL + teacherId).then(response => response);

}

export const updateTeacherApiCall = (teacherId, teacher) => {

    return axios.put(process.env.REACT_APP_API_URL + GET_TEACHERS_URL + teacherId, teacher).then(response => response);

}
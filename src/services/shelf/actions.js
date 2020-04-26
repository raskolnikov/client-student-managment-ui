import { FETCH_STUDENTS } from './actionTypes';
import axios from 'axios';
import { client } from '../../utils/util';

export const productsAPI = '/students';

export function newStudent() {

    return dispatch => {

        return dispatch({
            type: 'NEW_STUDENT'
        })
    }

}

export function saveStudent(student) {

    return dispatch => {
        return dispatch({
            type: 'SAVE_STUDENT',
            payload: client.post(productsAPI + "/", student)
        })
    }
}

export function fetchStudent(id) {

    return dispatch => {
        return dispatch({
            type: 'FETCH_STUDENT',
            payload: client.get(`${productsAPI}/${id}`)
        })

    }
}

export function updateStudent(student) {

    return dispatch => {

        return dispatch({
            type: 'UPDATE_STUDENT',
            payload: client.put(`${productsAPI}/${student.id}`, student)
        })
    }

}

export function deleteStudent(id) {

    return dispatch => {

        return dispatch({
            type: 'DELETE_STUDENT',
            payload: client.delete(`${productsAPI}/${id}`)
        })
    }

}

export const fetchStudents = (filters, sortBy, callback) => dispatch => {
    return client
        .get(productsAPI + "/")
        .then(res => {

            return dispatch({
                type: FETCH_STUDENTS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log('Could not fetch products. Try again later.');
        });
};


export const setTeachers = (teachers) => {

    return {
        type: "ACTION_TYPES.FETCH_DB_TEACHERS",
        payload: teachers
    }

}

export const removeTeachers = () => {

    return {
        type: "ACTION_TYPES.FETCH_DB_TEACHERS",
    }

}

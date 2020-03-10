import { FETCH_STUDENTS, NEW_STUDENT, NEW_STUDENT_PENDING, SAVE_STUDENT_FULFILLED, SAVE_STUDENT_REJECTED, FETCH_STUDENT_PENDING, FETCH_STUDENT_FULFILLED } from './actionTypes';

const initialState = {
    students: [],
    student: {},
    loading: false,
    errors: {}
}

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCH_STUDENTS: {
            return {
                ...state,
                students: action.payload
            };
        }

        case NEW_STUDENT: {
            return {
                ...state,
                student: {}
            }
        }

        case NEW_STUDENT_PENDING: {

            return {
                ...state,
                loading: true

            }
        }

        case SAVE_STUDENT_FULFILLED: {

            return {
                ...state,
                students: [...state.students, action.payload],
                errors: {},
                loading: false

            }

        }

        case SAVE_STUDENT_REJECTED: {

            const data = action.payload.response.data;

            const { firstName, lastName, mobileNumber, email } = data.errors;

            const errors = { global: data.message, firstName, lastName, mobileNumber, email };


            return {
                ...state,
                errors: errors,
                loading: false
            }

        }

        case FETCH_STUDENT_PENDING: {
            return {
                ...state,
                student: {},
                loading: true
            }

        }

        case 'FETCH_STUDENT_REJECTED': {

            const errors = { global: action.payload };

            return {
                ...state,
                errors: errors,
                loading: false
            }

        }

        case FETCH_STUDENT_FULFILLED: {
            return {
                ...state,
                student: action.payload.data,
                loading: false,
                errors: {}
            }

        }

        case 'UPDATE_STUDENT_PENDING': {
            return {
                ...state,
                loading: true
            }
        }

        case 'UPDATE_STUDENT_FULFILLED': {

            const student = action.payload.data;

            return {
                ...state,
                students: state.students.map(item => item.id === student.id ? student : item),
                loading: false

            }

        }

        case 'UPDATE_STUDENT_REJECTED': {

            const data = action.payload.response.data;
            const { firstName, lastName, mobileNumber, email } = data;

            const errors = { global: data.message, firstName, lastName, mobileNumber, email };

            return {
                ...state,
                errors: errors,
                loading: false
            }

        }

        case 'DELETE_STUDENT_FULFILLED': {

            const id = action.payload.data.id;

            return {
                ...state,
                students: state.students.filter(student => student.id !== id)
            }
        }

        default:
            return state;
    }
}
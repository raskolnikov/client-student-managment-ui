import axios from 'axios';
import {
    LOGIN_URL, REGISTER_USER_URL
} from '../constants/ApiUrl'


export const loginApiCall = (param) => {

    return axios.post(process.env.REACT_APP_API_URL + LOGIN_URL, param).then(response => response);

}

export const registerUserApiCall = (param) => {

    return axios.post(process.env.REACT_APP_API_URL + REGISTER_USER_URL, param).then(response => response);

}
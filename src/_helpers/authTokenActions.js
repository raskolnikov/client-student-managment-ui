import axios from 'axios';

export const setAuthToken = (token) => {

    // Apply authorization token to every request if logged in
    axios.defaults.headers.common.Authorization = 'Bearer '+token

}

export const removeAuthToken = () => {

    // Delete auth header
    delete axios.defaults.headers.common.Authorization

}


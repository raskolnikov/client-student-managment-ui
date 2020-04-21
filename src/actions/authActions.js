import { client } from '../../utils/util';
import jwtDecode from 'jwt-decode'
import setAuthToken from '../utils/authTokenActions';
import { SET_CURRENT_USER, USER_LOADING, GET_ERRORS } from '../services/shelf/actiontypes';
import { loginApiCall } from '../util'

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    }
}

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING,
    }
}
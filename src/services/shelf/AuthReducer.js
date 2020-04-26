import * as ACTION_TYPES from './actionTypes';

export const initialState = {

    isAuthenticated: false,
    profile: null, 
    message:null

}

export const AuthReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case ACTION_TYPES.LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false
            }
        case ACTION_TYPES.ADD_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case ACTION_TYPES.REMOVE_PROFILE:
            return {
                ...state,
                profile: null
            }
        case ACTION_TYPES.FLASH_MESSAGE: {
            return {
                ...state,
                message: action.payload,
            };
        }
        default:
            return state


    }


}

import * as ACTION_TYPES from './actionTypes';

export const initialState = {

    user: null,

}

export const AuthReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case ACTION_TYPES.LOGOUT:
            return {
                ...state,
                user: null
            }

        case ACTION_TYPES.USER_BACK:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state


    }


}

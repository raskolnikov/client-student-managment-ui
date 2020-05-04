import React, { useReducer } from "react";
import Context from './utils/context';
import Routes from './routes';
import * as AuthReducer from './services/shelf/AuthReducer';
import *  as ACTION_TYPES from './services/shelf/actionTypes';

const ContextState = (props) => {

    const [stateAuth, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer, AuthReducer.initialState);

    const handleLoginSuccess = (user) => {

        dispatchAuthReducer({
            type: ACTION_TYPES.LOGIN_SUCCESS,
            payload: user
        })
    }

    const handleLogout = () => {

        dispatchAuthReducer({
            type: ACTION_TYPES.LOGOUT
        })
    }

    const setReturningUser = (user) => {

        dispatchAuthReducer({
            type: ACTION_TYPES.USER_BACK,
            payload: user
        })
    }

    return (

        <div>
            <Context.Provider value={{

                handleLoginSuccess: (user) => handleLoginSuccess(user),
                handleLogout: () => handleLogout(),
                setReturningUser,
                stateAuth
            }}>

                <Routes />

            </Context.Provider>
        </div>

    )

}

export default ContextState;
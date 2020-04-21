import React, { useReducer } from "react";
import Context from './utils/context';
import Routes from './routes';
import * as AuthReducer from './services/shelf/AuthReducer';
import *  as ACTION_TYPES from './services/shelf/actionTypes';

import Auth from './utils/auth';

const auth = new Auth();

const ContextState = (props) => {


    const [stateAuthReducer, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer, AuthReducer.initialState);

    const handleLoginSuccess = (profile) => {

        dispatchAuthReducer({
            type: ACTION_TYPES.LOGIN_SUCCESS,
            payload: profile
        })
    }

    const handleLogout = () => {

        dispatchAuthReducer({
            type: ACTION_TYPES.LOGIN_FAILURE
        })
    }

    return (

        <div>
            <Context.Provider value={{

                handleLoginSuccess: (profile) => handleLoginSuccess(profile),
                handleLogout: () => handleLogout(),

                authObj: auth

            }}>

            <Routes />

            </Context.Provider>
        </div>

    )

}

export default ContextState;
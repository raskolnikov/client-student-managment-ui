import React, { useReducer } from "react";
import Context from './utils/context';
import Routes from './routes';

/*
Teacher Reducer
*/

const ContextState = (props) => {


    return (

        <div>
            <Context.Provider value={{


            }}>

                <Routes />

            </Context.Provider>
        </div>

    )

}

export default ContextState;
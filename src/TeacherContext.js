import React, { useReducer } from "react";
import * as TeacherReducer from "./services/shelf/TeacherReducer";
import Context from './utils/context';
import Routes from './routes';

/*
Teacher Reducer
*/

const ContextState = (props) => {

    const [stateTeachers, dispatchTeachers] = useReducer(TeacherReducer.TeacherReducer, TeacherReducer.initialState);

    const handleSetTeachers = (teachers) => {

        dispatchTeachers({
            type: "ACTION_TYPES.FETCH_DB_TEACHERS",
            payload: teachers
        })

    }

    const handleRemoveTeachers = () => {

        dispatchTeachers({
            type: "ACTION_TYPES.FETCH_DB_TEACHERS",
            payload: []
        })

    }

    return (

        <div>
            <Context.Provider value={{

                teachersState: stateTeachers.teachers,
                handleAddTeachers: (teachers) => handleSetTeachers(teachers),
                handleRemoveTeachers: () => handleRemoveTeachers(),

            }}>

            <Routes />

            </Context.Provider>
        </div>

    )

}

export default ContextState;
import React, { useContext, useState, useEffect, useReducer } from 'react';
import Context from '../../utils/context';
import { client } from '../../utils/util';
import TeacherCardList from './TeacherCardList';
import { Card } from 'semantic-ui-react';
import * as TeacherReducer from '../../services/shelf/TeacherReducer';


const TeacherListPage = (posts) => {

    const context = useContext(Context);

    const [state, dispatch] = useReducer(TeacherReducer.TeacherReducer, TeacherReducer.initialState);

    useEffect(() => {

        client.get("teachers/")
            .then(res => {
                
                dispatch({

                    type: "ACTION_TYPES.FETCH_DB_TEACHERS",
                    payload : res.data

                })

            }).catch(err => {

                console.log(err);
            })


    }, []);

    const deleteTeacher = (teacher) => {

        client.delete(`teachers/${teacher.id}`).then(res => {

            dispatch({

                type: "ACTION_TYPES.TEACHER_DELETED",
                payload : teacher

            })

        }).catch(err => {

            console.log(err);
        })

    }

    const teachers = state.teachers;
    const isLoading = state.isLoading;


    return (

        <React.Fragment>
            {isLoading}
            <Card.Group>
                <TeacherCardList teachers={teachers} deleteTeacher={deleteTeacher} />
            </Card.Group>
        </React.Fragment>

    )

}

export default TeacherListPage;
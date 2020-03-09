import React, { useContext, useState, useEffect } from 'react';
import Context from '../../utils/context';
import { client } from '../../utils/util';
import { productsAPI } from '../../services/shelf/actions';
import TeacherCardList from './TeacherCardList';
import { Card } from 'semantic-ui-react';


const TeacherListPage = (posts) => {

    const context = useContext(Context);

    const initalLocalState = {

        teachers: [],
        isLoading: false
    };

    const [stateLocal, setStateLocal] = useState(initalLocalState);


    useEffect(() => {

        if (!context.teachersState) {

            client.get("teachers/")
                .then(res => {

                    context.handleAddTeachers(res.data);

                }).catch(err => {

                    console.log(err);
                })

        }

        if (context.teachersState && !stateLocal.isLoading) {

            setStateLocal({
                ...stateLocal,
                isLoading: false,
                teachers: context.teachersState

            })

        }



    }, [context, stateLocal]);


    const teachers = stateLocal.teachers;
    const isLoading = stateLocal.isLoading;



    return (

        <React.Fragment>
            {isLoading}
            <Card.Group>
                <TeacherCardList teachers={teachers} />
            </Card.Group>
        </React.Fragment>

    )

}

export default TeacherListPage;
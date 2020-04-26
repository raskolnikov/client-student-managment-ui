import React, { useEffect, useState } from 'react';
import { client } from '../../utils/util';
import StudentList from './StudentList'

import { Card } from 'semantic-ui-react';

const StudentListPage = (props) => {

    const initialState = {

        students: [],
        isLoading: false
    }

    //const [students, setStudents] = useState([]);
    //const [isLoading, setLoading] = useState([]);
    const [state, setState] = useState(initialState);

    useEffect(() => {

        client.get('students/').then(res => {

            setState({ students: res.data });

        }).catch(err => {

            console.error(err);
        })

    }, []);
    

    const deleteStudent = (student) => {

        let studentId = student.id;

        client.delete(`students/${studentId}`).then(res => {

            let students = state.students.filter(student => student.id !== studentId);

            setState({ students: students });

        })


    }

    const isLoading = state.isLoading;

    return (

        <React.Fragment>
            {isLoading}
            <Card.Group>
                <StudentList students={state.students} deleteStudent={deleteStudent}></StudentList>
            </Card.Group>
        </React.Fragment>

    )
}

export default StudentListPage;
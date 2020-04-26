import React from 'react';
import StudentCard from './StudentCard';

const StudentList = ({ students, deleteStudent }) => {
    return students.map(p=>{
        return <StudentCard student={p} key={p.id} deleteStudent = {deleteStudent}/>
    })
  };
  
  export default StudentList;
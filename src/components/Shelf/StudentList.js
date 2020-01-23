import React from 'react';
import StudentCard from './StudentCard';

const StudentList = ({ products: students, deleteStudent }) => {
    return students.map(p=>{
        return <StudentCard product={p} key={p.id} deleteStudent = {deleteStudent}/>
    })
  };
  
  export default StudentList;
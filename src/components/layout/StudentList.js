import React from 'react';
import StudentCard from './StudentCard';

/**
 * Created by Mehmet Aktas on 2020-03-10
 */

 const StudentList = ({ students, deleteStudent }) => {
    return students.map(p=>{
        return <StudentCard student={p} key={p.id} deleteStudent = {deleteStudent}/>
    })
  };
  
  export default StudentList;
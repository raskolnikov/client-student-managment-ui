import React from 'react';
import StudentCard from './StudentCard';

const StudentList = ({ products: students }) => {
    return students.map(p=>{
        return <StudentCard product={p} key={p.id}/>
    })
  };
  
  export default StudentList;
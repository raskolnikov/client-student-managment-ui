import React from 'react';
import TeacherCard from './TeacherCard';


const TeacherCardList = ({ teachers, deleteTeacher }) => {

    return teachers.map(teacher => <TeacherCard key={teacher.id} teacher={teacher} deleteTeacher={deleteTeacher} />);

}

export default TeacherCardList;
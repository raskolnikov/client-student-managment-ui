import React from 'react';
import TeacherCard from './TeacherCard';


const TeacherCardList = ({ teachers }) => {

    return teachers.map(teacher => <TeacherCard key={teacher.id} teacher={teacher} />);

}

export default TeacherCardList;
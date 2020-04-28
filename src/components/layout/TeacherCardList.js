import React from 'react';
import TeacherCard from './TeacherCard';

/**
 * Created by Mehmet Aktas on 2020-03-10
 */

const TeacherCardList = ({ teachers, deleteTeacher }) => {

    return teachers.map(teacher => <TeacherCard key={teacher.id} teacher={teacher} deleteTeacher={deleteTeacher} />);

}

export default TeacherCardList;
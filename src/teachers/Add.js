import React from 'react';
import TeacherForm from '../_components/TeacherForm';
import { client } from '../_helpers/util';
import history from '../_helpers/history';

/**
 * Created by Mehmet Aktas on 2020-04-12
 */

const NewTeacherPage = () => {

    const handleSubmit = (event) => {

        event.preventDefault();

        const newTeacherRequest = {

            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            gender: event.target.gender.value,
            dateOfBirth: event.target.dateOfBirth.value,
            department: event.target.department.value,
            address: event.target.address.value,
            mobileNumber: event.target.mobileNumber.value,
            createdBy: event.target.createdBy.value

        }

        client.post("teachers/", newTeacherRequest).then(res => {

            history.replace('/teachers/');

        }).catch(err => {

            console.log(err);

        })


    }

    return (
        <TeacherForm handleSubmit={handleSubmit} />
    )

}

export default NewTeacherPage;
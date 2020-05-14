import * as Yup from 'yup'

function teacherFormValidationSchema() {

    return Yup.object().shape({

        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        mobileNumber: Yup.string()
            .required('Mobile number is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        department: Yup.string()
            .required('Department is required'),
        dateOfBirth: Yup.string()
            .required('Date of birth is required'),
        address: Yup.string()
            .required('Address is required')

    })
}

export { teacherFormValidationSchema }
import * as Yup from 'yup'

function userFormValidationSchema() {

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
        password: Yup.string()
            .required('Password is required'),
        role: Yup.string()
            .required('Role is required')
    })
}

export { userFormValidationSchema }
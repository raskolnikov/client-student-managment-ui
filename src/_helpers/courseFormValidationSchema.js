import * as Yup from 'yup'

function courseFormValidationSchema() {

    return Yup.object().shape({

        courseName: Yup.string()
            .required('Course Name is required'),
        credit: Yup.number()
            .required('Credit is required'),
        content: Yup.string()
            .required('Content is required'),
        material: Yup.string()
            .required('Material is required'),
        status: Yup.string()
            .required('Status is required')
    })
}

export { courseFormValidationSchema }
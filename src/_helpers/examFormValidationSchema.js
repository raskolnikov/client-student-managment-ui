import * as Yup from 'yup'

function examFormValidationSchema() {

    return Yup.object().shape({

        name: Yup.string()
            .required('Name is required'),
        courseId: Yup.number()
            .required('Course is required'),
        educationTerm: Yup.string()
            .required('Education Term is required'),
        examDate: Yup.string()
            .required('Exam date is required'),
        status: Yup.string()
            .required('Status date is required'),
        takenStatus: Yup.string()
            .required('Taken status is required')
    })
}


export { examFormValidationSchema }
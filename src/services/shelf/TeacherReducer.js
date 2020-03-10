export const initialState = {

    teachers: [],
    isLoading: false

}

export const TeacherReducer = (state = initialState, action) => {

    switch (action.type) {
        case ("ACTION_TYPES.FETCH_DB_TEACHERS"):
            return {
                ...state,
                teachers: action.payload
            }

        case ("ACTION_TYPES.REMOVE_DB_TEACHERS"):
            return {
                ...state,
                teachers: []
            }

        case ("ACTION_TYPES.TEACHER_DELETED"):

            const teacherId = action.payload.id;

            return {
                
                ...state,
                teachers: state.teachers.filter(teacher => teacher.id !== teacherId)
            }

        default:
            return state;

    }


}
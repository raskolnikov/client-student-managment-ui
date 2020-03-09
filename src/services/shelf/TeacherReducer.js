export const initialState = {

    teachers: null

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

        default:
            return state;

    }


}
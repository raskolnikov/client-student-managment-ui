function convertErrorToMessage(error){

    const err = error.response ? error.response.data : error; // check if server or network error

    return err.message

}

export { convertErrorToMessage }
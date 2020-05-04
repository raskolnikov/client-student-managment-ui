const convertErrorToMessage = (error) => {

    const err = error.response ? error.response.data : error; // check if server or network error

    return {
        title: err.name,
        content: err.message,
    }

}

export { convertErrorToMessage }
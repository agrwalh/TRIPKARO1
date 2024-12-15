export const errorHandler = (statusCode, message) => {
    console.log("error Spotted!!")
    const error = new Error(message);
    error.statusCode    = statusCode
    error.message = message

    return error
    
}
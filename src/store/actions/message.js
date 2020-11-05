import * as actionTypes from '../actions/actionTypes';

export const setSuccessMessgae = (message) => {
    return {
        type: actionTypes.SET_SUCCESS_MESSAGE,
        message: message
    }
}

export const setErrorMessgae = (error) => {
    return {
        type: actionTypes.SET_ERROR_MESSAGE,
        error: error
    }
}

export const clearMessage = () => {
    return {
        type: actionTypes.CLEAR_MESSAGE,
    }
}
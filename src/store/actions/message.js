import * as actionTypes from '../actions/actionTypes';

export const setSuccessMessage = (message) => {
    return {
        type: actionTypes.SET_SUCCESS_MESSAGE,
        message: message
    }
}

export const setErrorMessage = (error) => {
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
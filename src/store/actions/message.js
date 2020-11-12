import * as actionTypes from '../actions/actionTypes';

export const setMessage = (messageTitle, message, type) => {
    return {
        type: actionTypes.SET_MESSAGE,
        messageTitle: messageTitle,
        message: message,
        messageType: type

    }
}

export const clearMessage = () => {
    return {
        type: actionTypes.CLEAR_MESSAGE,
    }
}
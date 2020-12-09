import * as actionTypes from '../actions/actionTypes';

export const setMessage = (message, messageArr, type) => {
    return {
        type: actionTypes.SET_MESSAGE,
        message: message,
        messageDetails: messageArr,
        messageType: type

    }
}

export const clearMessage = () => {
    return {
        type: actionTypes.CLEAR_MESSAGE,
    }
}
import * as actionTypes from '../actions/actionTypes';

export const setMessage = (messageTitle, messageArr, type) => {
    return {
        type: actionTypes.SET_MESSAGE,
        messageTitle: messageTitle,
        message: messageArr,
        messageType: type

    }
}

export const clearMessage = () => {
    return {
        type: actionTypes.CLEAR_MESSAGE,
    }
}
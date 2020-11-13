export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const convertErrMessageArray = (errorArray) => {
    return errorArray.map(message => message.msg);
}

export const addMessage = (msgArray, newMessage) => {
    const newMsgArray = [...msgArray]
    newMsgArray.push(newMessage);
    return newMsgArray;
}

export const convertErrMessageArrayToText = (errorArray) => {
    if (!errorArray) return [];
    return errorArray.reduce((text, message, id) => {
        return id === 0 ? message.msg : text + ' ' + message.msg;
    }, '');
}
import { cloneDeep } from 'lodash';

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

export const uppercaseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export class ErrorMessage {
    constructor(errorObject) {
        this.errorObject = errorObject;
        // errorObject.data.data ?? 
    }

    getErrorMessage() {
        const errorObjectCopy = cloneDeep(this.errorObject);
        return errorObjectCopy.data.message
    }

    getErrorMessageDetailsText() {
        const errorObjectCopy = cloneDeep(this.errorObject)
        return errorObjectCopy.data.data.reduce((text, message, id) => {
            return id === 0 ? message.msg : text + ' ' + message.msg;
        }, '');
    }

    getErrorMessageDetailsArray() {
        const errorObjectCopy = cloneDeep(this.errorObject);
        return errorObjectCopy.data.data.map(message => message.msg);
    }

    addErrorMessageDetails(newMessage) {
        this.errorObject.data.data.push({ msg: newMessage });
    }

    getErrorMessageData() {
        const errorMessage = this.getErrorMessage();
        const errorMessageDetailsArray = this.getErrorMessageDetailsArray();
        const errorMessageDetailsText = this.getErrorMessageDetailsText();
        return { errorMessage, errorMessageDetailsArray, errorMessageDetailsText };
    }
}

export class Message {
    constructor(message = '') {
        this.message = message;
        this.messageDetailsArray = [];
    }

    addMessageDetails(newDataMessage) {
        this.messageDetailsArray.push({ msg: newDataMessage });
    }

    getMessageDetailsArray() {
        const messageDetailsArrayCopy = cloneDeep(this.messageDetailsArray);
        return messageDetailsArrayCopy.map(message => message.msg);
    }

    getMessageDetailsText() {
        return this.messageDetailsArr.reduce((text, message, id) => {
            return id === 0 ? message.msg : text + ' ' + message.msg;
        }, '');
    }


    getMessageData() {
        const message = this.message;
        const messageDetailsArray = this.getMessageDetailsArray();
        const messageDetails = this.getMessageDetailsText();
        return { message, messageDetailsArray, messageDetails };
    }
}
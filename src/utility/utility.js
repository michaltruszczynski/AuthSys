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
        if (!errorObject.data.message) errorObject.data.message = '';
        if (!errorObject.data.data) errorObject.data.data = [];
        this.errorObject = errorObject;
    }

    getErrorMessage() {
        const errorObjectCopy = cloneDeep(this.errorObject)
        return errorObjectCopy.data.message;
    }

    getErrorDataArr() {
        const errorObjectCopy = cloneDeep(this.errorObject)
        return errorObjectCopy.data.data;
    }

    getErrorDataAsText() {
        const errorObjectCopy = cloneDeep(this.errorObject)
        return errorObjectCopy.data.data.reduce((text, message, id) => {
            return id === 0 ? message.msg : text + ' ' + message.msg;
        }, '');
    }

    convertErrMessageArray = () => {
        const errorObjectCopy = cloneDeep(this.errorObject)
        return errorObjectCopy.data.data.map(message => message.msg);
    }

    addMessage(newMessage) {
        this.errorObject.data.data.push({ msg: newMessage });
    }

    getErrorMessageData() {
        const errorMessage = this.getErrorMessage();
        const errorDataArr = this.convertErrMessageArray();
        return {errorMessage, errorDataArr}
    }
}
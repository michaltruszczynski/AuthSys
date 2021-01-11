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

export const getExpirationTimeMilliseconds = () => {
    const tokenEpirationDate = new Date(JSON.parse(localStorage.getItem('expirationDate')));
    const nowDateInMiliseconds = new Date().getTime();
    const tokenExpiresMilliseconds = tokenEpirationDate.getTime();
    const expirationTimeMilliseconds = tokenExpiresMilliseconds - nowDateInMiliseconds;
    return expirationTimeMilliseconds;
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

export class NewErrorMessage {
    constructor(error) {
        this.errorObject = null;
        if (error.response) {
            this.errorObject = cloneDeep(error.response);
            this.errorMessage = error.response.data?.message ? error.response.data.message : '';
            this.errorDetailsArray = error.response.data?.data ? cloneDeep(error.response.data.data) : [];
            console.log('error.response', error.response, this.errorObject);
        } else if (error.request) {
            this.errorObject = cloneDeep(error.request);
            this.errorMessage = 'Connection problems.'
            this.errorDetailsArray = ['Please try again later']
            console.log('error.request', error.request, this.errorObject);
        } else {
            this.errorMessage = error.message ? error.message : 'Connection problems.';
            this.errorDetailsArray = error.message ? [] : ['Please try again later'];
            console.dir(error.message)
            console.log('error', this.errorObject)
        }
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    getErrorDetailsText() {
        const errorDetailsArrayCopy = cloneDeep(this.errorDetailsArray)
        return errorDetailsArrayCopy.reduce((text, message, id) => {
            return id === 0 ? message.msg : text + ' ' + message.msg;
        }, '');
    }

    getErrorDetailsArray() {
        const errorDetailsArrayCopy = cloneDeep(this.errorDetailsArray)
        return errorDetailsArrayCopy.map(message => message.msg);
    }

    addErrorDetails(newMessage) {
        this.errorDetailsArray.push({ msg: newMessage });
    }

    getErrorMessageData() {
        const errorMessage = this.getErrorMessage();
        const errorDetailsArray = this.getErrorDetailsArray();
        const errorDetailsText = this.getErrorDetailsText();
        return { errorMessage, errorDetailsArray, errorDetailsText};
    }

    getErrorObject() {
        return this.errorObject ? cloneDeep(this.errorObject) : this.getErrorMessageData();
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
        return this.messageDetailsArray.reduce((text, message, id) => {
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


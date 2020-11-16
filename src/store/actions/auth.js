import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as messageActions from './message'
import { MESSAGE_TYPES } from './messageTypes';
import { convertErrMessageArray, addMessage } from '../../utility/utility';

export const authSignup = (authData) => {
    return dispatch => {
        dispatch(authSignupStart());
        console.log(authData);
        axios.post('http://localhost:5000/api/auth/signup', authData)
            .then(response => {
                console.log(response.data);
                dispatch(authSignupSuccess());
                const messageArr = addMessage([], 'You have been successfully registered. Please signin.')
                dispatch(messageActions.setMessage(null, messageArr, MESSAGE_TYPES.success));
            })
            .catch(err => {
                dispatch(authSignupFail(err.response.data));
                const messageTitle = err.response.data.message;
                let messageArr = [];
                if (err.response.data.data) {
                    messageArr = convertErrMessageArray(err.response.data.data);
                }
                dispatch(messageActions.setMessage(messageTitle, messageArr, MESSAGE_TYPES.success));
            })
    }
}

export const authSignupStart = () => {
    return {
        type: actionTypes.AUTH_SIGNUP_START
    }
}

export const authSignupSuccess = () => {
    return {
        type: actionTypes.AUTH_SIGNUP_SUCCESS,
    }
}

export const authSignupFail = (error) => {
    return {
        type: actionTypes.AUTH_SIGNUP_FAIL,
        error: error
    }
}

export const authStatusReset = () => {
    return {
        type: actionTypes.AUTH_STATUS_RESET
    }
}

export const authSignin = (authData) => {
    return dispatch => {
        dispatch(authSigninStart());
        console.log(authData);
        axios.post('http://localhost:5000/api/auth/signin', authData)
            .then(response => {
                console.log(response.data);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn)
                // localStorage.setItem('user', JSON.stringify(response.data))
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.userId);
                dispatch(authSigninSuccess(response.data.token, response.data.userId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }).catch(err => {
                dispatch(authSigninFail(err.response.data));
                console.log(err.response.data)
                const messageTitle = err.response.data.message;
                let messageArr = [];
                // if (err.response.data.data) {
                //     messageArr = convertErrMessageArray(err.response.data.data);
                // }
                dispatch(messageActions.setMessage(messageTitle, messageArr, MESSAGE_TYPES.success));
            })
    }
}

export const authSigninStart = () => {
    return {
        type: actionTypes.AUTH_SIGNIN_START
    }
}

export const authSigninSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SIGNIN_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authSigninFail = (error) => {
    return {
        type: actionTypes.AUTH_SIGNIN_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSigninStart());
                const authHeader = { 'x-access-token': token };
                axios.get('http://localhost:5000/api/auth/authUserCheck', { headers: authHeader })
                    .then(response => {
                        console.log(response.data.token, response.data.userId);
                        dispatch(authSigninSuccess(response.data.token, response.data.userId));
                        dispatch(checkAuthTimeout(response.data.expiresIn));
                    })
                    .catch(err => {
                        console.log(err)
                        dispatch(logout());
                        dispatch(authSigninFail(err.response.data));
                    })
            }
        }
    }
}
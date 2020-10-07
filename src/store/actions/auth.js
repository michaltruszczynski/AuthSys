import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authSignup = (authData) => {
    return dispatch => {
        dispatch(authStart());
        console.log(authData);
        axios.post('http://localhost:5000/api/auth/signup', authData)
            .then(response => {
                console.log(response.data);
                dispatch(authSuccess());
                dispatch(setAuthRedirectPath('/signin'))
                // return Promise.resolve();
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(authFail(err.response.data));
            })
    }
}

export const authSignin = (authData) => {
    return dispatch => {
        dispatch(authStart());
        console.log(authData);
        axios.post('http://localhost:5000/api/auth/signin', authData)
            .then(response => {
                console.log(response.data);
            }).catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
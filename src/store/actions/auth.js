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
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
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


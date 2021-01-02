import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as messageActions from './message'
import { MESSAGE_TYPES } from './messageTypes';
import { Message, ErrorMessage, getExpirationTimeMilliseconds } from '../../utility/utility';
import { userService } from '../../services/authService';

export const authSignup = ({ name, email, password }) => {
    return dispatch => {
        dispatch(authSignupStart());
        userService.signup(name, email, password)
            .then(response => {
                console.log(response.data);
                dispatch(authSignupSuccess());
                const signupMessage = new Message('You have been successfully registered.');
                signupMessage.addMessageDetails('Please signin.');
                const { message, messageDetailsArray } = signupMessage.getMessageData()
                dispatch(messageActions.setMessage(message, messageDetailsArray, MESSAGE_TYPES.success));
            })
            .catch(error => {
                dispatch(authSignupFail(error.response.data));
                const errroMessage = new ErrorMessage(error.response);
                const { errorMessage, errorMessageDetailsArray } = errroMessage.getErrorMessageData();
                dispatch(messageActions.setMessage(errorMessage, errorMessageDetailsArray, MESSAGE_TYPES.success));
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

export const authSignin = ({ email, password }) => {
    return dispatch => {
        dispatch(authSigninStart());
        userService.signin(email, password)
            .then(response => {
                console.log(response.data)
                dispatch(authSigninSuccess(response.data.token, response.data.userId));
                dispatch(checkAuthTimeout(response.data.expiresIn));

            }).catch(error => {
                dispatch(authSigninFail(error.response.data));
                console.log(error.response);
                const errroMessage = new ErrorMessage(error.response);
                const { errorMessage, errorMessageDetailsArray } = errroMessage.getErrorMessageData();
                dispatch(messageActions.setMessage(errorMessage, errorMessageDetailsArray, MESSAGE_TYPES.success));

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
    userService.logout();
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
}

export const authCheckState = () => {
    return dispatch => {
        userService.authCheck()
            .then(response => {
                console.log(response.data.token, response.data.userId);
                dispatch(authSigninSuccess(response.data.token, response.data.userId));
                dispatch(checkAuthTimeout(getExpirationTimeMilliseconds()));
            })
            .catch((error) => {
                console.dir(error);
                if (error.response) {
                    console.log('error response')
                } else if (error.request) {
                    console.log('error request')
                } else {
                    console.log('error')
                }

                dispatch(logout());
                // dispatch(authSigninFail(err.response.data));
            })

        // const token = JSON.parse(localStorage.getItem('token'))
        // console.log(token)
        // if (!token) {
        //     dispatch(logout());
        // } else {
        //     const expirationDate = new Date(JSON.parse(localStorage.getItem('expirationDate')));
        //     if (expirationDate <= new Date()) {
        //         dispatch(logout());
        //     } else {
        //         dispatch(authSigninStart());
        //         const authHeader = { 'x-access-token': token };
        //         axios.get('http://localhost:5000/api/auth/authUserCheck', { headers: authHeader })
        //             .then(response => {
        //                 console.log(response.data.token, response.data.userId);
        //                 dispatch(authSigninSuccess(response.data.token, response.data.userId));
        //                 dispatch(checkAuthTimeout(Date.getTime(JSON.parse(localStorage.getItem('expirationDate')))));
        //             })
        //             .catch(err => {
        //                 console.log(err)
        //                 dispatch(logout());
        //                 dispatch(authSigninFail(err.response.data));
        //             })
        //     }
        // }
    }
}

//  kopie

// export const authSignup = (authData) => {
//     return dispatch => {
//         dispatch(authSignupStart());
//         console.log(authData);
//         axios.post('http://localhost:5000/api/auth/signup', authData)
//             .then(response => {
//                 console.log(response.data);
//                 dispatch(authSignupSuccess());
//                 const messageArr = addMessage([], 'You have been successfully registered. Please signin.')
//                 dispatch(messageActions.setMessage(null, messageArr, MESSAGE_TYPES.success));
//             })
//             .catch(err => {
//                 dispatch(authSignupFail(err.response.data));
//                 const messageTitle = err.response.data.message;
//                 let messageArr = [];
//                 if (err.response.data.data) {
//                     messageArr = convertErrMessageArray(err.response.data.data);
//                 }
//                 dispatch(messageActions.setMessage(messageTitle, messageArr, MESSAGE_TYPES.success));
//             })
//     }
// }

// export const authSignin = (authData) => {
//     return dispatch => {
//         dispatch(authSigninStart());
//         console.log(authData);
//         axios.post('http://localhost:5000/api/auth/signin', authData)
//             .then(response => {
//                 console.log(response.data);
//                 const expirationDate = new Date(new Date().getTime() + response.data.expiresIn)
//                 // localStorage.setItem('user', JSON.stringify(response.data))
//                 localStorage.setItem('token', response.data.token);
//                 localStorage.setItem('expirationDate', expirationDate);
//                 localStorage.setItem('userId', response.data.userId);
//                 dispatch(authSigninSuccess(response.data.token, response.data.userId));
//                 dispatch(checkAuthTimeout(response.data.expiresIn));
//             }).catch(err => {
//                 dispatch(authSigninFail(err.response.data));
//                 console.log(err.response.data)
//                 const messageTitle = err.response.data.message;
//                 let messageArr = [];
//                 // if (err.response.data.data) {
//                 //     messageArr = convertErrMessageArray(err.response.data.data);
//                 // }
//                 dispatch(messageActions.setMessage(messageTitle, messageArr, MESSAGE_TYPES.success));
//             })
//     }
// }

// export const authCheckState = () => {
//     return dispatch => {
//         const token = localStorage.getItem('token')
//         if (!token) {
//             dispatch(logout());
//         } else {
//             const expirationDate = new Date(localStorage.getItem('expirationDate'));
//             if (expirationDate <= new Date()) {
//                 dispatch(logout());
//             } else {
//                 dispatch(authSigninStart());
//                 const authHeader = { 'x-access-token': token };
//                 axios.get('http://localhost:5000/api/auth/authUserCheck', { headers: authHeader })
//                     .then(response => {
//                         console.log(response.data.token, response.data.userId);
//                         dispatch(authSigninSuccess(response.data.token, response.data.userId));
//                         dispatch(checkAuthTimeout(response.data.expiresIn));
//                     })
//                     .catch(err => {
//                         console.log(err)
//                         dispatch(logout());
//                         dispatch(authSigninFail(err.response.data));
//                     })
//             }
//         }
//     }
// }
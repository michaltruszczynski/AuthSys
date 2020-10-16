import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utility/utility';

const initialState = {
    token: null,
    userId: null,
    // authSuccess: false,
    error: null,
    loading: false,
    authRedirectPath: null,
    authSignupSuccess: false,
    // authSigninSuccess: false
}

const authSignupStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSignupSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        authRedirectPath: action.path,
        // authSuccess: true,
        authSignupSuccess: true
    });
}

const authSignupFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
}

const authSignupReset = (state, action) => {
    return updateObject(state, {
        authSignupSuccess: false
    })
}

const authSigninStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
        authRedirectPath: null,
        authSignupSuccess: false
    });
}

const authSigninSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
    });
}

const authSigninFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}
const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SIGNUP_START: return authSignupStart(state, action);
        case actionTypes.AUTH_SIGNUP_SUCCESS: return authSignupSuccess(state, action);
        case actionTypes.AUTH_SIGNUP_FAIL: return authSignupFail(state, action);
        case actionTypes.AUTH_SIGNUP_RESET: return authSignupReset(state, action);
        case actionTypes.AUTH_SIGNIN_START: return authSigninStart(state, action);
        case actionTypes.AUTH_SIGNIN_SUCCESS: return authSigninSuccess(state, action);
        case actionTypes.AUTH_SIGNIN_FAIL: return authSigninFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default:
            return state;
    }
}

export default reducer;
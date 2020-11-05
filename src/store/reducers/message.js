import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utility/utility';

const initialState = {
    message: null,
    error: null
}

const setSuccessMessage = (state, action) => {
    return updateObject(state, {message: action.message});
}

const setErrorMessage = (state, action) => {
    return updateObject(state, {error: action.error})
}

const clearMessgae = (state, action) => {
    return updateObject(state, {
        message: null,
        error: null
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SUCCESS_MESSAGE: return setSuccessMessage(state, action);
        case actionTypes.SET_ERROR_MESSAGE: return setErrorMessage(state, action);
        case actionTypes.CLEAR_MESSAGE: return clearMessgae(state, action);
        default:
            return state;
    }
}

export default reducer;
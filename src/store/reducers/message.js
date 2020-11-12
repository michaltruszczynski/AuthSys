import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utility/utility';

const initialState = {
    messageTitle: '',
    message: '',
    type: null

}

const setMessage = (state, action) => {
    return updateObject(state, {
        messageTitle: action.messageTitle,
        message: action.message,
        type: action.messageType
    })
}

const clearMessgae = (state, action) => {
    return updateObject(state, {
        messageTitle: '',
        message: '',
        type: null
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MESSAGE: return setMessage(state, action);
        case actionTypes.CLEAR_MESSAGE: return clearMessgae(state, action);
        default:
            return state;
    }
}

export default reducer;
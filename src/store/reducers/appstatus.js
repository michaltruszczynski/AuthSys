import * as actionTypes from '../actions/actionTypes';
// import { updateObject } from '../../utility/utility';

const initialState = {
    navBar: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.NAV_DISABLED:
            return { navBar: false }
        case actionTypes.NAV_ENABLED:
            return { navBar: true }
        default:
            return state;
    }
}

export default reducer;
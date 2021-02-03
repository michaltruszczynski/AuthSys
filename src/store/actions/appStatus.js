import * as actionTypes from './actionTypes';

export const navBarEnabled = () => {
    return {
        type: actionTypes.NAV_ENABLED
    }
};

export const navBarDisabled = () => {
    return {
        type: actionTypes.NAV_DISABLED
    }
};

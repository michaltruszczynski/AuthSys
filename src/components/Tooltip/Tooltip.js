import React from 'react';

import Portal from '../UI/Portal/Portal';

const Tooltip = (props) => {


    return (
        <>
            <Portal>
                {props.children}
            </Portal>
        </>
    )
}

export default Tooltip;
import React from 'react';

import Portal from '../UI/Portal/Portal';
import styles from './Tooltip.module.css';

const Tooltip = ({position, children}) => {
    // console.log(position)
    // const styleCoords = {
    //     top: position.top + 'px',
    //     left: position.left + 'px'
    // }
    return (
        <Portal>
            <div className={styles.tooltip} >
                {children}
            </div>
        </Portal>
    )
}

export default Tooltip;
import React from 'react';

import Portal from '../UI/Portal/Portal';
import styles from './Tooltip.module.css';

const Tooltip = ({ position, children }) => {
    if (!position) return null;


    const styleCoords = {
        top: position.top + 'px',
        left: position.left + 'px'
    }


    return (
        <Portal>
            <div className={styles.tooltip} style={styleCoords} >
                {children}
            </div>
        </Portal>
    )
}

export default Tooltip;
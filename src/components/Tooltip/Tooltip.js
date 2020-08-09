import React from 'react';

import Portal from '../UI/Portal/Portal';
import styles from './Tooltip.module.css';

const Tooltip = React.forwardRef(({ children }, ref) => {
    // if (!position) return null;

    // const styleCoords = {
    //     top: position.top + 'px',
    //     left: position.left + 'px'
    // }

    console.log('Tooltip, top:', ref)
    return (
        <Portal>
            <div className={styles.tooltip} ref={ref} >
                {children}
            </div>
        </Portal>
    )
})

export default Tooltip;
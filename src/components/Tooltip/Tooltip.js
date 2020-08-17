import React from 'react';

import Portal from '../UI/Portal/Portal';
import styles from './Tooltip.module.css';

// eslint-disable-next-line react/display-name
const Tooltip = React.forwardRef(({ children }, ref) => {

    return (
        <Portal>
            <div className={styles.tooltip} ref={ref} >
                {children}
            </div>
        </Portal>
    )
})

export default Tooltip;
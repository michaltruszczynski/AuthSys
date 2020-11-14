import React from 'react';

import styles from './MobileToggle.module.css'

const MobileToggle = ({clicked}) => (
    <div className={styles.Menu__toggle} onClick={clicked}>
        <i className={`fas fa-bars ${styles['Menu__toggle-icon']}`}></i>
    </div>
)

export default MobileToggle;
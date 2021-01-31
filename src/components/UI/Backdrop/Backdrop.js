import React from 'react';

import styles from './Backdrop.module.css';

const Backdrop = ({ show, clicked }) => {
    return (
        <div className={[styles.Backdrop, show ? styles['Backdrop--visible'] : ''].join(' ')} onClick={clicked}>

        </div>
    );
}

export default Backdrop;
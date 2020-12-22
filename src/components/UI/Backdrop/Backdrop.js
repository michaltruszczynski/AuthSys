import React from 'react';

import './Backdrop.css';

const Backdrop = ({ show, clicked }) => {
    return (
        <div className={['backdrop', show ? 'backdrop--visible' : ''].join(' ')} onClick={clicked}>

        </div>
    );
}

export default Backdrop;
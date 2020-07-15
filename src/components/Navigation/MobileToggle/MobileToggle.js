import React from 'react';

import './MobileToggle.css'

const MobileToggle = ({clicked}) => (
    <div className="menu__toggle" onClick={clicked}>
        <i className="fas fa-bars menu__toggle-icon"></i>
    </div>
)

export default MobileToggle;
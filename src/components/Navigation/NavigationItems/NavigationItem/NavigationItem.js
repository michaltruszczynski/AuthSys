import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const NavigationItem = props => {
    return (
        <li className="menu__item">
            <NavLink
                to={props.link}
                exact={props.exact}
                className="menu__link"
            >{props.children}</NavLink>
        </li>
    )
}

export default NavigationItem;
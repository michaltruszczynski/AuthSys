import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItem.module.css';

const NavigationItem = props => {
    return (
        <li className={styles.Menu__item}>
            <NavLink
                to={props.link}
                exact={props.exact}
                className={styles.Menu__link}
            >{props.children}</NavLink>
        </li>
    )
}

export default NavigationItem;
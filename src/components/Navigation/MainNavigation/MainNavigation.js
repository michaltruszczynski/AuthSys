import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MobileToggle from '../MobileToggle/MobileToggle';

import styles from  './MainNavigation.module.css';

const MainNavigation = ({ mobileNavClicked, mobileNavShow, isAuth }) => (

    <nav className={styles.Menu}>
        <div className={styles.Menu__container}>
            <Logo />
            <NavigationItems isAuth={isAuth} role={1} showMobileNav={mobileNavShow} />
            <MobileToggle clicked={mobileNavClicked} />
        </div>
    </nav>
)

export default MainNavigation;
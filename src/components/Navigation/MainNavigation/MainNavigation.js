import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MobileToggle from '../MobileToggle/MobileToggle';

import './MainNavigation.css';

const MainNavigation = ({ mobileNavClicked, mobileNavShow }) => (

    <nav className="menu">
        <div className="menu__container">
            <Logo />
            <NavigationItems isAuth={false} role={1} showMobileNav={mobileNavShow} />
            <MobileToggle clicked={mobileNavClicked} />
        </div>
    </nav>
)

export default MainNavigation;
import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import './NavigationItems.css';

// roles: superAdmin: 1, admin: 2, user: 1

const navItems = [
    { id: 'home', text: 'Feed', link: '/', auth: false, role: [1, 2, 3] },
    { id: 'blog', text: 'Blog', link: '/blog', auth: true, role: [1, 2, 3] },
    { id: 'shop', text: 'Shop', link: '/shop', auth: false, role: [1, 2, 3] },
    { id: 'login', text: 'Login', link: '/signin', auth: false, role: [1, 2, 3] },
    { id: 'logup', text: 'Signup', link: '/signup', auth: false, role: [1, 2, 3] }
];

const NavigationItems = ({ isAuth, role, showMobileNav }) => {

    const userNavItems = navItems.filter(item => item.auth === isAuth && item.role.includes(role))

    const userNavLinks = userNavItems.map(item => (<NavigationItem key={item.id} link={item.link} exact>{item.text}</NavigationItem>));

    let classList = ['menu__list'];

    if (showMobileNav) {
        classList = ['menu__list', 'menu--toggle']
    }

    return (
        <div className="menu__list-container">
            <ul className={classList.join(' ')}>
                {userNavLinks}
            </ul>
        </div>

    );
}

export default NavigationItems;
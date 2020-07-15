import React, { Fragment, useState } from 'react';

import MainNavigation from '../Navigation/MainNavigation/MainNavigation';
import Backdrop from '../UI/Backdrop/Backdrop';

import './Layout'

const Layout = props => {

    // const [showBackdrop, setShowBackdrop] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);

    // const backdropHandler = () => {
    //     setShowBackdrop(!showBackdrop);
    //     setShowMobileNav(!showMobileNav);
    // }

    const mobileNavHandler = () => {
        // setShowBackdrop(!showBackdrop);
        setShowMobileNav(!showMobileNav);
    }

    return (
        <Fragment>
            <Backdrop show={showMobileNav} clicked={mobileNavHandler} />
            <header>
                <MainNavigation mobileNavClicked={mobileNavHandler} mobileNavShow={showMobileNav} />
            </header>
            <main>
                <section className="section">
                    <div className="section__container">
                        {props.children}
                    </div>
                </section>
            </main>
            <footer></footer>
        </Fragment>
    )
}

export default Layout;
import React, { Component } from 'react';
import { connect } from 'react-redux'

import MainNavigation from '../Navigation/MainNavigation/MainNavigation';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';

import * as actions from '../../store/actions/index';

import './Layout'

class Layout extends Component {
    state = {
        showMobileNav: false
    }

    // const backdropHandler = () => {
    //     setShowBackdrop(!showBackdrop);
    //     setShowMobileNav(!showMobileNav);
    // }

    mobileNavHandler = () => {
        this.setState(prevState => ({
            showMobileNav: !prevState.showMobileNav
        }));
    }

    modalHandler = () => {
        this.props.onClearMesage();
    }

    render() {
        return (
            <>
                <Modal successMessage={this.props.successMessage} errorMessage={this.props.errorMessage} modalClicked={this.modalHandler}/>
                <Backdrop show={this.state.showMobileNav} clicked={this.mobileNavHandler} />
                <header>
                    <MainNavigation mobileNavClicked={this.mobileNavHandler} mobileNavShow={this.state.showMobileNav} />
                </header>
                <main>
                    <section className="section">
                        <div className="section__container">
                            {this.props.children}
                        </div>
                    </section>
                </main>
                <footer></footer>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        successMessage: state.message.message,
        errorMessage: state.message.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClearMesage: dispatch(actions.clearMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
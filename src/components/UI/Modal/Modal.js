import React, { Component } from 'react';
import { connect } from 'react-redux';

import Portal from '../Portal/Portal';
import Button from '../../Button/Button';
import styles from './Modal.module.css';

import * as actions from '../../../store/actions';

class Modal extends Component {

    modalCloseHandler = () => {
        this.props.onClearMessage();
    }

    render() {
        const { message, messageTitle } = this.props;
        return (
            (message.length || messageTitle) ? (
                <Portal targetContainer={'modal'}>
                    <div className={styles.Backdrop}>
                        <div className={styles.Modal__wrapper}>
                            <div className={styles.Modal__header}>
                                <i className={`far fa-window-close ${styles["Modal__close-button"]}`}></i>
                            </div>
                            <div className={styles.Modal__content}>
                                <h1 className={styles.Modal__heading}>{messageTitle}</h1>
                                {message.map((msg, index) => (
                                    <p key={index} className={styles.Modal__text}>
                                        {msg}
                                    </p>))
                                }
                            </div>
                            <Button disabled={false} btnStyle={"primary"} type={"button"} clickHandler={this.modalCloseHandler}>Close</Button>
                        </div>
                    </div>
                </Portal >
            ) : null
        )
    }
}

const mapStateToProps = state => {
    return {
        messageTitle: state.message.messageTitle,
        message: state.message.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClearMessage: () => dispatch(actions.clearMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
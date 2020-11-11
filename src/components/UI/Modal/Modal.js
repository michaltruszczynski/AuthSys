import React from 'react';

import Portal from '../Portal/Portal';
import Button from '../../Button/Button';
import styles from './Modal.module.css';

const Modal = ({ successMessage, errorMessage, modalClicked }) => {

    return (
        (successMessage || errorMessage) ? (
            <Portal targetContainer={'modal'}>
                <div className={styles.Backdrop}>
                    <div className={styles.Modal__wrapper}>
                        <div className={styles.Modal__header}>
                        <i className={`far fa-window-close ${styles["Modal__close-button"]}`}></i>
                        </div>
                        <div className={styles.Modal__content}>
    
                            <p className={styles.Modal__text}>
                                {errorMessage && errorMessage}
                                {successMessage && successMessage}
                            </p>
                        </div>
                        <Button disabled={false} btnStyle={"primary"} onClick={modalClicked}>Close</Button>
                    </div>
                </div>
            </Portal>
        ) : null
    )
}

export default Modal;
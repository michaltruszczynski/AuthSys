import React from 'react';

import styles from './Button.module.css';

const buttonStyles = {
    primary: 'primary',
    success: 'success',
    danger: 'danger'
}

const Button = ({ disabled, children, type, btnStyle, clickHandler }) => {
    let classList;

    switch (btnStyle) {
        case buttonStyles.primary:
            classList = [styles["Button"], styles["Button--primary"]];
            break;
        case buttonStyles.success:
            classList = [styles["Button"], styles["Button--success"]];
            break;
        case buttonStyles.danger:
            classList = [styles["Button"], styles["Button--danger"]];
            break;
        default:
            classList = [styles["Button"], styles["Button--primary"]];
            break;
    }


    return (
        <button
            className={classList.join(' ')}
            disabled={disabled}
            type={type}
            onClick={clickHandler}>
            {children}
        </button>
    )
}

Button.defaultProps = {
    type: "button",
    disabled: false,
    btnStyle: buttonStyles.prmimary
}

export default Button;


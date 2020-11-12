import React from 'react';

import styles from './Button.module.css';

const butonStyles = {
    prmimary: 'primary',
    success: 'success',
    danger: 'danger'
}

const Button = ({ disabled, children, type, btnStyle, clickHandler }) => {
    let classList;

    switch (btnStyle) {
        case butonStyles.prmimary:
            classList = [styles["Button"], styles["Button--primary"]];
            break;
        case butonStyles.success:
            classList = [styles["Button"], styles["Button--success"]];
            break;
        case butonStyles.danger:
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
    btnStyle: butonStyles.prmimary
}

export default Button;


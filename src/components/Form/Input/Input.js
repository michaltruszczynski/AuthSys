import React from 'react';

import styles from './Input.module.css';

const Input = ({ id, elementType, config, value, invalid, touched, changed, errorMsg }) => {

    let inputElement = null;

    let inputClasses = [styles.Form__input];
    if (!invalid && touched) {
        inputClasses.push(styles['Form__input--error'])
    }

    switch (elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                type={config.type}
                id={id}
                name={id}
                value={value}
                placeholder={config.placeholder}
                onChange={changed}
            />
    }

    return (
        <div className={styles.Form__item}>
            <label htmlFor={id} className={styles.Form__label}>{config.label}: </label>
            {inputElement}
            <span className={styles['Form__input-error']}>{errorMsg}</span>
        </div>
    )
}
export default Input;
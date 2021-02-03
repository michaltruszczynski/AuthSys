import React, { useState } from 'react';
import PasswordValidator from '../../Validator/Validator';
import ToggleContent from '../../ToggleContent/ToggleContent';

import styles from './PasswordInput.module.css';

const PasswordInput = ({ id, config, value, invalid, touched, changed, errorMsg }) => {

    const [isInputActive, setIsInputActive] = useState(false);

    const focusHandler = () => {
        setIsInputActive(!isInputActive);
    };

    let inputClasses = [styles.Form__input];
    if (!invalid && touched) {
        inputClasses.push(styles['Form__input--error'])
    }

    return (
        <div className={styles.Form__item}>
            <label htmlFor={id} className={styles.Form__label}>{config.label}: </label>
            <input
                className={inputClasses.join(' ')}
                type={config.type}
                id={id}
                name={id}
                value={value}
                placeholder={config.placeholder}
                onChange={changed}
                onFocus={focusHandler}
                onBlur={focusHandler}
            />
            <span className={styles['Form__input-error']}>{errorMsg}</span>
            {
                <ToggleContent show={!invalid && isInputActive}>
                    <PasswordValidator value={value} active={isInputActive} type={'tooltip'} large={false} />
                </ToggleContent>
            }
        </div>
    )
}

export default PasswordInput;
import React, { useState } from 'react';
import PasswordValidator from '../../Validator/Validator';

import './Input.css';

const Input = ({ id, elementType, config, value, invalid, touched, changed, errorMsg, validator}) => {

    const [isInputActive, setIsInputActive] = useState(false);

    const focusHandler = (isInputActive) => {
        setIsInputActive(!isInputActive);
    }

    console.log(isInputActive)

    let inputElement = null;

    let inputClasses = ["form__input"];
    if (!invalid && touched) {
        inputClasses.push("form__input--error")
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
                onFocus={() => focusHandler(isInputActive)}
                onBlur={() => focusHandler(isInputActive)}
            />

    }

    return (
        <div className="form__item">
            <label htmlFor={id} className="form__label">{config.label}: </label>
            {inputElement}
            <span className="form__input-error">{errorMsg}</span>
            {validator && <PasswordValidator value={value} active={isInputActive}/>}
        </div>
    )
}
export default Input;
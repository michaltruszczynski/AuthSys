import React from 'react';

import './Input.css';

const Input = ({ id, elementType, config, value, invalid, touched, changed, errorMsg }) => {

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
            />
    }

    return (
        <div className="form__item">
            <label htmlFor={id} className="form__label">{config.label}: </label>
            {inputElement}
            <span className="form__input-error">{errorMsg}</span>
        </div>
    )
}
export default Input;
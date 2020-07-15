import React, { Component } from 'react';
import './Input.css';

const Input = (props) => {
    const {id, elementType, config, value, invalid, touched, changed} = props;
    let inputElement = null;
    let inputClasses = ["form__input"];
    if (!invalid && touched) {
        inputClasses.push("form__input--error")
    }
    console.log(inputClasses, invalid, touched)
    switch (elementType) {
        case ('input'):
            inputElement = <input
                    className={inputClasses.join(' ')}
                    type={config.type}
                    id={id}
                    name={id}
                    // required={true}
                    value={value}
                    placeholder={config.placeholder}
                    onChange={changed}
                />
            
    }

    return (
        <div className="form__item">
            <label htmlFor={id} className="form__label">{config.label}: </label>
            {inputElement}
            <span className="form__input-error">Form validation message</span>
        </div>
    )
}
export default Input;
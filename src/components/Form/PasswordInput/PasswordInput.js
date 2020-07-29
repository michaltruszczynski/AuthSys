import React, { useState, useRef, useEffect } from 'react';
import PasswordValidator from '../../Validator/Validator';
import ToolTip from '../../Tooltip/Tooltip';
import Resize from '../../UI/Resize/Resize';

import './PasswordInput.css';

const PasswordInput = ({ id, elementType, config, value, invalid, touched, changed, errorMsg, validator, isFocused }) => {

    const [isInputActive, setIsInputActive] = useState(false);
    const [coords, setCoords] = useState()

    const passwordInputElementRef = useRef();
    

    useEffect(() => {

       setCoords(passwordInputElementRef.current.getBoundingClientRect());

    }, [])


    const focusHandler = () => {
        setIsInputActive(!isInputActive);
    }

    console.log(isInputActive);

    let inputClasses = ["form__input"];
    if (!invalid && touched) {
        inputClasses.push("form__input--error")
    }
    console.log('isFocused', isFocused, coords);
    


    return (
        <div className="form__item">
        <Resize />
            <label htmlFor={id} className="form__label">{config.label}: </label>
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
                ref={passwordInputElementRef}
            />
            <span className="form__input-error">{errorMsg}</span>
            {true && <ToolTip>
                <PasswordValidator value={value} active={isInputActive} type={'tooltip'} />
            </ToolTip>}
        </div>
    )
}
export default PasswordInput;
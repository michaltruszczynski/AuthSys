import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import PasswordValidator from '../../Validator/Validator';
import ToolTip from '../../Tooltip/Tooltip';
import Resize from '../../UI/Resize/Resize';
import useWindowSize from '../../../hooks/useWindowSize';

import './PasswordInput.css';

const PasswordInput = ({ id, elementType, config, value, invalid, touched, changed, errorMsg, validator, isFocused }) => {

    const [isInputActive, setIsInputActive] = useState(false);
    const [coords, setCoords] = useState();
    const size = useWindowSize();
    const passwordInputElementRef = useRef();

    useEffect(() => {
        console.log('Password input DidMount');
        function handlePosition() {
            const coordsRefEl = passwordInputElementRef.current.getBoundingClientRect();
            const { height, width, top, left } = coordsRefEl;
            const tooltipCoords = {
                top: top + window.scrollY +  Math.floor(height / 2),
                left: left + width
            };
            console.log('tooltipCoords' , tooltipCoords);
            setCoords(tooltipCoords)
        }

        handlePosition();

    }, []);


    const focusHandler = () => {
        setIsInputActive(!isInputActive);
    };

    console.log(isInputActive);

    let inputClasses = ["form__input"];
    if (!invalid && touched) {
        inputClasses.push("form__input--error")
    }
    console.log('isFocused', isFocused, coords);

    return (
        <div className="form__item">
            <Resize />
            <p>{size.width}</p>
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
            {}
            {true && <ToolTip position={coords}>
                <PasswordValidator value={value} active={isInputActive} type={'tooltip'} />
            </ToolTip>}
        </div>
    )
}

export default PasswordInput;
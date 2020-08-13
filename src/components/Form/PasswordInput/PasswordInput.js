import React, { useState, useRef, useEffect, useCallback } from 'react';
import PasswordValidator from '../../Validator/Validator';
import ToolTip from '../../Tooltip/Tooltip';
import ToggleContent from '../../ToggleContent/ToggleContent'
// import Resize from '../../UI/Resize/Resize';
// import useWindowSize from '../../../hooks/useWindowSize';

import './PasswordInput.css';

const PasswordInput = ({ id, elementType, config, value, invalid, touched, changed, errorMsg, validator, isFocused }) => {

    const [isInputActive, setIsInputActive] = useState(false);
    // const [coords, setCoords] = useState();
    const passwordInputElementRef = useRef();
    const tooltipRef = useRef();

    // const size = useWindowSize();
    const handlePosition = () => {
        if (!passwordInputElementRef.current) return;
        const coordsRefEl = passwordInputElementRef.current.getBoundingClientRect();
        const { height, width, top, left } = coordsRefEl;
        const tooltipCoords = {
            top: top + window.scrollY,
            left: left + width
        };
        console.log('tooltipCoords', tooltipCoords);
        console.log('coordsRefEl', coordsRefEl)
        // setCoords(tooltipCoords)
        tooltipRef.current.style.top = tooltipCoords.top + 'px';
        tooltipRef.current.style.left = tooltipCoords.left + 'px';
    };

    useEffect(() => {
        console.log('[componentDidMount] Password input ');

        handlePosition();
        window.addEventListener('resize', handlePosition);
        return () => {window.removeEventListener('resize', handlePosition); console.log('unmounting')};
    });


    const focusHandler = () => {
        setIsInputActive(!isInputActive);
    };

    // console.log(isInputActive);

    let inputClasses = ["form__input"];
    if (!invalid && touched) {
        inputClasses.push("form__input--error")
    }
    // console.log('isFocused', isFocused, coords);
    // console.log('size', size)

    let show = true;


    return (
        <div className="form__item">
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
            {show && <ToolTip ref={tooltipRef}>
                <PasswordValidator value={value} active={isInputActive} type={'tooltip'} large={true} />
            </ToolTip>}

            {
                show && <PasswordValidator value={value} active={isInputActive} type={'tooltip'} large={false} />
            }


        </div>
    )
}

export default PasswordInput;
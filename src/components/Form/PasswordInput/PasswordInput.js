import React, { useState, useRef, useEffect } from 'react';
import PasswordValidator from '../../Validator/Validator';
import ToolTip from '../../Tooltip/Tooltip';
import ToggleContent from '../../ToggleContent/ToggleContent';

// import useWindowSize from '../../../hooks/useWindowSize';
import useElementDimensions from '../../../hooks/useElementDimensions';
import useTooltip from '../../../hooks/useTooltip';

import './PasswordInput.css';

const PasswordInput = ({ id, elementType, config, value, invalid, touched, changed, errorMsg, validator, isFocused }) => {

    const [isInputActive, setIsInputActive] = useState(false);
    const [showPswdRules, setShowPswdRules] = useState(false);
    const [tooltipRef, elementRef] = useTooltip();

    // const size = useWindowSize();

    const focusHandler = () => {
        setIsInputActive(!isInputActive);
    };

    const handleToggleContent = () => {
        setShowPswdRules(prevState => !prevState)
    }

    let inputClasses = ["form__input"];
    if (!invalid && touched) {
        inputClasses.push("form__input--error")
    }

    const show = true;

    return (
        <div className="form__item">
            <label htmlFor={id} className="form__label" onClick={handleToggleContent}>{config.label}: </label>
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
                // ref={passwordInputElementRef}
                // ref={inputRef}
                ref={elementRef}
            />
            <span className="form__input-error">{errorMsg}</span>
            {show && <ToolTip ref={tooltipRef}>
                <PasswordValidator value={value} active={isInputActive} type={'tooltip'} large={true} />
            </ToolTip>}
            {
                // <ToggleContent show={showPswdRules}><PasswordValidator value={value} active={isInputActive} type={'tooltip'} large={false} /></ToggleContent>
            }
        </div>
    )
}

export default PasswordInput;
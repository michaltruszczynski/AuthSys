import React, { useState, useRef, useEffect } from 'react';
import PasswordValidator from '../../Validator/Validator';
import ToolTip from '../../Tooltip/Tooltip';
import ToggleContent from '../../ToggleContent/ToggleContent';

// import useWindowSize from '../../../hooks/useWindowSize';
// import useElementDimensions from '../../../hooks/useElementDimensions';
import useSetTooltipPosition from '../../../hooks/useSetTooltipPosition';
import useTooltipVisible from '../../../hooks/useTooltipVisible';

import './PasswordInput.css';

const PasswordInput = ({ id, elementType, config, value, invalid, touched, changed, errorMsg, validator, isFocused }) => {

    const [isInputActive, setIsInputActive] = useState(false);
    const [showPswdRules, setShowPswdRules] = useState(false);
    const inputRef = useRef()
    const [tooltipRef, visible] = useSetTooltipPosition(inputRef);
    // const [visible] = useTooltipVisible(inputRef, tooltipRef);
    // const [inputDimensions] = useElementDimensions(inputRef);

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
                ref={inputRef}
            />
            <span className="form__input-error">{errorMsg}</span>
            {visible && <ToolTip ref={tooltipRef}>
                <PasswordValidator value={value} active={isInputActive} type={'tooltip'} large={true} />
            </ToolTip>}
            {
                !visible && <ToggleContent show={!invalid && touched}><PasswordValidator value={value} active={isInputActive} type={'tooltip'} large={false} /></ToggleContent>
            }
        </div>
    )
}

export default PasswordInput;
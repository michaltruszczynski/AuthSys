import React, { useState, useRef, useEffect } from 'react';
import PasswordValidator from '../../Validator/Validator';
import ToolTip from '../../Tooltip/Tooltip';
import ToggleContent from '../../ToggleContent/ToggleContent';

import useSetTooltipPosition from '../../../hooks/useSetTooltipPosition';
// import useElementDimensions from '../../../hooks/useElementDimensions';

import './PasswordInput.css';

const PasswordInput = ({ id, elementType, config, value, invalid, touched, changed, errorMsg, validator, isFocused }) => {

    const [isInputActive, setIsInputActive] = useState(false);
    const inputRef = useRef();
    // const [ddd] = useElementDimensions(inputRef);
    const [tooltipRef, visible] = useSetTooltipPosition(inputRef);

    useEffect(() => {
        console.log('[PasswordInput] rendering')
    })

    const focusHandler = () => {
        setIsInputActive(!isInputActive);
    };

    let inputClasses = ["form__input"];
    if (!invalid && touched) {
        inputClasses.push("form__input--error")
    }

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
                ref={inputRef}
            />
            <span className="form__input-error">{errorMsg}</span>
            {
                visible && <ToolTip ref={tooltipRef} show={!invalid && isInputActive}>
                    <PasswordValidator value={value} active={isInputActive} type={'tooltip'} large={true} />
                </ToolTip>
            }
            {
                !visible ?
                    <ToggleContent show={!invalid && isInputActive}>
                        <PasswordValidator value={value} active={isInputActive} type={'tooltip'} large={false} />
                    </ToggleContent>
                    : null
            }
        </div>
    )
}

export default PasswordInput;
import React, { useState, useRef, useEffect } from 'react';
import PasswordValidator from '../../Validator/Validator';
import ToolTip from '../../Tooltip/Tooltip';
import ToggleContent from '../../ToggleContent/ToggleContent';

import useSetTooltipPosition from '../../../hooks/useSetTooltipPosition';

import styles from './PasswordInput.module.css';

const PasswordInput = ({ id, config, value, invalid, touched, changed, errorMsg}) => {

    const [isInputActive, setIsInputActive] = useState(false);
    const inputRef = useRef();
    const [tooltipRef, visible] = useSetTooltipPosition(inputRef);

    useEffect(() => {
        console.log('[PasswordInput] rendering')
    })

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
                ref={inputRef}
            />
            <span className={styles['Form__input-error']}>{errorMsg}</span>
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
import React, { Component } from 'react';
import PasswordValidator from '../../PasswordValidator/PasswordValidator';

import styles from './Input.module.css';

class Input extends Component {
    state = {
        value: '',
        touched: false,
        valid: false,
        isInputActive: false
    };

    inputValidationCheck = (value) => {
        let isValid = true;

        if (this.props.validators.length) {
            this.props.validators.forEach(validator => {
                isValid = isValid && validator(value);
            });
        }

        if (this.props.refInputValidator) {
            const validator = this.props.refInputValidator(this.props.refInputValue)
            isValid = validator(value);
        }

        if (isValid) {
            this.props.inputUpdate(this.props.id, value);
        }

        if (this.state.valid && (this.state.valid !== isValid)) {
            this.props.inputUpdate(this.props.id, '');
        }

        return isValid;
    }


    inputChangeHandler = (event) => {
        const { value } = event.target;

        this.setState({
            value: value,
            touched: true,
            valid: this.inputValidationCheck(value)
        });
    }

    focusHandler = () => {
        this.setState(prevState => ({
            isInputActive: !prevState.isInputActive
        }));
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.refInputValue !== prevProps.refInputValue) {
            let isValid = this.inputValidationCheck(this.state.value);
            if (this.state.valid !== isValid) {
                this.setState({
                    valid: isValid
                });
            }
        }
    }

    render() {

        const { id, elementType, config, validationErrMsg, customValidation } = this.props;

        let inputElement = null;

        let inputClasses = [styles.Form__input];
        if (!this.state.valid && this.state.touched) {
            inputClasses.push(styles['Form__input--error']);
        }

        switch (elementType) {
            case ('input'):
                inputElement = <input
                    className={inputClasses.join(' ')}
                    type={config.type}
                    id={id}
                    name={id}
                    placeholder={config.placeholder}
                    value={this.state.value}
                    onChange={this.inputChangeHandler}
                    onFocus={this.focusHandler}
                    onBlur={this.focusHandler}
                />;
        }

        return (
            <div className={styles.Form__item}>
                <label htmlFor={id} className={styles.Form__label}>{config.label}: </label>
                {inputElement}
                <span className={styles['Form__input-error']}>{validationErrMsg}</span>
                {customValidation ? <PasswordValidator value={this.state.value} valid={this.state.valid} isInputActive={this.state.isInputActive} /> : null}
            </div>
        );
    }
}

export default Input;
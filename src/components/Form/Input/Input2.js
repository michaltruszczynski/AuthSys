import React, { Component } from 'react';

import styles from './Input.module.css';

class Input2 extends Component {
    state = {
        value: '',
        touched: false,
        valid: false
    }

    inputChangeHandler = (event) => {
        const { value } = event.target;
        let isValid = true;

        if (this.props.validators.length) {
            this.props.validators.forEach(validator => {
                isValid = isValid && validator(value);
            });
        }

        if (this.props.refInputValidator) {
            isValid = this.props.refInputValidator(value)
            console.log('pswd match validator', isValid)
        }

        if (isValid) {
            this.props.inputUpdate(this.props.id, value)
        }

        if (this.state.valid && (this.state.valid !== isValid)) {
            this.props.inputUpdate(this.props.id, '')
        }

        this.setState({
            value: value,
            touched: true,
            valid: isValid
        });

    }

    componentDidUpdate(prevProps) {
        if (!this.props.refInputValidator) return;
        if (prevProps.refInputValidator !== this.props.refInputValidator) {
            let isValid = this.props.refInputValidator(this.state.value);
            this.setState({
                valid: isValid
            });
        }
    }

    render() {

        const { id, elementType, config, validationErrMsg, customValidation } = this.props;

        let inputElement = null;

        let inputClasses = [styles.Form__input];
        if (!this.state.valid && this.state.touched) {
            inputClasses.push(styles['Form__input--error'])
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
                />
        }

        return (
            <div className={styles.Form__item}>
                <label htmlFor={id} className={styles.Form__label}>{config.label}: </label>
                {inputElement}
                <span className={styles['Form__input-error']}>{validationErrMsg}</span>
            </div>
        )
    }

}

export default Input2;
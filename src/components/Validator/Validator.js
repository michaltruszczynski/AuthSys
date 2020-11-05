import React, { Component } from 'react';
import { length, containCapitalLetter, containNumber, containSpecialChar } from '../../utility/validators';

import styles from './Validator.module.css';

class PasswordValidator extends Component {
    state = {
        value: null,
        validators: {
            minCharacters: {
                message: '4 charcters minimum',
                validator: length({ min: 4 })

            },
            requiredCapitalChar: {
                message: 'Contains at least 1 capital letter',
                validator: containCapitalLetter
            },
            requiredNumber: {
                message: 'Contains at least 1 number',
                validator: containNumber
            },
            requiredSpecialChar: {
                message: 'Contains !@#$%^&*',
                validator: containSpecialChar
            }
        },
        valid: false,
        validatorTitle: 'Password rules.'
    }


    render() {
        const { value, active, large } = this.props;
        console.log('[PasswordValidator] rendering')
        let validatorRulesMsg;

        const rules = Object.keys(this.state.validators);

        validatorRulesMsg = rules.map(rule => (
            <li className={`${styles.tooltip__item} ${this.state.validators[rule].validator(value) ? styles['tooltip__item--green'] : styles['tooltip__item--red']} `} key={rule}>
                <i className={`${styles.tooltip__icon} fas fa-exclamation-circle`}></i>
                <span className={styles.validator__message}>{this.state.validators[rule].message}</span>
            </li>
        ))

        const validator = (
            <>
                <h3 className={`${!large ? styles['tooltip__list--small'] : null }`}>Password rules</h3>
                <ul className={`${styles.tooltip__list} ${!large ? styles["tooltip__list--small"] : null}`}>
                    {validatorRulesMsg}
                </ul>
            </>
        )

        return (
            validator
        )
    }
}

export default PasswordValidator;
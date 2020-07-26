import React, { Component } from 'react';
import { length, containCapitalLetter, containNumber, containSpecialChar } from '../../utility/validators';

import styles from './Validator.module.css';

class Validator extends Component {
    state = {
        value: null,
        validators: {
            minCharacters: {
                message: '4 charcters minimum',
                validator: length(4)

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
        let validatorRules;
        const rules = Object.keys(this.state.validators);
        console.log(rules)
        validatorRules = rules.map(rule => (
            <li className={styles.tooltip__item} key={rule}>
            <i className={`${styles.tooltip__icon} fas fa-exclamation-circle`}></i>
                <span>{this.state.validators[rule].message}</span>
            </li>
        ))

        return (
            <div className={styles.tooltip}>
                <h3 >Password rules</h3>
                <ul className={styles.tooltip__list}>
                    {validatorRules}
                </ul>
            </div>
        )
    }
}

export default Validator;
import React, { Component } from 'react';
import { length, containCapitalLetter, containNumber, containSpecialChar } from '../../../utility/validators';
import { validationResult } from 'express-validator';

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
            <li key={rule}>
            {this.state.validators[rule].message}
            </li>
        ))

        return (
            <div>
            <p></p>
                <ul>
                    {validatorRules}
                </ul>
            </div>
        )
    }
}

export default Validator;
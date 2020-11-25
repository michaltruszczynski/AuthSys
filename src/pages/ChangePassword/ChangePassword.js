import React, { Component } from 'react';
import axios from 'axios';

import Input2 from '../../components/Form/Input/Input2';
import Spinner from '../../components/UI/Spinner/Spinner';

import { required, length, containSpecialChar, containCapitalLetter, containNumber, passwordMatch } from '../../utility/validators';

import styles from './ChangePassword.module.css';

const changePswdForm = {
    newPassword: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password',
            label: 'Password'
        },
        validators: [required, containNumber, containSpecialChar, length({ min: 4 }), containCapitalLetter],
        validationErrMsg: 'Please enter a valid password.',
        customValidation: true,
        refInputValue: false
    },
    newPasswordConfirm: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Confirm password',
            label: 'Confirm password'
        },
        validators: [],
        validationErrMsg: 'Passwords don \'t match.',
        customValidation: false,
        refInputValue: 'newPassword',
        refInputValidator: passwordMatch
    }
}

class ChangePassword extends Component {
    state = {
        newPassword: '',
        newPasswordConfirm: '',
        formIsValid: false,
        redirect: false
    }

    inputUpdate = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        console.log(this.props.match.params);
        const {userId, token} = this.props.match.params;
        axios.get(`http://localhost:5000/api/admin/changepswdusercheck/${userId}/${token}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const formElementKeys = Object.keys(changePswdForm);
        const formElementArray = formElementKeys.map(key => ({
            id: key,
            config: changePswdForm[key]
        }));

        let formElements = formElementArray.map(formElement => (
            <Input2
                key={formElement.id}
                id={formElement.id}
                elementType={formElement.config.elementType}
                config={formElement.config.elementConfig}
                validators={formElement.config.validators}
                validationErrMsg={formElement.config.validationErrMsg}
                customValidation={formElement.config.customValidation}
                inputUpdate={this.inputUpdate}
                refInputValue={formElement.config.refInputValue ? this.state[formElement.config.refInputValue] : null}
                refInputValidator={formElement.config.refInputValue ? formElement.config.refInputValidator : null}
            />
        ));

        let form = (
            <div className={styles.Form__container}>
                <form className={styles.Form} onSubmit={this.submitHandler}>
                    <div className={styles.Form__title}>
                        Reset Password
                        </div>
                    <p className={styles.Form__description}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quos ipsam quae, delectus
                        impedit odit?
                        </p>
                    {formElements}
                    <div className={styles.Form__item}>
                        <button disabled={!this.state.formIsValid} className={styles.Form__btn} type="submit">Reset Password</button>
                    </div>
                </form>
            </div>
        )


        return (
           form
        )
    }

}

export default ChangePassword;

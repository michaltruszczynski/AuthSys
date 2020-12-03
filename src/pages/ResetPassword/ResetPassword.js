import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Input2 from '../../components/Form/Input/Input2';
import Spinner from '../../components/UI/Spinner/Spinner';

import { required, email } from '../../utility/validators';


import styles from './ResetPassword.module.css';


const resetPasswordForm = {
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Email address',
            label: 'E-mail'
        },
        validators: [required, email],
        validationErrMsg: 'Please enter a valid email.',
        customValidation: false,
        refInputValue: false
    }
}

class ResetPassword extends Component {
    state = {
        email: '',
        formIsValid: false,
        isLoading: false,
        redirect: false,
        error: false
    }

    inputUpdate = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    isFormValid = () => {
        if (this.state.email) {
            this.setState({
                formIsValid: true
            });
        } else {
            this.setState({
                formIsValid: false
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('[ResetPassword] componentDidUpdate')
        if ((this.state.email !== prevState.email)) {
            this.isFormValid();
        }
    }

    render() {

        console.log('[ResetPassword] rendering')
        const formElementKeys = Object.keys(resetPasswordForm);
        const formElementArray = formElementKeys.map(key => ({
            id: key,
            config: resetPasswordForm[key]
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
                refInputValidator={false}
            />
        ));

        let form = (
            <div className={styles.Form__container}>
                <form className={styles.Form} onSubmit={this.submitHandler}>
                    <div className={styles.Form__title}>
                        Sign In
                        </div>
                    <p className={styles.Form__description}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quos ipsam quae, delectus
                        impedit odit?
                        </p>
                    {formElements}
                    <div className={styles.Form__item}>
                        <button disabled={!this.state.formIsValid} className={styles.Form__btn} type="submit">Sign In</button>
                    </div>
                    <div className={styles.Form__item}>
                        <p>Forgot password? <a href="3">Change password</a></p>
                    </div>
                </form>
            </div>
        )

        return (
            this.props.loading ? <Spinner /> : form
        )
    }

}

export default ResetPassword
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/Form/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import { required, email } from '../../utility/validators';
import { NewErrorMessage, Message } from '../../utility/utility';

import * as actions from '../../store/actions/index';
import { MESSAGE_TYPES } from '../../store/actions/messageTypes';

import { resetPasswordService } from '../../services/resetPasswordService'

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
        redirect: false
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

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({
            isLoading: true
        })
        resetPasswordService.resetPasswordRequest(this.state.email)
            .then(() => {
                this.setState({
                    email: '',
                    formIsValid: false,
                    isLoading: false,
                    redirect: '/'
                });
                const messageSuccess = new Message('Link to reset password form has been requested.');
                messageSuccess.addMessageDetails('Please check your email and follow instructions received.');
                const { message, messageDetailsArray } = messageSuccess.getMessageData();
                this.props.onSetMessage(message, messageDetailsArray, MESSAGE_TYPES.success);
            })
            .catch(error => {
                this.setState({
                    email: '',
                    formIsValid: false,
                    isLoading: false
                });
                const errorMsg = new NewErrorMessage(error);
                const { errorMessage, errorDetailsArray } = errorMsg.getErrorMessageData();
                this.props.onSetMessage(errorMessage, errorDetailsArray, MESSAGE_TYPES.error);
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.state.email !== prevState.email)) {
            this.isFormValid();
        }
    }

    render() {
        const formElementKeys = Object.keys(resetPasswordForm);
        const formElementArray = formElementKeys.map(key => ({
            id: key,
            config: resetPasswordForm[key]
        }));

        let formElements = formElementArray.map(formElement => (
            <Input
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
                        Reset password
                        </div>
                    <p className={styles.Form__description}>
                        Please enter email address used for logging in. You will receive link to access change password form.
                        </p>
                    {formElements}
                    <div className={styles.Form__item}>
                        <button disabled={!this.state.formIsValid} className={styles.Form__btn} type="submit">Send</button>
                    </div>
                    <div className={styles.Form__item}>
                        <p>Return to <Link to="/siginin">Sign in</Link></p>
                    </div>
                </form>
            </div>
        )

        if (this.state.redirect) {
            form = <Redirect to={this.state.redirect} />
        }

        return (
            this.state.isLoading ? <Spinner /> : form
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onSetMessage: (message, messageDetails, type) => dispatch(actions.setMessage(message, messageDetails, type))
    }
}

export default connect(null, mapDispatchToProps)(ResetPassword);
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/Form/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions';

import { required, length, containSpecialChar, containCapitalLetter, containNumber, passwordMatch } from '../../utility/validators';
import { NewErrorMessage, Message } from '../../utility/utility';

import { MESSAGE_TYPES } from '../../store/actions/messageTypes';

import { resetPasswordService } from '../../services/resetPasswordService';

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
        validationErrMsg: 'Password don\'t match.',
        customValidation: false,
        refInputValue: 'newPassword',
        refInputValidator: passwordMatch
    }
}

class ChangePassword extends Component {
    state = {
        newPassword: '',
        newPasswordConfirm: '',
        userId: null,
        token: null,
        formIsValid: false,
        redirect: false,
        isLoding: false
    }

    inputUpdate = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    isFormValid = () => {
        if (this.state.newPassword && this.state.newPasswordConfirm) {
            this.setState({
                formIsValid: true
            });
        } else {
            this.setState({
                formIsValid: false
            });
        }
    }

    componentDidMount() {
        const { userId, token } = this.props.match.params;

        this.setState({
            userId: userId,
            token: token,
            isLoding: true
        });

        resetPasswordService.changePasswordUserCheck(userId, token)
            .then(() => {
                this.setState({
                    isLoding: false
                });
            })
            .catch(error => {
                this.setState({
                    isLoding: false,
                    redirect: '/resetpassword'
                });
                const errorMsg = new NewErrorMessage(error);
                const { errorMessage, errorDetailsArray } = errorMsg.getErrorMessageData();
                this.props.onSetMessage(errorMessage, errorDetailsArray, MESSAGE_TYPES.error);
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.state.newPasswordConfirm !== prevState.newPasswordConfirm) || (this.state.newPassword !== prevState.newPassword)) {
            this.isFormValid();
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        const passwordData = {
            userId: this.state.userId,
            newPassword: this.state.newPassword
        };

        this.setState({
            isLoding: true
        })

        resetPasswordService.changePasswordRequest(this.state.userId, this.state.token, passwordData)
            .then(() => {
                this.setState({
                    newPassword: '',
                    newPasswordConfirm: '',
                    userId: null,
                    token: null,
                    formIsValid: false,
                    redirect: '/siginin',
                    isLoding: false
                });

                const messageSuccess = new Message('Password has been changed.');
                messageSuccess.addMessageDetails('Please login using new credentials.');
                const { message, messageDetailsArray } = messageSuccess.getMessageData();
                this.props.onSetMessage(message, messageDetailsArray, MESSAGE_TYPES.success);
            })
            .catch(error => {
                this.setState({
                    newPassword: '',
                    newPasswordConfirm: '',
                    userId: null,
                    token: null,
                    formIsValid: false,
                    redirect: '/resetpassword',
                    isLoding: false
                });
                const errorMsg = new NewErrorMessage(error);
                const { errorMessage, errorDetailsArray } = errorMsg.getErrorMessageData();
                this.props.onSetMessage(errorMessage, errorDetailsArray, MESSAGE_TYPES.error);
            });
    }

    render() {
        const formElementKeys = Object.keys(changePswdForm);
        const formElementArray = formElementKeys.map(key => ({
            id: key,
            config: changePswdForm[key]
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
                refInputValue={formElement.config.refInputValue ? this.state[formElement.config.refInputValue] : null}
                refInputValidator={formElement.config.refInputValue ? formElement.config.refInputValidator : null}
            />
        ));

        let form = (
            <div className={styles.Form__container}>
                <form className={styles.Form} onSubmit={this.submitHandler}>
                    <div className={styles.Form__title}>
                        Change Password
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

        if (this.state.redirect) {
            form = <Redirect to={this.state.redirect} />
        }

        return (
            this.state.isLoding ? <Spinner /> : form
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onSetMessage: (message, messageDetails, type) => dispatch(actions.setMessage(message, messageDetails, type))
    }
}

export default connect(null, mapDispatchToProps)(ChangePassword);

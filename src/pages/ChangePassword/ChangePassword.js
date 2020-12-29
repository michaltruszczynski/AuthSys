import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Input2 from '../../components/Form/Input/Input2';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions';

import { required, length, containSpecialChar, containCapitalLetter, containNumber, passwordMatch } from '../../utility/validators';
import { ErrorMessage } from '../../utility/utility';

import { MESSAGE_TYPES } from '../../store/actions/messageTypes';

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
            })
        } else {
            this.setState({
                formIsValid: false
            })
        }
    }

    componentDidMount() {
        console.log(this.props.match.params);
        const { userId, token } = this.props.match.params;

        this.setState({
            userId: userId,
            token: token,
            // isLoding: true
        });

        //     axios.get(`http://localhost:5000/api/admin/reset-password/usercheck/${userId}/${token}`)
        //         .then(response => {
        //             console.log(response.data);
        //             this.setState({
        //                 isLoding: false,
        //                 redirect: '/signin'
        //             });
        //         })
        //         .catch(error => {
        //             this.setState({
        //                 isLoding: false,
        //                 redirect: '/resetpassword'
        //             });
        //             const errorMsg = new ErrorMessage(error.response);
        //             const { errorMessage, errorDataArr } = errorMsg.getErrorMessageData();
        //             this.props.onSetMessage(errorMessage, errorDataArr, MESSAGE_TYPES.error);
        //         })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('[Change Password] componentDidUpdate');
        if ((this.state.newPasswordConfirm !== prevState.newPasswordConfirm) || (this.state.newPassword !== prevState.newPassword)) {
            this.isFormValid();
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log('[ChangePassword] Dubmit clicked');
        const passwordData = {
            userId: this.state.userId,
            newPassword: this.state.newPassword
        };

        this.setState({
            userId: null,
            isLoding: true
        })

        axios.post(`http://localhost:5000/api/admin/reset-password/newpasswod/${this.state.userId}/${this.state.token}`, passwordData)
            .then(response => {
                console.log(response)
                this.setState({
                    newPassword: '',
                    newPasswordConfirm: '',
                    userId: null,
                    token: null,
                    formIsValid: false,
                    redirect: '/siginin',
                    isLoding: false
                });
            })
            .catch(error => {
                console.log('error response', error.response)
                console.log('error request', error.request)
                this.setState({
                    newPassword: '',
                    newPasswordConfirm: '',
                    userId: null,
                    token: null,
                    formIsValid: false,
                    redirect: '/resetpassword',
                    isLoding: false
                });
                // const errorMsg = new ErrorMessage(error.response);
                // const { errorMessage, errorDataArr } = errorMsg.getErrorMessageData();
                // this.props.onSetMessage(errorMessage, errorDataArr, MESSAGE_TYPES.error);
            });

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

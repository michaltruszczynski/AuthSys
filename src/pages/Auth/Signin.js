import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/Form/Input/Input';
import PasswordInput from '../../components/Form/PasswordInput/PasswordInput';
import Spinner from '../../components/UI/Spinner/Spinner';

import './Signin.module.css';

import { required, email } from '../../utility/validators';
import { updateObject } from '../../utility/utility';

import * as actions from '../../store/actions/index';

class Signin extends Component {
    state = {
        signinForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email address',
                    label: 'E-mail'
                },
                value: '',
                valid: false,
                touched: false,
                validators: [required, email],
                validationErrMsg: 'Please enter a valid email.'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    label: 'Password'
                },
                value: '',
                valid: false,
                touched: false,
                validators: [required],
                validationErrMsg: 'Please enter a valid password.'
            }
        },
        formIsValid: false
    };

    inputChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => {
            let isValid = true;
            for (const validator of prevState.signinForm[name].validators) {
                isValid = isValid && validator(value)
            }

            const updatedSigninForm = updateObject(prevState.signinForm, {
                [name]: updateObject(prevState.signinForm[name], {
                    value: value,
                    valid: isValid,
                    touched: true
                })
            });

            let formIsValid = true;
            for (const inputName of Object.keys(updatedSigninForm)) {
                formIsValid = formIsValid && updatedSigninForm[inputName].valid;
            }

            return {
                signinForm: updatedSigninForm,
                formIsValid: formIsValid
            }
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log('[Signin] Submit');
        const authData = {
            email: this.state.signinForm.email.value,
            password: this.state.signinForm.password.value
        }
        this.props.onAuthSignin(authData);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Signin] shouldComponentUpdate', nextState, nextProps);
        return true;
    }

    componentDidUpdate() {
        console.log('[Signin] componentDidUpdate ');
    }

    componentDidMount() {
        console.log('[Signin] componentDidMount ');
        if (this.props.authRedirectPath) {
            this.props.onSetAuthRedirectPath(null);
        }
    }

    componentWillUnmount() {
        this.props.onSetAuthRedirectPath(null);
    }

    render() {
        console.log('rendering')
        const formElementKeys = Object.keys(this.state.signinForm);
        const formElementArray = formElementKeys.map(key => ({
            id: key,
            config: this.state.signinForm[key]
        }));
        console.log(formElementArray);
        let form = formElementArray.map(formElement => {
            if (formElement.config.customValidation) {
                return (
                    <PasswordInput
                        key={formElement.id}
                        id={formElement.id}
                        elementType={formElement.config.elementType}
                        config={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={formElement.config.valid}
                        shouldValidate={formElement.config.validators}
                        touched={formElement.config.touched}
                        errorMsg={formElement.config.validationErrMsg}
                        changed={this.inputChangeHandler}
                        validator={formElement.config.customValidationMessage}
                        isFocused
                    />
                )
            } else {
                return (
                    <Input
                        key={formElement.id}
                        id={formElement.id}
                        elementType={formElement.config.elementType}
                        config={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={formElement.config.valid}
                        shouldValidate={formElement.config.validators}
                        touched={formElement.config.touched}
                        errorMsg={formElement.config.validationErrMsg}
                        changed={this.inputChangeHandler}
                    />
                )
            }
        });

        if (this.props.loading) {
            form = <Spinner />
        }


        let message = 'You have been registered. Please sign in.';
        let messageClass = ["form__message", "form__message-hidden"];

        if (this.props.authSignupSuccess) {
            messageClass = ["form__message", "form__message-success"];
        }

        let errMessage = 'Login failed. PLease provide correct credentials.';
        let errMessageClass = ["form__message", "form__message-hidden"];

        if (this.props.authSignupSuccess) {
            errMessage = ["form__message", "form__message-error"];
        }

        let redirect = null;
        if (this.props.authRedirectPath) {
            redirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <>
                <div className="form__container">
                    {redirect}
                    <form className="form" onSubmit={this.submitHandler}>
                        <div className="form__title">
                            Sign In
                        </div>
                        <p className={messageClass.join(' ')}>{message}</p>
                        <p className="form__description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quos ipsam quae, delectus
                            impedit odit?
                        </p>
                        <p className={errMessageClass.join(' ')}>{errMessage}</p>
                        {form}
                        <div className="form__item ">
                            <button className="form__btn" type="submit">Sign In</button>
                        </div>
                        <div className="form__info-message">
                            <p>Forgot password? <a href="3">Change password</a></p>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        authRedirectPath: state.authRedirectPath,
        authSignupSuccess: state.authSignupSuccess

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthSignin: (userAuthData) => dispatch(actions.authSignin(userAuthData)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
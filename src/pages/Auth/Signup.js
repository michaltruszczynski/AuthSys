import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Input from '../../components/Form/Input/Input';
import PasswordInput from '../../components/Form/PasswordInput/PasswordInput';
import Spinner from '../../components/UI/Spinner/Spinner';

import './Signup.css';

import { updateObject } from '../../utility/utility';
import { required, length, containNumber, containSpecialChar, email } from '../../utility/validators';

import * as actions from '../../store/actions/index';

class Signup extends Component {

    state = {
        signupForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                    label: 'Name'
                },
                value: '',
                valid: false,
                touched: false,
                validators: [required, length({ min: 4 }), length({ max: 5 })],
                validationErrMsg: 'Please enter name.'
            },
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
                validators: [required, containSpecialChar, containNumber, length({ min: 4 })],
                validationErrMsg: 'Please enter a valid password.',
                customValidation: true
            },
            passwordConfirm: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm password',
                    label: 'Confirm password'
                },
                value: '',
                valid: false,
                touched: false,
                validators: [],
                validationErrMsg: 'Passwords don \'t match.'
            }
        },
        formIsValid: false
    }

    passwordMatchValidator = (name, value, prevState) => {
        if (name !== 'password' && name !== 'passwordConfirm') {
            return prevState.signupForm.passwordConfirm.value;
        }

        let isConfirmPaswordValid = false;

        if (name === 'password') {
            if (value === prevState.signupForm.passwordConfirm.value) {
                isConfirmPaswordValid = true;
            }
        }

        if (name === 'passwordConfirm') {
            if (value === prevState.signupForm.password.value) {
                isConfirmPaswordValid = true;
            }
        }
        return isConfirmPaswordValid;
    }

    inputChangeHandler = (event) => {
        console.log('inputChangeHandler')
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => {
            let isValid = true;
            for (const validator of prevState.signupForm[name].validators) {
                isValid = isValid && validator(value)
            }

            const updatedSignupForm = updateObject(prevState.signupForm, {
                [name]: updateObject(prevState.signupForm[name], {
                    value: value,
                    valid: isValid,
                    touched: true
                })
            });

            updatedSignupForm.passwordConfirm.valid = this.passwordMatchValidator(name, value, prevState)

            let formIsValid = true;
            for (const inputName of Object.keys(updatedSignupForm)) {
                formIsValid = formIsValid && updatedSignupForm[inputName].valid;
            }

            return {
                signupForm: updatedSignupForm,
                formIsValid: formIsValid
            }
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log('Submit');
        const authData = {
            name: this.state.signupForm.name.value,
            email: this.state.signupForm.email.value,
            password: this.state.signupForm.password.value
        }
        this.props.onAuthSignup(authData)
            // .then(() => {
            //     this.props.history.push('/signin')
            // })
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Signup] shouldComponentUpdate', nextState, nextProps)
        return true;
    }

    componentDidUpdate() {
        console.log('[Signup] componentDidUpdate ')
    }

    componentDidMount() {
        console.log('[Signup] componentDidMount ')
    }

    render() {
        console.log('rendering')
        const formElementKeys = Object.keys(this.state.signupForm);
        const formElementArray = formElementKeys.map(key => ({
            id: key,
            config: this.state.signupForm[key]
        }))
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
                        validator={formElement.config.customValidation}
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

        let errorMsgClasses = ["form__message", "form__message-error", "form__message-hidden"]
        let errorMsg = 'Please provide correct data.';
        if (this.props.error) {
            errorMsgClasses = ["form__message", "form__message-error"];
            console.log(this.props.error)
            const errorMsgDetails = this.props.error.data;
            console.log(errorMsgDetails)
            const emailErrDetails = errorMsgDetails.filter(item => item.param === 'email');

            if (emailErrDetails.length) {
                errorMsg = 'Email already exists. Please choose different one.'
            }
        }


        let redirectToSignin = null;
        if (this.props.authRedirectPath) {
            redirectToSignin = <Redirect to={this.props.authRedirectPath} />
        }

        // console.log('formisValid', this.state.formIsValid)
        return (
            <>
                <div className="form__container">
                    {redirectToSignin}
                    <form onSubmit={this.submitHandler}>
                        <div className="form__title">
                            Sign Up
                        </div>
                        <p className={errorMsgClasses.join(' ')}>{errorMsg}</p>
                        <p className="form__description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quos ipsam quae, delectus
                            impedit odit?
                    </p>
                        {form}
                        <div className="form__item ">
                            <button disabled={!this.state.formIsValid} className="form__btn" type="submit">Sign Up</button>
                        </div>
                        <div className="form__info-message">
                            <p>Already have an account? <a href="3">Log in</a></p>
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
        authRedirectPath: state.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthSignup: (userData) => dispatch(actions.authSignup(userData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
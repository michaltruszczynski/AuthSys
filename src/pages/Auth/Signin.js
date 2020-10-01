import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/Form/Input/Input';
import PasswordInput from '../../components/Form/PasswordInput/PasswordInput';

import './Signin.module.css';

import { required, email } from '../../utility/validators';
import { updateObject } from '../../utility/utility';

import * as actions from '../../store/actions/index';
import { authFail } from '../../store/actions/auth';

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
        this.props.onAuthSignin(authData)

        // podłączyć Redux.
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Signin] shouldComponentUpdate', nextState, nextProps)
        return true;
    }

    componentDidUpdate() {
        console.log('[Signin] componentDidUpdate ')
    }

    componentDidMount() {
        console.log('[Signin] componentDidMount ')
    }

    render() {
        console.log('rendering')
        const formElementKeys = Object.keys(this.state.signinForm);
        const formElementArray = formElementKeys.map(key => ({
            id: key,
            config: this.state.signinForm[key]
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
        })

        let authRedirect = null;

        if(this.props.authRedirect) {

        }
        
        return (
            <>
                <div className="form__container">
                    <form className="form" onSubmit={this.submitHandler}>
                        <div className="form__title">
                            Sign In
                        </div>
                        <p className="form__description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quos ipsam quae, delectus
                            impedit odit?
                        </p>
                        <p className="form__error">{'Login failed. PLease provide correct credentials.'}</p>
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
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthSignin: (userAuthData) => dispatch(actions.authSignin(userAuthData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
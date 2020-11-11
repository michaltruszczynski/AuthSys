import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Signup2.module.css';

import Input2 from '../../components/Form/Input/Input2';
import Spinner from '../../components/UI/Spinner/Spinner';

import { required, length, containSpecialChar, containCapitalLetter, containNumber, email, passwordMatch } from '../../utility/validators';

import * as actions from '../../store/actions/index';

const signupForm = {
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Name',
            label: 'Name'
        },
        validators: [required, length({ min: 4 }), length({ max: 8 })],
        validationErrMsg: 'Please enter name.',
        customValidation: false,
        refInputValue: false
    },
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
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password',
            label: 'Password'
        },
        validators: [required, containNumber, length({ min: 4 }), containCapitalLetter],
        validationErrMsg: 'Please enter a valid password.',
        customValidation: true,
        refInputValue: false
    },
    passwordConfirm: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Confirm password',
            label: 'Confirm password'
        },
        validators: [],
        validationErrMsg: 'Passwords don \'t match.',
        customValidation: false,
        refInputValue: 'password',
        refInputValidator: passwordMatch
    }
}

class Signup2 extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        formIsValid: false
    }

    inputUpdate = (name, value) => {
        console.log('sfhsjfh')
        this.setState({
            [name]: value
        });
    }

    isFormValid = () => {
        if (this.state.name && this.state.email && this.state.password && this.state.passwordConfirm) {
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
        if ((this.state.name !== prevState.name) || (this.state.email !== prevState.email) || (this.state.password !== prevState.password) || (this.state.passwordConfirm !== prevState.passwordConfirm)) {
            this.isFormValid();
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log('[Signup2] Submit clicked')
        const authData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        this.props.onAuthSignup(authData);
    }

    render() {
        console.log('[Signup2] rendering');
        const formElementKeys = Object.keys(signupForm);
        const formElementArray = formElementKeys.map(key => ({
            id: key,
            config: signupForm[key]
        }));

        // console.log(formElementArray);

        let form = formElementArray.map(formElement => (
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


        return (
            this.props.loading ? (
                <Spinner />
            ) : (
                    <>
                        <div className={styles.Form__container}>
                            <form className={styles.Form} onSubmit={this.submitHandler}>
                                <div className={styles.Form__title}>
                                    Sign Up
                        </div>
                                <p className={styles.Form__description}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quos ipsam quae, delectus
                                    impedit odit?
                        </p>
                                {form}
                                <div className={styles.Form__item}>
                                    <button disabled={!this.state.formIsValid} className={styles.Form__btn} type="submit">Sign Up</button>
                                </div>
                                <div>
                                    <p>Already have an account? <a href="3">Log in</a></p>
                                </div>
                            </form>
                        </div>
                    </>
                )
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthSignup: (userData) => dispatch(actions.authSignup(userData)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup2);
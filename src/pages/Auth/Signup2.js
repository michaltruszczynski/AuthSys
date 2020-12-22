import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import Input2 from '../../components/Form/Input/Input2';
import Spinner from '../../components/UI/Spinner/Spinner';

import { required, length, containSpecialChar, containCapitalLetter, containNumber, email, passwordMatch } from '../../utility/validators';

import * as actions from '../../store/actions/index';
import styles from './Signup2.module.css';

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
        validators: [required, containNumber, length({ min: 4 })],
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

    submitHandler = (event) => {
        event.preventDefault();
        console.log('[Signup2] Submit clicked')
        const authData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        this.setState({
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            formIsValid: false
        });

        this.props.onAuthSignup(authData);
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.state.name !== prevState.name) || (this.state.email !== prevState.email) || (this.state.password !== prevState.password) || (this.state.passwordConfirm !== prevState.passwordConfirm)) {
            this.isFormValid();
        }
    }

    componentWillUnmount() {
        this.props.onAuthStatusReset();
    }

    render() {
        console.log('[Signup2] rendering');
        const formElementKeys = Object.keys(signupForm);
        const formElementArray = formElementKeys.map(key => ({
            id: key,
            config: signupForm[key]
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
                        Sign Up
                        </div>
                    <p className={styles.Form__description}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quos ipsam quae, delectus
                        impedit odit?
                        </p>
                    {formElements}
                    <div className={styles.Form__item}>
                        <button disabled={!this.state.formIsValid} className={styles.Form__btn} type="submit">Sign Up</button>
                    </div>
                    <div>
                        <p>Already have an account? <Link to="/signin">Sign in</Link></p>
                    </div>
                </form>
            </div>
        )

        if (this.props.signupSuccess) {
            form = <Redirect to={"/signin"} />
        }

        return (
            this.props.loading ? <Spinner /> : form
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        signupSuccess: state.auth.authSignupSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthSignup: (userData) => dispatch(actions.authSignup(userData)),
        onAuthStatusReset: () => dispatch(actions.authStatusReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup2);
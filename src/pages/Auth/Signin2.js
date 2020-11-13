import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input2 from '../../components/Form/Input/Input2';
import Spinner from '../../components/UI/Spinner/Spinner';

import { required, email } from '../../utility/validators';

import * as actions from '../../store/actions/index';
import styles from './Signin2.module.css';

const signinForm = {
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
        validators: [required],
        validationErrMsg: 'Please enter a valid password.',
        customValidation: false,
        refInputValue: false
    }
}

class Signin2 extends Component {
    state = {
        email: '',
        password: '',
        formIsValid: false
    }

    inputUpdate = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log('[Signin2] Submit clicked')
        const authData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.onAuthSignin(authData);
    }

    isFormValid = () => {
        if (this.state.email && this.state.password) {
            this.setState({
                formIsValid: true
            });
        } else {
            this.setState({
                formIsValid: false
            });
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if ((this.state.email !== prevState.email) || (this.state.password !== prevState.password)) {
    //         this.isFormValid();
    //     }
    // }


    render() {
        console.log('[Signin2] rendering')
        const formElementKeys = Object.keys(signinForm);
        const formElementArray = formElementKeys.map(key => ({
            id: key,
            config: signinForm[key]
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
                        <button disabled={false} className={styles.Form__btn} type="submit">Sign In</button>
                    </div>
                    <div className={styles.Form__item}>
                        <p>Forgot password? <a href="3">Change password</a></p>
                    </div>
                </form>
            </div>
        )

        if (this.props.token) {
            form = <Redirect to={"/"} />
        }

        return (
            this.props.loading ? <Spinner /> : form
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthSignin: (userAuthData) => dispatch(actions.authSignin(userAuthData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin2);
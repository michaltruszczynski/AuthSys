import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Signin2.module.css';
import Input2 from '../../components/Form/Input/Input2';

// import { updateObject } from '../../utility/utility';
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
        validators: [required, length({ min: 4 }), length({ max: 5 })],
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
        validators: [required, containSpecialChar, containNumber, length({ min: 4 }), containCapitalLetter],
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

    inputUpdate = (name,value) => {
        this.setState({
            [name]: value
        });
    }

    render() {
        console.log('rendering');
        const formElementKeys = Object.keys(signupForm);
        const formElementArray = formElementKeys.map(key => ({
            id: key,
            config: signupForm[key]
        }));

        console.log(formElementArray);
        console.log('rendering', )

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
                // refInputValue={formElement.refInputValue ? this.state[formElement.refInputValue] : null}
                refInputValidator={formElement.config.refInputValue ? formElement.config.refInputValidator(this.state[formElement.config.refInputValue]) : null}
            />
        ));

        //add err message if form send but invalid and does not pass backend validation <p className={errorMsgClasses.join(' ')}>{errorMsg}</p>
        let errorMsgClasses = [styles["Form__message"], styles["Form__message-error"], styles["Form__message-hidden"]];
        let errorMsg = 'Please provide correct data.';
        if (this.props.error) {
            errorMsgClasses = [styles["Form__message"], styles["Form__message-error"]];
            console.log(this.props.error);
            const errorMsgDetails = this.props.error.data;
            console.log(errorMsgDetails)
            const emailErrDetails = errorMsgDetails.filter(item => item.param === 'email');

            if (emailErrDetails.length) {
                errorMsg = 'Email already exists. Please choose different one.'
            }
        }
        return (
            <>
                <div className={styles.Form__container}>
                    <form onSubmit={this.submitHandler}>
                        <div className={styles.form__title}>
                            Sign Up
                        </div>
                        <p className={errorMsgClasses.join(' ')}>Backend validation error</p>
                        <p className={styles.Form__description}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quos ipsam quae, delectus
                            impedit odit?
                    </p>
                        {form}
                        <div className={styles.Form__item}>
                            <button disabled={!this.state.formIsValid} className={styles.Form__btn} type="submit">Sign Up</button>
                        </div>
                        <div className={styles["Form__info-message"]}>
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
        onAuthSignup: (userData) => dispatch(actions.authSignup(userData)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup2);
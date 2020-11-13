import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input2 from '../../components/Form/Input/Input2';
import Spinner from '../../components/UI/Spinner/Spinner';

import { required, length, containSpecialChar, containCapitalLetter, containNumber, email, passwordMatch } from '../../utility/validators';

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

    render() {
        console.log('[Signin2] rendering')
        const formElementKeys = Object.keys(signinForm);
        const formElementArray = formElementKeys.map(key => ({
            id: key,
            config: signinForm[key]
        }));

        console.log(formElementArray);

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
                refInputValidator={false}
            />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }


        let redirect = null;
        // if (this.props.authRedirectPath) {
        //     redirect = <Redirect to={this.props.authRedirectPath} />
        // }

        return (
            <>
                <div className={styles.Form__container}>
                    {redirect}
                    <form className={styles.Form} onSubmit={this.submitHandler}>
                        <div className={styles.Form__title}>
                            Sign In
                        </div>
                        <p className={styles.Form__description}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quos ipsam quae, delectus
                            impedit odit?
                        </p>
                        {form}
                        <div className={styles.Form__item}>
                            <button className={styles.Form__btn} type="submit">Sign In</button>
                        </div>
                        <div className={styles.Form__item}>
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
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthSignin: (userAuthData) => dispatch(actions.authSignin(userAuthData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin2);
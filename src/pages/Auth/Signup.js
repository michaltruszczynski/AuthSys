import React, { Component } from 'react';
import Input from '../../components/Form/Input/Input';
import './Signup.css';

import { updateObject } from '../../utility/utility';
import { required, length, containNumber, containSpecialChar, email, passwordMatch} from '../../utility/validators';

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
                validationErrMsg: 'Please enter valid email.'
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
                validators: [required, containSpecialChar, containNumber, length({min: 4})],
                validationErrMsg: 'Please enter valid password.'
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
                validationErrMsg: 'Please enter correct email.'
            }
        },
        formisValid: false
    }


    passwordMatchValidator = (password, confirmPassword) => {
        return password === confirmPassword;
    }
    inputChangeHandler = (event) => {
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

    submitHandler = () => {
        console.log('Submit');

        // podłączyć Redux.
    }

    render() {
        console.log('rendering')
        const formElementKeys = Object.keys(this.state.signupForm);
        const formElementArray = formElementKeys.map(key => ({
            id: key,
            config: this.state.signupForm[key]
        }))
        console.log(formElementArray);
        let form = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                id={formElement.id}
                elementType={formElement.config.elementType}
                config={formElement.config.elementConfig}
                value={formElement.value}
                invalid={formElement.config.valid}
                shouldValidate={formElement.config.validators}
                touched={formElement.config.touched}
                changed={this.inputChangeHandler}
            />
        ))
        return (
            <div className="form__container">
                <form onSubmit={this.submitHandler}>
                    <div className="form__title">
                        Sign Up
                    </div>
                    <p className="form__description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quos ipsam quae, delectus
                        impedit odit?
                    </p>
                    {form}
                    <div className="form__item ">
                        <button className="form__btn" type="submit">Sign Up</button>
                    </div>
                    <div className="form__info-message">
                        <p>Already have an account? <a href="3">Log in</a></p>
                    </div>
                </form>
            </div>

        )
    }
}

export default Signup;
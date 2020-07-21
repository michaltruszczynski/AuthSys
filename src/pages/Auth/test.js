import { required, length, containNumber, containSpecialChar, email, passwordMatch } from '../../utility/validators';

const t = {
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
        validationErrMsg: 'Please enter a valid password.'
    }
}

let val = [{
    message: '4 charcters minimum',
    passCheck: false,
    checkFn: required
},
{
    message: 'Contains at least 1 capital letter',
    validator: containCapitalLetter,
    passCheck: false
},
{
    message: 'Contains at least 1 number',
    validator: containNumber,
    passCheck: false
},
{
    message: 'Contains !@#$%^&*',
    validator: containSpecialChar,
    passCheck: false
}]
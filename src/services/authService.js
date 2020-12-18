import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

const signin = (email, password) => {
    const authData = {
        email,
        password
    };

    return axios.post(API_URL + 'auth/signin', authData)
        .then(response => {
            if (response.data.expiresIn && response.data.token && response.data.userId) {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn)
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('expirationDate', JSON.stringify(expirationDate));
                localStorage.setItem('userId', JSON.stringify(response.data.userId));
            }
            return response.data;
        });
}

const signup = (name, email, password) => {
    const authData = {
        name,
        email,
        password
    };
    return axios.post(API_URL + 'auth/signup', authData)
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
}

const authCheck = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
        logout();
        // return new Promise(() => {
        //     throw new Error('Token validation failed. Invalid token.');
        // });
        return Promise.reject(new Error('Token validation failed. Invalid token.'))
    }

    const expirationDate = new Date(JSON.parse(localStorage.getItem('expirationDate')));
    if (expirationDate <= new Date()) {
        logout();
        return Promise.reject(new Error('Token validation failed. Invalid token.'))
    }

    const authHeader = { 'x-access-token': token };
    return axios.get(API_URL + 'auth/authUserCheck', { headers: authHeader })

}

export const userService = {
    authCheck,
    signin,
    signup,
    logout
}
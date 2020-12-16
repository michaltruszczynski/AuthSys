import axios from 'axois';

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

const signup = (username, email, password) => {
    const authData = {
        username,
        email,
        password
    };
    return axios.post(API_URL + 'auth/signup', authData)
        .ther(response => {
            return response.data
        })
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
}

const authcheck = () => {
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
    

}

export default {
    signin,
    signup,
    logout
}
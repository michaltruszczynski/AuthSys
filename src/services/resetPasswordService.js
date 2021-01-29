import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

const resetPasswordRequest = (email) => {
    return axios.get(API_URL + `admin/reset-password/${email}`);
}

const changePasswordUserCheck = (userId, token) => {
    return axios.get(API_URL + `admin/reset-password/usercheck/${userId}/${token}`)
}

const changePasswordRequest = (userId, token, passwordData) => {
    return axios.post(API_URL + `admin/reset-password/newpassword/${userId}/${token}`, passwordData)
}

export const resetPasswordService = {
    resetPasswordRequest,
    changePasswordUserCheck,
    changePasswordRequest
}
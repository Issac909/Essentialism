import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    return axios.create({
        baseURL: 'https://essentialism4-backend.herokuapp.com/',
        headers: {
            Authorization: token
        }
    })
}
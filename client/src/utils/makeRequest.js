import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const setAuthToken = (token) => {
    if (token) {
        request.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
        delete request.defaults.headers.common['Authorization'];
    }
};

export const _get = async (path, object = {}) => {
    const response = await request.get(path, object);
    return response;
};

export const _post = async (path, object = {}) => {
    const response = await request.post(path, object);
    return response;
};

export const _patch = async (path, object = {}) => {
    const response = await request.patch(path, object);
    return response;
};

export const _delete = async (path, object = {}) => {
    const response = await request.delete(path, object);
    return response;
};

export default request;

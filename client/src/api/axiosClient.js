import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/api/',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

//Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    async function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        const { status, message, redirect_url } = response.data;
        if (redirect_url) {
            window.location.href = redirect_url;
        }
        if (status && status === 401) {
            if (message && message === 'jwt expired') {
                axiosClient.defaults.headers.common['x-token'] = localStorage.getItem('refresh_token');

                const { accessToken } = await refreshToken();
                if (accessToken) {
                    response.config.headers['Authorization'] = `Bearer ${accessToken}`;
                    localStorage.setItem('access_token', accessToken);

                    return axiosClient(response.config);
                }
            }
        }

        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

const refreshToken = async () => (await axiosClient.get('/refresh_token')).data;

export default axiosClient;

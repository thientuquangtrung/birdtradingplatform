import { enqueueSnackbar } from 'notistack';

const handleError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.status);
        // console.log(error.response.headers);
        if (String(error.response.status).startsWith('4')) {
            enqueueSnackbar(error.response.data.message, { variant: 'error' });
        } else if (String(error.response.status).startsWith('5')) {
            enqueueSnackbar('Xảy ra lỗi hệ thống, vui lòng thử lại sau.', { variant: 'error' });
        }
        console.log(error.response.data);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the
        // browser and an instance of
        // http.ClientRequest in node.js
        enqueueSnackbar('Đã có lỗi xảy ra, thử lại sau.', { variant: 'error' });
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        enqueueSnackbar('Không thể thực hiện hành động này. Vui lòng kiểm tra lại.', { variant: 'error' });
        console.log('Error', error.message);
    }
};

export default handleError;

const { memoryStorage } = require('multer');
const multer = require('multer');

function uploadImg() {
    const upload = multer({
        storage: memoryStorage(),
        limits: {
            fileSize: 10000000,
        },
    });

    return upload;
}

module.exports = {
    uploadImg,
};

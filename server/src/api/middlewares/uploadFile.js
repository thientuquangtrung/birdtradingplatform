const createHttpError = require("http-errors");
const multer = require("multer");
const path = require("path");

function uploadImg (prefix) {
    const storage = multer.diskStorage({
        destination: path.join(process.cwd(), `public/images/${prefix}`),
        filename: (req, file, cb) => {
            return cb(
                null,
                `${prefix}_${Date.now()}${path.extname(file.originalname)}`
            );
        },
    });
    
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1000000,
        },
    });

    return upload
}

module.exports = {
    uploadImg,
};

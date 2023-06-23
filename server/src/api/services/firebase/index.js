const { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } = require('firebase/storage');
const path = require('path');
const storage = getStorage();

const uploadImage = async ({ file, folder = 'general', prefix = 'general' }) => {
    try {
        if (!file) return '';

        const metadata = {
            contentType: file.mimetype,
        };

        const storageRef = ref(storage, `images/${folder}/${prefix}_${Date.now()}` + path.extname(file.originalname));
        const uploadTask = await uploadBytesResumable(storageRef, file.buffer, metadata);
        const downloadURL = await getDownloadURL(uploadTask.ref);

        return downloadURL;
    } catch (error) {
        throw error;
    }
};

const getImage = async () => {
    try {
    } catch (error) {
        throw error;
    }
};

const deleteImage = async (imageUrl) => {
    try {
        // Create a reference to the file to delete
        const desertRef = ref(storage, imageUrl);

        // Delete the file
        await deleteObject(desertRef);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    uploadImage,
    getImage,
    deleteImage,
};

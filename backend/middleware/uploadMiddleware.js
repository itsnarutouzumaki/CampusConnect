const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'assignments',
        resource_type: 'auto',
        overwrite: true
    }
});

const upload = multer({ storage });

module.exports = upload;


const cloudinaryStorage = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary');
const multer = require('multer')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpg', 'png', 'txt'],
    filename: function (req, file, cb) {
        cb(undefined, Date.now() + file.originalname.split('.')[0]);
    }
});
exports.parser = multer({ storage: storage });
exports.uploader = cloudinary.uploader;
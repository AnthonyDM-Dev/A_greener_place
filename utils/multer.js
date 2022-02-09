const multer = require('multer');
var config = require('../config/config.json');

// Multer settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.multerDestination);
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.replace('image/', '.');
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9) + extension;
        cb(null, file.fieldname + '_' + uniqueSuffix);
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: config.multerFileSize },
    fileFilter: function fileFilter (req, file, cb) {
        var extensionsAllowed = /(\.jpg|\.jpeg|\.png)$/i;
        extensionsAllowed.exec(file.originalname) ? cb(null, true) : cb(new Error('Image file extension not allowed'));
    }
}).single('image');

module.exports = {
    upload: upload,
};
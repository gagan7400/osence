const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
    registerUser,
    loginUser,
    logout,
    getUserProfile
} = require('../controllers/userController');

const { isAuthenticatedUser } = require('../middleware/auth');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Images and PDFs only!');
        }
    }
});

const documentUpload = upload.fields([
    { name: 'panCardImage', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 }
]);

router.route('/register').post(documentUpload, registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile);

module.exports = router; 
const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadImage');
const { multerUploads } = require('../middleware/multer');

router.route('/upload').post(multerUploads, uploadImage);

module.exports = router;

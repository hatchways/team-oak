const express = require("express");
const router = express.Router();
const { uploadImage, uploadImages } = require("../controllers/uploadImage");
const { multerSingleUpload, multerMultipleUpload } = require("../middleware/multer");

router.route("/single").post(multerSingleUpload, uploadImage);
router.route("/multiple").post(multerMultipleUpload, uploadImages);

module.exports = router;

const express = require("express");
const router = express.Router();
const { uploadImage, uploadImages } = require("../controllers/uploadImage");
const protect = require("../middleware/auth");
const {
  multerSingleUpload,
  multerMultipleUpload,
} = require("../middleware/multer");

router.route("/single").post(multerSingleUpload, protect, uploadImage);
router.route("/multiple").post(multerMultipleUpload, protect, uploadImages);

module.exports = router;

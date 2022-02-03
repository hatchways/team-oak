const express = require("express");
const router = express.Router();
const { uploadProfilePhoto } = require("../controllers/profilePhoto");
const protect = require("../middleware/auth");
const { multerSingleUpload } = require("../middleware/multer");

router.route("/upload").post(multerSingleUpload, protect, uploadProfilePhoto);

module.exports = router;

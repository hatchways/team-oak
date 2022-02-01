const multer = require("multer");
const DatauriParser = require("datauri/parser");
const path = require("path");

const storage = multer.memoryStorage();
const parser = new DatauriParser();

const multerSingleUpload = multer({ storage }).single("image");
const multerMultipleUpload = multer({ storage }).array("image", 12);

const dataUri = (file) => parser.format(path.extname(file.originalname).toString(), file.buffer);

module.exports = { multerSingleUpload, multerMultipleUpload, dataUri };

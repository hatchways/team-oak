// @route POST /uploadImage/upload
// @desc upload single image
// @access Public

const asyncHandler = require("express-async-handler");
const { dataUri } = require("../middleware/multer");
const { cloudinary } = require("../utils/cloudinary");

exports.uploadImage = asyncHandler(async (req, res, next) => {
  try {
    const file = dataUri(req.file).content;
    const uploadResponse = await cloudinary.uploader.upload(file);
    const url = uploadResponse.url;

    res.status(200).json({
      messge: "Successful upload",
      data: {
        url,
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @route POST /uploadImage/upload
// @desc upload multiple images
// @access Public

exports.uploadImages = asyncHandler(async (req, res, next) => {
  try {
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const uri = dataUri(file).content;
      const uploadResponse = await cloudinary.uploader.upload(uri);
      urls.push(uploadResponse.url);
    }

    res.status(200).json({
      messge: "Successful upload",
      data: {
        urls,
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

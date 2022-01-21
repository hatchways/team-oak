// @route POST /uploadImage/upload
// @desc upload image
// @access Public

const asyncHandler = require('express-async-handler');
const { dataUri } = require('../middleware/multer');
const { cloudinary } = require('../utils/cloudinary');

exports.uploadImage = asyncHandler(async (req, res, next) => {
  try {
    const images = [];
    const files = req.files;

    for (const file of files) {
      const uri = dataUri(file).content;
      const imageResponse = await cloudinary.uploader.upload(uri);
      images.push(imageResponse.url);
    }

    res.status(200).json({
      messge: 'Your image has been uploded successfully to cloudinary',
      data: {
        images,
      },
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

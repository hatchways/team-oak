// @route POST /uploadImage/upload
// @desc upload image
// @access Public

const asyncHandler = require('express-async-handler');
const { dataUri } = require('../middleware/multer');
const { cloudinary } = require('../utils/cloudinary');

exports.uploadImage = asyncHandler(async (req, res, next) => {
  try {
    const file = dataUri(req).content;
    const imageResponse = await cloudinary.uploader.upload(file);
    const image = imageResponse.url;

    res.status(200).json({
      messge: 'Your image has been uploded successfully to cloudinary',
      data: {
        image,
      },
    });
  } catch (error) {
    res.status(400);
    throw new Error('Someting went wrong while processing your request');
  }
});

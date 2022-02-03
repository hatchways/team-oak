const Profile = require("../models/Profile");
const upload = require("./uploadImage");
const asyncHandler = require("express-async-handler");

// @route POST /profilePhoto/upload
// @desc upload profile photo
// @access Private
exports.uploadProfilePhoto = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne(req.user);
  const generateUrl = await upload.uploadImageHelper(req.user._id, req.file);
  profile.photo = generateUrl;
  await profile.save();

  res.status(200).json({
    message: "Profile photo successfully changed",
    url: {
      generateUrl,
    },
  });
});

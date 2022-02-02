const Profile = require("../models/Profile");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const dotenv = require("dotenv").config({ path: __dirname + "/./../.env" });

const loginHelper = async (res, email, password) => {
  const user = await User.findOne({ email });
  const profile = await Profile.findOne({ user });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(200).json({
      success: {
        user: {
          id: user._id,
          email: user.email,
        },
        profile,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

module.exports = loginHelper;

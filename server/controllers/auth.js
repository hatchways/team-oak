const User = require("../models/User");
const Profile = require("../models/Profile");
const PetSitter = require("../models/PetSitter");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const loginHelper = require("../helpers/loginHelper");
const newCustomer = require("./stripe");

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const emailExists = await User.findOne({ email });

  const isPetSitter = req.query.accountType === "petSitter" ? true : false;

  if (emailExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }

  const user = await User.create({
    email,
    password,
  });

  if (user) {
    if (isPetSitter) {
      await PetSitter.create({
        userId: user._id,
        name,
      });
    } else {
      const profile = await Profile.create({
        userId: user._id,
        name,
      });
      newCustomer.createCustomer(user, profile);
    }

    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
    });

    res.status(201).json({
      success: {
        user: {
          id: user._id,
          email: user.email,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  await loginHelper(res, email, password);
});

// @route POST /auth/demo
// @desc Login DEMO user
// @access Public
exports.demoUser = asyncHandler(async (req, res, next) => {
  const email = process.env.DEMO_USER_EMAIL;
  const password = process.env.DEMO_USER_PASSWORD;
  await loginHelper(res, email, password);
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const profile = await Profile.findOne({ userId: req.user.id });

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      user: {
        id: user._id,
        email: user.email,
      },
      profile,
    },
  });
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");

  res.send("You have successfully logged out");
});

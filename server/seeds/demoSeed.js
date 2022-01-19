const dotenv = require("dotenv").config({ path: __dirname + "/./../.env" });
const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");

const seedDB = async (req, res, next) => {
  const demoUser = new User({
    email: process.env.DEMO_USER_EMAIL,
    password: process.env.DEMO_USER_PASSWORD,
    name: "Marry Wills",
  });

  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
  await demoUser.save();

  demoUserDetails = await User.findOne({ email: process.env.DEMO_USER_EMAIL });

  const demoProfile = new Profile({
    userId: demoUserDetails,
    name: "Marry Wills",
    gender: "female",
    address: "1 main street",
    telephone: "1234567890",
    birthday: 1970 / 01 / 01,
  });

  await demoProfile.save();
};

seedDB().then(() => {
  mongoose.connection.close();
});

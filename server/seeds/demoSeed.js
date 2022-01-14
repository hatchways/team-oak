const dotenv = require('dotenv').config({path:__dirname+'/./../.env'})
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


const seedDB = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  saltedPassword = await bcrypt.hash(process.env.DEMO_USER_PASSWORD, salt);
  
  const demoUser = [
    {
      email: process.env.DEMO_USER_EMAIL,
      password: saltedPassword,
      name: "demo",
    },
  ]

  const conn = await mongoose.connect(process.env.MONGO_URI)
  console.log(`MongoDB Connected: ${conn.connection.host}`);
  await User.insertMany(demoUser);
};

seedDB().then(() => {
  mongoose.connection.close();
})

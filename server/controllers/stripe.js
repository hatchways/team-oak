const User = require("../models/User");
const Profile = require("../models/Profile");
const PetSitter = require("../models/PetSitter");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv").config({ path: __dirname + "/./../.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const profile = await Profile.findOne(req.user);

  const account = await stripe.accounts.create({
    email: user.email,
    business_type: "company",
    company: {
      name: profile.name,
    },
    country: "CA",
    default_currency: "cad",
    type: "standard",
  });

  petsitter.stripeAccountId = account.id;
  await petsitter.save();

  const accountLink = await stripe.accountLinks.create({
    account: petsitter.stripeAccountId,
    refresh_url: process.env.STRIPE_CONNECT_REFRESH_URL,
    return_url: process.env.STRIPE_CONNECT_RETURN_URL,
    type: "account_onboarding",
  });

  res.status(201).json({
    success: {
      accountLink,
    },
  });
});

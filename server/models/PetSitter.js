const mongoose = require("mongoose");
const Profile = require("./Profile");

const petSitterSchema = new mongoose.Schema(
  {
    stripeAccountId: {
      type: String,
      default: "",
    },
    availabilityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Availability",
    },
    rate: {
      type: Number,
    },
  },
  { discriminatorKey: "type" }
);

const PetSitter = Profile.discriminator("PetSitter", petSitterSchema);

module.exports = PetSitter;

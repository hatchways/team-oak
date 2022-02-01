const mongoose = require("mongoose");
const Profile = require("./Profile");

const petSitterSchema = new mongoose.Schema({
  availabilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Availability",
  },
  rate: {
    type: Number,
  },
});

const PetSitter = Profile.discriminator("PetSitter", petSitterSchema);

module.exports = PetSitter;

const mongoose = require("mongoose");
const Donor = require("./donor");
const Image = require("./image");
const Ngo = require("./ngo");

const foodDonationSchema = new mongoose.Schema({
  donationRequestNum: {
    type: Number,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  numberDaysBeforeExpiry: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // images:[
  //     {
  //         type:mongoose.Schema.Types.ObjectId,
  //         ref:"Image",
  //     }
  // ],
  images: {
    type: Array,
  },
  pickUpLocation: {
    type: String,
    required: true,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "donor",
  },
  accepted: {
    type: Boolean,
    required: true,
  },
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ngo",
  },
});

const FoodDonation = mongoose.model("foodDonation", foodDonationSchema);
module.exports = FoodDonation;
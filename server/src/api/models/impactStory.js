const mongoose = require("mongoose");

const impactStorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const ImpactStory = mongoose.model("impactStory", impactStorySchema);
module.exports = ImpactStory;

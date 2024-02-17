const mongoose = require("mongoose");

const uploadImageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
});

const UploadImage = mongoose.model("uploadImage", uploadImageSchema);
module.exports = UploadImage;

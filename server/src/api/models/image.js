const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true,
    },
    caption:{
        type:String,
    },
});

const Image = mongoose.model("image",imageSchema);
module.exports = Image;
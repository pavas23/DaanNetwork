const mongoose = require("mongoose");

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    emailId:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    pickUpLocation:{
        type:String,
        required:true,
    },
});

const User = mongoose.model("user",userSchema);
module.exports = User;
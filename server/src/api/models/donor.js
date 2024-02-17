const mongoose = require("mongoose");

const donorSchema  = new mongoose.Schema({
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
    address:{
        type:String,
        required:true,
    }
});

const Donor = mongoose.model("donor",donorSchema);
module.exports = Donor;
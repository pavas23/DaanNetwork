const mongoose = require("mongoose");
const Donor = require("./donor");
const Image = require("./image");

const foodDonationSchema = new mongoose.Schema({
    quantity:{
        type:String,
        required:true,
    },
    numberDaysBeforeExpiry:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    images:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Image",
        }
    ],
    pickUpLocation:{
        type:String,
        required:true,
    },
    donor:{
        // it will need ref. to donor schema for establishing 1:M relationship between donor and food donation requests.
        type:mongoose.Schema.Types.ObjectId,
        ref:"Donor",
    }
});

const FoodDonation = mongoose.model("foodDonation",foodDonationSchema);
module.exports = FoodDonation;

const mongoose = require("mongoose");
const donationSchema = new mongoose.Schema({
    donationRequestNum:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
    startDate:{
        type:Date,
        default:Date.now()
    },
    endDate:{
        type:Date,
        required:true,
    },
    description:{
        name:{
            type: String,
            required:true
        },
        items: [{
            name:{
                type:String
            },
            quantity:{
                type:Number
            }
        }],
        images:Array
    },
    ngo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ngo"
    },
    donors:[{
        donor:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'donor'
        },
        ītems:Array,
        pickUpDate: {
            type:Date,
            required:true
        },
        pickUpAddress:{
            type:String
        },
        description:{
            type:String
        }
    }]
    

});

const NgoDonationRequest = mongoose.model("ngoDonationRequest", donationSchema);
module.exports = NgoDonationRequest;
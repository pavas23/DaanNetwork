const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    quantity:{
        type:String,
        required:true,
    },
    numberDaysBeforeExpiry:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
    },
});

const Food = mongoose.model("food",foodSchema);
module.exports = Food;
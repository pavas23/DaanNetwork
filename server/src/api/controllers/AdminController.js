const BlockedUsers = require("../models/blockedUsers");
const { createSecretToken } = require("../helpers/secretToken");
const admin = require("../models/admin");
const Donor = require('../models/donor')
const Ngo = require("../models/ngo")
const DonationDrive = require("../models/ngoDonationRequest")
const FoodDonation = require('../models/foodDonation')
module.exports.blockUser = async (req, res) => {
  try {
    const { emailId } = req.body;
    const user = await BlockedUsers.findOne({ emailId: emailId });
    if (user) {
      return res
        .status(400)
        .json({ status: false, desc: "User already blocked" });
    }
    const blockedUser = await BlockedUsers.create({
      emailId: emailId,
    });
    return res
      .status(201)
      .json({ status: true, desc: "User Blocked Successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.isBlocked = async (req, res) => {
  try {
    const { emailId } = req.body;
    const user = await BlockedUsers.findOne({ emailId: emailId });
    if (user) {
      return res.status(200).json({ status: true, desc: "User is blocked" });
    }
    return res.status(200).json({ status: false, desc: "User is not blocked" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.unblockUser = async (req, res) => {
  try {
    const { emailId } = req.body;
    const user = await BlockedUsers.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).json({ status: false, desc: "User not blocked" });
    }
    await BlockedUsers.deleteOne({ emailId: emailId });
    return res
      .status(200)
      .json({ status: true, desc: "User Unblocked Successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.adminLogin = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    console.log(emailId, password);
    const newNGO = await admin.findOne({ emailId: emailId });
    console.log(password, newNGO);
    if (!newNGO) {
      return res
        .status(400)
        .json({ status: false, desc: "Incorrect Password or Email-id" });
    }
    const validPassword = password === newNGO.password;
    if (!validPassword) {
      return res
        .status(400)
        .json({ status: false, desc: "Incorrect Password or Email-id" });
    }
    const token = createSecretToken(newNGO._id);

    res.status(201).json({
      status: true,
      token: token,
      message: "User logged in successfully",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};


module.exports.getDonorCount = async (req,res) =>{
  try{
    const donors = await Donor.find({})
    if(!donors){
      return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
    }

    return res.status(200).json({status:true,donors:donors.length});

  }catch (err){
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
}

module.exports.getNgoCount = async (req,res) =>{
  try{
    const ngo = await Ngo.find({})
    if(!ngo){
      return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
    }

    return res.status(200).json({status:true,ngos:ngo.length});
    
  }catch (err){
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
}

module.exports.getDonationDriveCount = async (req,res) =>{
  try{
    const donationDrive = await DonationDrive.find({})
    if(!donationDrive){
      return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
    }

    return res.status(200).json({status:true,donationDrives:donationDrive.length});
    
  }catch (err){
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
}


module.exports.getAvgAcceptTime = async (req,res) => {
  try{
    const donations = await FoodDonation.find({})
    if(!donations){
      return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
    }

    var av = 0;
    for(var d of donations){
      av = av + new Date(d.acceptedDate).getTime() - new Date(d.createdAt).getTime()
    }
    console.log(av);
    av = av/(1000*60*donations.length)
    console.log(av);

    return res.status(200).json({status:true,avgAcceptTime:av});

  } catch (err){
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
}

module.exports.getAvgDonorsPerDrive = async (req,res) => {
  try{
    const donationDrive = await DonationDrive.find({})
    if(!donationDrive){
      return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
    }

    var av = 0
    for(var d of donationDrive){
      av = av + d.donors.length
    }
    av = av/donationDrive.length
    console.log(av);

    return res.status(200).json({status:true,avgDonors:av});
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
}
const BlockedUsers = require("../models/blockedUsers");
const { createSecretToken } = require("../helpers/secretToken");
const admin = require("../models/admin");
const Ngo = require("../models/ngo");
const Donor = require("../models/donor");
const FoodDonation = require("../models/foodDonation");
const BlockedUser = require("../models/blockedUsers");

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
    console.log(password, newNGO.password, newNGO);
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

const findState= (address)=>{
  var state=address.split(",");
  var temp=state[state.length-1];
  temp=temp.trim();
  return temp;
}

module.exports.getNgoStates= async (req, res) => {
  try {
    var ngo=await Ngo.find();
    var states={};
    ngo.forEach((ngo)=>{
     var state=findState(ngo.address);
      if(states[state]){
        states[state]++;
      }
      else{
        states[state]=1;
      }
    });
    return res.status(200).json({ status: true, states: states });

  }catch(err){
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
}

module.exports.getDonorStates= async (req, res) => {
  try {
    var donor=await Donor.find();
    var states={};
    donor.forEach((donor)=>{
     var state=donor.state;
      if(states[state]){
        states[state]++;
      }
      else{
        states[state]=1;
      }
    });
    return res.status(200).json({ status: true, states: states });

  }catch(err){
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
}

module.exports.getFoodDonationsStates= async (req, res) => {
  try {
    var donations=await FoodDonation.find();
    var states={};
    donations.forEach((donation)=>{
     var state=findState(donation.pickUpLocation);
      if(states[state]){
        states[state]++;
      }
      else{
        states[state]=1;
      }
    });
    return res.status(200).json({ status: true, states: states });

  }catch(err){
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
}

module.exports.getBlockedUsersStates= async (req, res) => {
  try {
    var blockedUsers=await BlockedUsers.find();
    var states={};
    var ngos=[]

    await Promise.all(blockedUsers.map(async (user) => {
      const emailId = user.emailId;
      const x = await Ngo.findOne({ emailId: emailId });
      if (x !== null) {
        ngos.push(x);
      }
    }));


    ngos.forEach((ngo)=>{
      var state=findState(ngo.address);
      if(states[state]){
        states[state]++;
      }
      else{
        states[state]=1;
      }
    });
    return res.status(200).json({ status: true, states: states });

  }catch(err){
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
}

module.exports.getVerifiedNgoStates= async (req, res) => {
  try {
    var ngo=await Ngo.find({isVerified:true});
    var states={};
    ngo.forEach((ngo)=>{
     var state=findState(ngo.address);
      if(states[state]){
        states[state]++;
      }
      else{
        states[state]=1;
      }
    });
    return res.status(200).json({ status: true, states: states });

  }catch(err){
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
}
const BlockedUsers = require("../models/blockedUsers");
const { createSecretToken } = require("../helpers/secretToken");
const admin = require("../models/admin");
const Ngo = require("../models/ngo");
const Donor = require("../models/donor");
const FoodDonation = require("../models/foodDonation");
const BlockedUser = require("../models/blockedUsers");
const DonationDrive = require("../models/ngoDonationRequest");
const ImpactStory = require("../models/impactStory");

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

const findState = (address) => {
  var state = address.split(",");
  var temp = state[state.length - 1];
  temp = temp.trim();
  return temp;
};

module.exports.getNgoStates = async (req, res) => {
  try {
    var ngo = await Ngo.find();
    var states = {};
    ngo.forEach((ngo) => {
      var state = findState(ngo.address);
      if (states[state]) {
        states[state]++;
      } else {
        states[state] = 1;
      }
    });
    return res.status(200).json({ status: true, states: states });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.getDonorStates = async (req, res) => {
  try {
    var donor = await Donor.find();
    var states = {};
    donor.forEach((donor) => {
      var state = donor.state;
      if (states[state]) {
        states[state]++;
      } else {
        states[state] = 1;
      }
    });
    return res.status(200).json({ status: true, states: states });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.getFoodDonationsStates = async (req, res) => {
  try {
    var donations = await FoodDonation.find();
    var states = {};
    donations.forEach((donation) => {
      var state = findState(donation.pickUpLocation);
      if (states[state]) {
        states[state]++;
      } else {
        states[state] = 1;
      }
    });
    return res.status(200).json({ status: true, states: states });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.getBlockedUsersStates = async (req, res) => {
  try {
    var blockedUsers = await BlockedUsers.find();
    var states = {};
    var ngos = [];

    await Promise.all(
      blockedUsers.map(async (user) => {
        const emailId = user.emailId;
        const x = await Ngo.findOne({ emailId: emailId });
        if (x !== null) {
          ngos.push(x);
        }
      }),
    );

    ngos.forEach((ngo) => {
      var state = findState(ngo.address);
      if (states[state]) {
        states[state]++;
      } else {
        states[state] = 1;
      }
    });
    return res.status(200).json({ status: true, states: states });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.getVerifiedNgoStates = async (req, res) => {
  try {
    var ngo = await Ngo.find({ isVerified: true });
    var states = {};
    ngo.forEach((ngo) => {
      var state = findState(ngo.address);
      if (states[state]) {
        states[state]++;
      } else {
        states[state] = 1;
      }
    });
    return res.status(200).json({ status: true, states: states });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.getDonorCount = async (req, res) => {
  try {
    const donors = await Donor.find({});
    if (!donors) {
      return res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }

    return res.status(200).json({ status: true, donors: donors.length });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.getNgoCount = async (req, res) => {
  try {
    const ngo = await Ngo.find({});
    if (!ngo) {
      return res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }

    return res.status(200).json({ status: true, ngos: ngo.length });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.getDonationDriveCount = async (req, res) => {
  try {
    const donationDrive = await DonationDrive.find({});
    if (!donationDrive) {
      return res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }

    return res
      .status(200)
      .json({ status: true, donationDrives: donationDrive.length });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.getAvgAcceptTime = async (req, res) => {
  try {
    const donations = await FoodDonation.find({});
    if (!donations) {
      return res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }

    var av = 0;
    for (var d of donations) {
      av =
        av +
        new Date(d.acceptedDate).getTime() -
        new Date(d.createdAt).getTime();
    }
    console.log(av);
    av = av / (1000 * 60*60*24* donations.length);
    console.log(av);

    return res.status(200).json({ status: true, avgAcceptTime: av });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.getAvgDonorsPerDrive = async (req, res) => {
  try {
    const donationDrive = await DonationDrive.find({});
    if (!donationDrive) {
      return res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }

    var av = 0;
    for (var d of donationDrive) {
      av = av + d.donors.length;
    }
    av = av / donationDrive.length;
    console.log(av);

    return res.status(200).json({ status: true, avgDonors: av });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.getCountOfVerifiedNGO = async (req, res) => {
  try {
    const ngo = await Ngo.find({});
    var verif = 0;
    if (!ngo) {
      return res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }
    for (var n of ngo) {
      if (n.isVerified) {
        verif++;
      }
    }
    return res
      .status(200)
      .json({ status: true, verifiedNgoData: [ngo.length - verif, verif] });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.getNumberOfCompleteDrives = async (req, res) => {
  try {
    const drives = await DonationDrive.find({});
    if (!drives) {
      return res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }
    var inComplete = 0;
    for (var d of drives) {
      if (d.endDate > Date.now()) inComplete++;
    }
    return res
      .status(200)
      .json({
        status: true,
        completeDrives: [inComplete, drives.length - inComplete],
      });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.getDonationStat = async (req, res) => {
  try {
    const donations = await FoodDonation.find({});
    if (!donations) {
      return res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }
    var accepted = 0;

    for (var v of donations) {
      if (v.accepted) accepted++;
    }
    return res
      .status(200)
      .json({
        status: true,
        acceptedDonations: [donations.length - accepted, accepted],
      });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

module.exports.getDonationReqTimeSeries = async (req, res) => {
  try {
    const donationReq = await FoodDonation.find({});
    const hashmap = new Map();
    if (!donationReq) {
      return res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }
    // console.log(donationReq);
    for (var v of donationReq) {
      if (hashmap.has(formatDate(v.createdAt))){
        hashmap.set(formatDate(v.createdAt),hashmap.get(formatDate(v.createdAt)) + 1);

      }
      else{
        
        hashmap.set(formatDate(v.createdAt), 1)
      } 
    }
    
    var time = [];
    for (var key of hashmap.keys()) {
  
      time.push(key);
    }
    time.sort();
    var values = [];
    for (var i of time) {
      values.push(hashmap.get(i));
    }
    console.log(time, values);
    return res.status(200).json({ status: true, time: time, value: values });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.addImpactStory = async (req, res) => {
  try {
    const { title, description } = req.body;

    // add this story to db
    let newImpactStory = await ImpactStory.create({
      title: title,
      description: description
    });

    res.status(201).json({ status: true, desc: "Impact Story added successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

module.exports.getImpactStory = async (req, res) => {
  try {
    var impactStories = await ImpactStory.find({});
    if (impactStories.length === 0) {
      return res
        .status(200)
        .json({ status: false, desc: "No impact story exists", impactStories:[] });
    }
    if (impactStories.length <= 3) {
      res.status(201).json({ status: true, impactStories: impactStories });
    } else {
      // sending any random 3 stories
      // shuffle array
      for (let i = impactStories.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [impactStories[i], impactStories[j]] = [impactStories[j], impactStories[i]];
      }
      const shuffledArray = impactStories.slice();
      const randomArray = shuffledArray.slice(0, 3);
      res.status(201).json({ status: true, impactStories: randomArray });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

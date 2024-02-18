const Donor = require("../models/donor");
const Ngo = require("../models/ngo");
const FoodDonation = require("../models/foodDonation");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// ngo controller to create ngo
// req body : {name, panNumber, nameOfHead, gender, emailId, password, contactNumber, website, address}
// res : { status:boolean, desc:string }
module.exports.createNgo = async (req, res) => {
  try {
    const {
      name,
      panNumber,
      nameOfHead,
      gender,
      emailId,
      password,
      contactNumber,
      website,
      address,
    } = req.body;

    // check if ngo with this mail exists or not
    const ngos = await Ngo.find({ emailId: emailId });
    if (ngos.length != 0) {
      return res
        .status(400)
        .json({ status: false, desc: "NGO with this email id already exists" });
    }

    let ngo = await Ngo.create({
      name: name,
      panNumber: panNumber,
      nameOfHead: nameOfHead,
      gender: gender,
      emailId: emailId,
      password: password,
      contactNumber: contactNumber,
      website: website,
      address: address,
    });

    console.log(ngo);
    return res
      .status(200)
      .json({ status: true, desc: "NGO created successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }
  }
};

// ngo controller to see all pending donation requests along with donor details
// req body : {}
// res : { status:boolean, list:[] }
module.exports.getAllDonationRequests = async (req, res) => {
  try {
    // this will show donation requests which are not accepted yet, along with donor details
    var foodDonations = FoodDonation.find({ accepted: false })
      .populate("donor")
      .exec();
    foodDonations = (await foodDonations).map((donation) => donation.toJSON());
    return res.status(200).json({ status: true, foodDonations: foodDonations });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

// ngo controller to accept donation requests which have not been accepted yet
// req body : { ngoEmailId, donorEmailId, donationRequestNum}
// res : { status:boolean, desc:String }
module.exports.acceptDonationRequest = async (req, res) => {
  try {
    const { ngoEmailId, donorEmailId, donationRequestNum } = req.body;

    // finding donor by email id
    const donors = await Donor.find({ emailId: donorEmailId });
    if (donors.length == 0) {
      // no valid donor exists
      return res.status(400).json({
        status: false,
        desc: "No valid donor exists with this mail id !!",
      });
    }

    // finding ngo by email id
    const ngos = await Ngo.find({ emailId: ngoEmailId });
    if (ngos.length == 0) {
      // no valid ngo exists
      return res.status(400).json({
        status: false,
        desc: "No valid ngo exists with this mail id !!",
      });
    }

    // check if this request is already accepted
    var foodDonation = await FoodDonation.find({
      donor: donors[0]._id,
      donationRequestNum: donationRequestNum,
    });
    if (foodDonation.length == 0) {
      return res
        .status(400)
        .json({ status: false, desc: "Such a request does not exist!" });
    }
    if (foodDonation[0].accepted) {
      return res.status(200).json({
        status: false,
        desc: "This donation request is already accepted",
      });
    }

    // marking request as accepted
    foodDonation[0].accepted = true;
    // ref. ngo with this request
    foodDonation[0].ngo = ngos[0]._id;

    await FoodDonation.findOneAndUpdate(
      {
        donor: donors[0]._id,
        donationRequestNum: donationRequestNum,
      },
      { $set: foodDonation[0] },
      { new: true }
    );

    return res
      .status(200)
      .json({ status: true, desc: "Donation request has been accepted" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};

// ngo controller to get list of donation requests accepted by ngo
// req body { ngoEmailId }
// res : { status:boolean, list:[] }
module.exports.getMyDonationRequests = async (req, res) => {
  try {
    const { ngoEmailId } = req.body;

    // finding ngo by email id
    const ngos = await Ngo.find({ emailId: ngoEmailId });
    if (ngos.length == 0) {
      // no valid ngo exists
      return res.status(400).json({
        status: false,
        desc: "No valid ngo exists with this mail id !!",
      });
    }

    // get donation requests which are accepted by this ngo
    var foodDonations = FoodDonation.find({ accepted: true })
      .populate("donor")
      .populate("ngo")
      .exec();
    foodDonations = (await foodDonations).map((donation) => {
      if (donation.ngo.emailId == ngoEmailId) return donation.toJSON();
    });

    // empty list
    if (foodDonations[0] == null) {
      return res
        .status(200)
        .json({ status: false, foodDonations: foodDonations });
    }
    return res.status(200).json({ status: true, foodDonations: foodDonations });
  } catch (error) {
    if (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: false, desc: "Internal Server Error Occured" });
    }
  }
};

// ngo controller to send mail to donor that it has accepted the donation request
// req body {ngoEmailId, donorEmailId, donationRequestNum}
// res : { status:boolean, desc:String}
module.exports.sendConfirmationMailToDonor = async (req, res) => {
  try {
    const { ngoEmailId, donorEmailId, donationRequestNum } = req.body;

    // finding donor by email id
    const donors = await Donor.find({ emailId: donorEmailId });
    if (donors.length == 0) {
      // no valid donor exists
      return res.status(400).json({
        status: false,
        desc: "No valid donor exists with this mail id !!",
      });
    }

    // finding ngo by email id
    const ngos = await Ngo.find({ emailId: ngoEmailId });
    if (ngos.length == 0) {
      // no valid ngo exists
      return res.status(400).json({
        status: false,
        desc: "No valid ngo exists with this mail id !!",
      });
    }

    // check if this request is already accepted
    var foodDonation = await FoodDonation.find({
      donor: donors[0]._id,
      donationRequestNum: donationRequestNum,
    });

    if (foodDonation.length == 0 || foodDonation[0] == null) {
      return res
        .status(400)
        .json({ status: false, desc: "Such a request does not exist!" });
    }
    if (!foodDonation[0].accepted) {
      return res.status(200).json({
        status: false,
        desc: "This donation request is not accepted, can't send mail to donor",
      });
    }

    // send mail to donor from website id on behalf of ngo
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("../src/api/views"),
        defaultLayout: false,
      },
      viewPath: path.resolve("../src/api/views"),
      extName: ".handlebars",
    };
    transporter.use("compile", hbs(handlebarOptions));

    let mailOptions = {
      from: process.env.EMAIL,
      to: donorEmailId,
      subject: "Daan Network",
      context: {
        title: "Donation Request Status Update",
        email: donorEmailId,
        ngoName: ngos[0].name,
        name: donors[0].name,
      },
      template: "index",
    };

    transporter.sendMail(mailOptions, (err, success) => {
      if (err) {
        console.log(err);
      }
      console.log("Email sent successfully!!");
    });

    return res
      .status(200)
      .json({ status: true, desc: "Mail sent successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, desc: "Internal Server Error Occured" });
  }
};


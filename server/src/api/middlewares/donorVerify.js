const donor=require('../models/donor');
const jwt=require('jsonwebtoken');
require('dotenv').config();

module.exports.donorVerification=async(req,res,next)=>{
    const token=req.cookies.token;
    if (!token) {
        return res.json({ status: false })
      }
      jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
         return res.json({ status: false })
        } else {
          const user = await donor.findById(data.id)
          if (user) return res.json({ status: true, user: user.emailId })
          else return res.json({ status: false })
        }
    })
}
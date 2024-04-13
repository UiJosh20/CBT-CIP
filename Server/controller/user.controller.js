const userModel = require("../model/user.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const MAILEREMAIL = process.env.MAILEREMAIL;
// const MAILERPASS = process.env.MAILERPASS;
const secret = process.env.SECRET;



const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};


// user sign up

const register = (req, res) =>{
const otp = generateOTP();
const otpExpiration = new Date(Date.now() + 30 * 60 * 1000);
const { email } = req.body;
const users = new userModel({ ...req.body, otp, otpExpiration });
users
  .save()
  .then(() => {
    console.log("User saved successfully");
    sendVerificationToEmail(email);
    res
      .status(201)
      .send({ message: "User registered successfully", status: 200 });
  })
  .catch((error) => {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  });
}


// send email verification to the user

const sendVerificationToEmail = (email) => {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: MAILEREMAIL,
          pass: MAILERPASS,
        },
      });
  
      const mailOptions = {
        from: MAILEREMAIL,
        to: email,
        subject: "Verify your email address",
        text: `Congratulations your email has been verified successfully`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };
  

const login = (req, res) =>{
    console.log(req.body)
    }

module.exports = {
    register,
    login,
}
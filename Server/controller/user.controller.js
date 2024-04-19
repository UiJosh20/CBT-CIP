const userModel = require("../model/user.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const MAILEREMAIL = process.env.MAILEREMAIL;
const MAILERPASS = process.env.MAILERPASS;
const secret = process.env.SECRET;

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const generateVerificationToken = () => {
  return crypto.randomBytes(3).toString("hex");
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// user sign up

const register = (req, res) => {
  const otp = generateOTP();
  const otpExpiration = new Date(Date.now() + 30 * 60 * 1000);
  const verificationToken = generateVerificationToken();
  const { email } = req.body;
  if (!validateEmail(email)) {
    console.log("Invalid email format");
    res.send({ message: "Invalid email format" });
  }

  const users = new userModel({
    ...req.body,
    verificationToken,
    otp,
    otpExpiration,
  });
  users
    .save()
    .then(() => {
      console.log("User saved successfully");
      sendVerificationToEmail(email, verificationToken);
      res
        .status(201)
        .send({ message: "User registered successfully", status: 200 });
    })
    .catch((error) => {
      console.error("Error saving user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// send email verification to the user

const sendVerificationToEmail = (email, verificationToken) => {
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
      text: `Here is your email verification token ${verificationToken}`,
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

// verify email token

const verifyToken = (req, res) => {
  let { verificationToken } = req.body;

  userModel.findOne({ verificationToken }).then((user) => {
    console.log(user);
    if (!user) {
      res.status(400).send({ message: "Invalid verification token" });
    } else {
      user.verified = true;
      user.save()
        .then(() => {
          res.send({ message: "Email verified successfully", status: 200 });
        })
        .catch((error) => {
          console.error("Error saving user:", error);
          res.status(500).json({ message: "Internal Server Error" });
        });
    }
  });
};


const login = (req, res) => {
  let { email, password } = req.body;
  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.status(404).send({ message: "User not found" });
      }

      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ message: "No internet connection or Slow internet connection" });
        }

        if (!match) {
          console.log("Incorrect password");
          return res.status(401).send({ message: "Incorrect password" });
        }

        const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
        console.log("User signed in successfully");
        res.send({
          message: "User signed in successfully",
          status: true,
          user: user,
          token: token,
        });
      });
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).send({ message: "Internal server error" });
    });
};


const eventDetails = (req, res) =>[
  console.log(req.body)
]

module.exports = {
  register,
  verifyToken,
  login,
  eventDetails,
};

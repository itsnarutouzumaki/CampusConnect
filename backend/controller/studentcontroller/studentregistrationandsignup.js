const multer = require("multer");
const item2 = require("../../models/studentschema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiresponse = require("../../utils/apiresponse.js");


const checkUserExists = async (req, res, next) => {
  const email = req.body.email;
  try {
    const student = await item2.findOne({ email: email });
    if (student) {
      return res.status(400).send("User already exists");
    }
    next();
  } catch (err) {
    res.status(500).send("Server error");
  }
};



const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  const data = new item2(req.body);
  const saveddata = await data.save();
  const token = jwt.sign({ _id: saveddata._id }, "aa12aa3aa4", {
    expiresIn: "1h",
  });
  res.json(
    new apiresponse(200, { saveddata, token }, "User registered successfully")
  );
};


const login = async (req, res) => {
  const { email, password } = req.body;
  const student = await item2.findOne({ email });
  if (!student) {
    return res.status(400).send("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, student.password);
  if (!isMatch) {
    return res.status(400).send("Invalid email or password");
  }
  const token = jwt.sign({ _id: student._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json(
    new apiresponse(200, { student, token }, "User logged in successfully")
  );
};
const userdetails = async (req, res) => {
  const details = await item2.findOne({ email: req.body.email });
  res.json(new apiresponse(200, "User details", { details }));

};
const updatedetails = async (req, res) => {
  const details = await item2.findOneAndUpdate(
    { email: req.body.email },
    { $set: req.body },
    { new: true }
  );
  res.json(new apiresponse(200, "User details updated", { details }));
};

module.exports = {
  signup,
  checkUserExists,
  login,
  userdetails,
  updatedetails,
};

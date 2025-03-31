const Teacher = require("../../models/teacherschema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiResponse = require("../../utils/apiresponse.js");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();

const checkUserExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (teacher) {
      return res.status(400).send("User already exists");
    }
    next();
  } catch (err) {
    res.status(500).send("Server error");
  }
};

//signup
const signup = async (req, res) => {
  let { name, email, password } = req.body; // exluded mobile NO
  const hashedPassword = await bcrypt.hash(password, 10);
  let username = name.toLowerCase().replace(/\s+/g, "");
  const randomString = Math.random().toString(36).substring(2, 7);
  username += randomString;
  try {
    let teacher = await Teacher.create({
      name,
      email,
      username: username,
      password: hashedPassword,
    });
    const token = jwt.sign({ _id: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json(
      new ApiResponse(201, { teacher, token }, "teacher created successfully")
    );
  } catch (err) {
    console.log(err);
    return res.json({ status: "failed", message: "error", err });
  }
};

//login
const login = async (req, res) => {
  let { email, username, password } = req.body;
  try {
    let teacher = await Teacher.findOne({ $or: [{ email }, { username }] });
    if (!teacher) {
      return res.json({ message: "teacher not found" });
    }
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.json({ message: "password is incorrect" });
    }
    const token = jwt.sign({ _id: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json(
      new ApiResponse(200, { teacher, token }, "teacher logged in successfully")
    );
  } catch (err) {
    console.log(err);
    return res.json({ message: "error", err });
  }
};

// update teacher details
const updatedetails = async (req, res) => {
  const teacherId =new mongoose.Types.ObjectId(req.body.teacher_id); 
  const teacher=await Teacher.findOneAndUpdate({_id:teacherId},
   { $set:req.body}, {new:true});

   return res.json(
    new ApiResponse(200, { teacher }, "teacher details updated successfully"));
}

module.exports = { signup, login, checkUserExists,updatedetails };

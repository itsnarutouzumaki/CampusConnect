const multer = require("multer");
const item2 = require("../../models/studentschema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiresponse = require("../../utils/apiresponse.js");
const { default: mongoose } = require("mongoose");

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

  // Generate JWT token
  const token = jwt.sign({ _id: student._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Store token in HTTP-only cookie
  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
    domain: "localhost",
  });

  res.json(new apiresponse(200, { student }, "User logged in successfully"));
};

const logout = (req, res) => {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      domain: "localhost",
    });
    res.json(new apiresponse(200, null, "User logged out successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new apiresponse(500, null, "Server error during logout"));
  }
};

const userdetails = async (req, res) => {
  const details = await item2.findOne({ email: req.body.email });
};

const updatedetails = async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.body.student_id);
  const details = await item2.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true }
  );
  res.json(new apiresponse(200, "User details updated", { details }));
};
const changePassword = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.body.student_id);
    const details = await item2.findOne({ _id: id });

    if (!details) {
      return res.json(new apiresponse(404, null, "User not found"));
    }

    const isMatch = await bcrypt.compare(req.body.password, details.password);
    if (!isMatch) {
      return res.json(new apiresponse(400, null, "Incorrect password"));
    }

    const newPassword = await bcrypt.hash(req.body.newpassword, 10);

    const updatedUser = await item2.findOneAndUpdate(
      { _id: id },
      { $set: { password: newPassword } },
      { new: true } // Ensures the updated document is returned
    );

    return res.json(new apiresponse(200, updatedUser, "Password updated successfully"));
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json(new apiresponse(500, null, "Internal server error"));
  }
};


module.exports = {
  logout,
  signup,
  checkUserExists,
  login,
  userdetails,
  updatedetails,
  changePassword,
};

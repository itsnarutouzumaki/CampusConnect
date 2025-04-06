const Teacher = require("../../models/teacherschema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiResponse = require("../../utils/apiresponse.js");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const Admin=require("../../models/admin.js");
const Course=require("../../models/courseschema.js");
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
  let { email, password } = req.body;
  console.log(email,password);
  try {
    let teacher = await Teacher.findOne({ email:email});
    if (!teacher) {
      return res.json({ message: "teacher not found" });
    }
    const isMatch = await bcrypt.compare(password,teacher.password);
    
    if (!isMatch) {
      return res.json({ message: "password is incorrect" });
    }
    const token = jwt.sign({ _id: teacher._id }, process.env.JWT_SECRET, {
    });
    console.log(token);
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
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
  if(req.file && req.file.path)
  {
    req.body.profileImage=req.file.path;
  }
  const teacher=await Teacher.findOneAndUpdate({_id:teacherId},
   { $set:req.body}, {new:true});
   return res.json(
    new ApiResponse(200, { teacher }, "teacher details updated successfully"));
}
const removeteacher=async(req,res)=>
{
 console.log(req.body);

  const data=await Admin.findOne({password:req.body.password});
  if(!data)
  {
    return res.json(new ApiResponse(200, { data:"you are not authorized to delete the message"}, "deletion failed"));
  }
  const updatecourse=await Course.updateMany({coordinator:req.body.email},
    {$set:{
      coordinator:data.email,
      coordinator_name:data.name
    }}
  );
  const removecourse=await Teacher.deleteOne({email:req.body.email});
  return res.json(new ApiResponse(200, { removecourse }, "teacher removed successfully")
);
}
const changePassword=async (req,res)=>{
  const id=new mongoose.Types.ObjectId(req.body.teacher_id);
  const details=await Teacher.findOne({_id:id});
  const isMatch = await bcrypt.compare(req.body.password,details.password);
  if(!isMatch)
  {
    return res.json(new ApiResponse(200,details ,"password change failed due to incorrect password entered"));
  }
  const newpassword=await bcrypt.hash(req.body.newpassword, 10);
  const data=Teacher.findOneAndUpdate({_id:id},{$set:{
    password:newpassword
  }});
  return res.json(new ApiResponse(200,data ,"Teacher details updated"));
}
const getTeacher=async(req,res)=>
{
  const id=new mongoose.Types.ObjectId(req.body.teacherId);
  const data=await Teacher.findOne({_id:id});
  return res.json(new ApiResponse(200,data ,"Teacher details fetched"));
}
const logout = (req, res) => {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    
    });
    res.json(new ApiResponse(200, null, "User logged out successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, null, "Server error during logout"));
  }
};
module.exports = { signup, login, checkUserExists,updatedetails,removeteacher,changePassword,getTeacher,
  logout
};

const multer = require("multer");
const item2 = require("../../models/studentschema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiresponse = require("../../utils/apiresponse.js");
const { default: mongoose } = require("mongoose");
const studentquiz = require("../../models/studentquizschema.js");
const Assignment=require("../../models/assignmentSchema.js");
const Quiz=require("../../models/quizschema.js");
const studentenrolled = require("../../models/studentenrolled.js");

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

const studentProgress=async(req,res)=>
{
  const id=new mongoose.Types.ObjectId(req.body.studentId);
 const pipeline= [
  {
    "$match":
    {
      "studentid":id
    }
  },
    {
      "$sort": { "createdAt": -1 }  // Sort in descending order (latest first)
    }
  ];
  const data=await studentquiz.aggregate(pipeline);
  const finaldata=[];
  let count=0,sum=0;
  
  for(let i=0;i<data.length;i++)
  {
    const num1 = parseInt(data[i].total_marks, 10),num2 = parseInt(data[i].marks, 10);
    count=count+num1;
    sum=sum+num1*num2;
    finaldata.push(sum/count);
  }
  return res.json(new apiresponse(200, finaldata, "user progress fetched successfully"));
}
const upcomingTask=async(req,res)=>
{
  const id=new mongoose.Types.ObjectId(req.body.studentId);
  const findCourse=await studentenrolled.find({studentid:id});
  const finaldata=[];
  for(let j=0;j<findCourse.length;j++)
  {
    const courseId=new mongoose.Types.ObjectId(findCourse[j].course_id);
  const assignment=await Assignment.find({course:courseId});
  const Quiz=await Quiz.find({courseid:courseId});
  
  for(let i=0;i<assignment.length;i++)
  {
    const date=new Date();
    if(date<assignment[i].dueDate)
    {
      const {date,time}=assignment[i].dueDate.split("T");
    finaldata.push(
      {
       "name":assignment[i].title+" "+"Assignment",
       "id":assignment[i]._id,
       "dueDate":date,
       "dueTime": time
      }
    );
  }
  
}
for(let i=0;i<Quiz.length;i++)
  {
    const date=new Date();
    if(Quiz[i].length>date)
    {
      const {date1,time}=Quiz[i].quizDate.split("T");
      finaldata.push({
        "name":Quiz[i].title,
        "id":QUiz[i]._id,
        "date":date1,
        time:time
      });
    }
  }
    
  }
return res.json(new apiresponse(200, finaldata, "upcoming schedule fetched successfully"));
}
module.exports = {
  upcomingTask,
  studentProgress,
  logout,
  signup,
  checkUserExists,
  login,
  userdetails,
  updatedetails,
  changePassword,
};

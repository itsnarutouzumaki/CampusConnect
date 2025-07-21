const multer = require("multer");
const item2 = require("../../models/studentschema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiresponse = require("../../utils/apiresponse.js");
const { default: mongoose } = require("mongoose");
const studentquiz = require("../../models/studentquizschema.js");
const Assignment = require("../../models/assignmentSchema.js");
const Quiz = require("../../models/quizschema.js");
const studentenrolled = require("../../models/studentenrolled.js");
const mailSender = require("../../utils/sendMail.js");

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

  if (!fullname || !email || !password) {
    new apiresponse(401, {}, "All field are required");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  const data = new item2(req.body);
  const saveddata = await data.save();
  const token = jwt.sign({ _id: saveddata._id }, "aa12aa3aa4", {});
  const verifyToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.MAIL_TOKEN_EXPIRY,
  });

  const user = await item2.findOne({ email }, { password: 0 });


  const link = `${process.env.FRONTEND_URL}/students/verify/${verifyToken}`;
  await mailSender(email, "Verify Account", link);

  res.json(
    new apiresponse(200,user, "User registered successfully")
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const student = await item2.findOne({ email });

  if (!student) {
    return res.status(400).send("Invalid email or password");
  }
  if (!student.verified) {
    const verifyToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.MAIL_TOKEN_EXPIRY,
    });
    const link = `${process.env.FRONTEND_URL}/students/verify/${verifyToken}`;
    await mailSender(email, "Verify Account", link);
    return res.status(401).send("Please verify your email before logging in");
  }

  const isMatch = await bcrypt.compare(password, student.password);

  if (!isMatch) {
    return res.status(400).send("Invalid email or password");
  }

  // Generate JWT token
  const token = jwt.sign({ _id: student._id }, process.env.JWT_SECRET, {});

  // Store token in HTTP-only cookie
  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: true, // true ensures cookies are sent over HTTPS only
    sameSite: "None", // allow cross-site cookies (e.g., frontend & backend hosted on different domains)
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

    return res.json(
      new apiresponse(200, updatedUser, "Password updated successfully")
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return res
      .status(500)
      .json(new apiresponse(500, null, "Internal server error"));
  }
};

const combinedStudentData = async (req, res) => {
  try {
    const studentId = new mongoose.Types.ObjectId(req.body.studentId);

    const result = {
      progress: [],
      upcomingTasks: [],
      userDetails: null,
      studyGoals: [],
    };

    // 1. Student Progress
    const progressPipeline = [
      { $match: { studentid: studentId } },
      { $sort: { createdAt: -1 } },
    ];

    const quizData = await studentquiz.aggregate(progressPipeline);
    let count = 0,
      sum = 0;
    for (let i = 0; i < quizData.length; i++) {
      const total = parseInt(quizData[i].total_marks, 10);
      const obtained = parseInt(quizData[i].marks, 10);
      count += total;
      sum += total * obtained;
      result.progress.push(sum / count);
    }

    // 2. Upcoming Tasks (Assignments and Quizzes)
    const enrolledCourses = await studentenrolled.find({
      student_id: studentId,
    });

    for (let course of enrolledCourses) {
      const courseId = new mongoose.Types.ObjectId(course.course_id);

      // Assignments
      const assignments = await Assignment.find({ course: courseId });
      for (let assignment of assignments) {
        const currentDate = new Date();
        if (currentDate < assignment.dueDate) {
          const [date, time] = assignment.dueDate.toISOString().split("T");
          result.upcomingTasks.push({
            name: assignment.title + " Assignment",
            id: assignment._id,
            dueDate: date,
            dueTime: time,
          });
        }
      }

      // Quizzes
      const quizzes = await Quiz.find({ courseid: courseId });
      console.log(quizzes.length);
      for (let quiz of quizzes) {
        const currentDate = new Date();
        if (new Date(quiz.quizDate) > currentDate) {
          const [date, time] = quiz.quizDate.toISOString().split("T");
          result.upcomingTasks.push({
            name: quiz.title + " Quiz",
            id: quiz._id,
            dueDate: date,
            dueTime: time,
          });
        }
      }
    }

    // 3. User Details
    const userDetails = await item2.findOne({ _id: studentId });
    result.userDetails = userDetails;
    for (let i = 0; i < userDetails.studyGoals.length; i++) {
      result.studyGoals.push({
        goal: userDetails.studyGoals[i],
        id: i,
        progress: "2/5",
      });
    }
    return res.json(
      new apiresponse(200, result, "Combined student data fetched successfully")
    );
  } catch (error) {
    console.error("Error in combinedStudentData:", error);
    return res
      .status(500)
      .json(new apiresponse(500, null, "Internal Server Error"));
  }
};

const studentProgress = async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.body.studentId);
  const pipeline = [
    {
      $match: {
        studentid: id,
      },
    },
    {
      $sort: { createdAt: -1 }, // Sort in descending order (latest first)
    },
  ];
  const data = await studentquiz.aggregate(pipeline);
  const finaldata = [];
  let count = 0,
    sum = 0;

  for (let i = 0; i < data.length; i++) {
    const num1 = parseInt(data[i].total_marks, 10),
      num2 = parseInt(data[i].marks, 10);
    count = count + num1;
    sum = sum + num1 * num2;
    finaldata.push(sum / count);
  }
  return res.json(
    new apiresponse(200, finaldata, "user progress fetched successfully")
  );
};
const upcomingTask = async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.body.studentId);
  const findCourse = await studentenrolled.find({ studentid: id });
  const finaldata = [];
  for (let j = 0; j < findCourse.length; j++) {
    const courseId = new mongoose.Types.ObjectId(findCourse[j].course_id);
    const assignment = await Assignment.find({ course: courseId });
    const Quiz = await Quiz.find({ courseid: courseId });

    for (let i = 0; i < assignment.length; i++) {
      const date = new Date();
      if (date < assignment[i].dueDate) {
        const { date, time } = assignment[i].dueDate.split("T");
        finaldata.push({
          name: assignment[i].title + " " + "Assignment",
          id: assignment[i]._id,
          dueDate: date,
          dueTime: time,
        });
      }
    }
    for (let i = 0; i < Quiz.length; i++) {
      const date = new Date();
      if (Quiz[i].length > date) {
        const { date1, time } = Quiz[i].quizDate.split("T");
        finaldata.push({
          name: Quiz[i].title,
          id: QUiz[i]._id,
          date: date1,
          time: time,
        });
      }
    }
  }
  return res.json(
    new apiresponse(200, finaldata, "upcoming schedule fetched successfully")
  );
};
const userdetails = async (req, res) => {
  const details = await item2.findOne({ email: req.body.email });
};
const addgoals = async (req, res) => {
  const data = req.body.goal;
  const id = new mongoose.Types.ObjectId(req.body.studentId);
  const data2 = await item2.findOne({ _id: id });
  const studyGoals = data2.studyGoals;
  studyGoals.push(data);
  const update = await item2.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        studyGoals: studyGoals,
      },
    }
  );
  return res.json(new apiresponse(200, update, "goals updated successfully"));
};
const removegoals = async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.body.studentId);
  const data2 = await item2.findOne({ _id: id });
  const studyGoals = data2.studyGoals;
  studyGoals.splice(req.body.index, 1);
  const update = await item2.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        studyGoals: studyGoals,
      },
      new: true,
    }
  );
  return res.json(new apiresponse(200, update, "goals updated successfully"));
};
const removeStudent = async (req, res) => {
  const data = await item2.findOneAndDelete({ email: req.body.email });
  return res.json(new apiresponse(200, data, "goals updated successfully"));
};

const verifyEmail = async (req, res) => {
  const { verifyToken } = req.params;
  try {
    const decoded = jwt.verify(verifyToken, process.env.JWT_SECRET);
    const email = decoded.email;
    if (!email) {
      return res.status(400).json(new apiresponse(400, null, "Invalid token"));
    }
    // Update user status to verified
    await item2.updateOne({ email: email }, { $set: { isVerified: true } });

    res
      .status(200)
      .json(new apiresponse(200, null, "Email verified successfully"));
  } catch (error) {
    console.error("Error verifying email:", error);
    res
      .status(400)
      .json(new apiresponse(400, null, "Invalid or expired verification link"));
  }
};

module.exports = {
  removeStudent,
  addgoals,
  removegoals,
  upcomingTask,
  studentProgress,
  logout,
  signup,
  checkUserExists,
  login,
  userdetails,
  updatedetails,
  changePassword,
  combinedStudentData,
  verifyEmail,
};

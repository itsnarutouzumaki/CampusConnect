const mongoose = require("mongoose");
const Course = require("../models/courseschema.js");
const ApiResponse = require("../utils/apiresponse.js");
const studentenrolled = require("../models/studentenrolled.js");
const { findById } = require("../models/teacherschema.js");
const teacher = require("../models/teacherschema.js");
const { response } = require("express");
const Assignment=require("../models/assignmentSchema.js");
const {Chapter,Lecture}=require("../models/chapterLectureSchema.js");
const StudentQuiz=require("../models/studentquizschema.js");
const StudentEnrolled=require("../models/studentenrolled.js");

let uploadedFile = null;
// add a course
const addCourse = async (req, res) => {
  let {
    title,
    courseId,
    coordinator,
    startDate,
    expiryDate,
    description,
    pdfLink,
    price,
    coordinator_name,
  } = req.body;
  console.log({
    title,
    courseId,
    coordinator,
    startDate,
    expiryDate,
    description,
    pdfLink,
    price,
  });
  if (
    !title ||
    !courseId ||
    !coordinator ||
    !startDate ||
    !expiryDate ||
    !description ||
    !pdfLink ||
    !price
  ) {
    return res.json(new ApiResponse(400, "Please fill all the fields"));
  }

  if (!req.file) {
    return res.json(new ApiResponse(200, {}, "No file uploaded"));
  }
  uploadedFile = req.file.path;
  if (expiryDate < startDate) {
    return res.json(
      new ApiResponse(400, "expiry date should be greater than start date")
    );
  }
  if (price < 0) {
    return res.json(new ApiResponse(400, "price should be greater than 0"));
  }

  const isPresent = await Course.findOne({ courseId });
  if (isPresent) {
    return res.json(new ApiResponse(400, {}, "Course already exists"));
  }
  const data = await teacher.findOne({ email: coordinator });
  if (!data) {
    return res.json(new ApiResponse(400, {}, "Coordinator does not exist"));
  }

  try {
    const startDate1 = new Date(startDate);
    const expiryDate1 = new Date(expiryDate);
    const course = await Course.create({
      title,
      courseId,
      coordinator,
      startDate: startDate1,
      expiryDate: expiryDate1,
      description,
      pdfLink,
      price,
      image: uploadedFile,
      coordinator_name: data.name,
    });
    return res.json(
      new ApiResponse(200, course, "Course created successfully")
    );
  } catch (err) {
    return res.json(
      new ApiResponse(400, err.message, "Course creation failed")
    );
  }
};

// get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.json(
      new ApiResponse(200, courses, "courses fetched successfully")
    );
  } catch (err) {
    return res.json(new ApiResponse(400, err, err.message));
  }
};

//upload image
const uploadImg = (req, res) => {
  // console.log('File received:', req.file); // Debugging

  if (!req.file) {
    return res.json(new ApiResponse(200, {}, "No file uploaded"));
  }

  uploadedFile = req.file.path;

  return res.json(
    new ApiResponse(200, { image: uploadedFile }, "File uploaded successfully")
  );
};
const getAllCoursesData = async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date
    // Fetch enrolled courses
    const enrolledPipeline = [
      { $match: { student_id: req.body._id } },
      {
        $lookup: {
          from: "courses",
          localField: "course_id",
          foreignField: "_id",
          as: "details",
        },
      },
      { $unwind: "$details" },
      { $replaceRoot: { newRoot: "$details" } },
    ];
    const enrolledCourses = await studentenrolled.aggregate(enrolledPipeline);
    // Fetch live courses
    const livePipeline = [
      {
        $match: {
          startDate: { $lte: currentDate },
          expiryDate: { $gte: currentDate },
        },
      },
    ];
    const liveCourses = await Course.aggregate(livePipeline);
    // Fetch upcoming courses
    const upcomingPipeline = [{ $match: { startDate: { $gt: currentDate } } }];
    const upcomingCourses = await Course.aggregate(upcomingPipeline);
    // Return response after fetching all data sequentially
    return res.json(
      new ApiResponse(
        200,
        {
          enrolled: enrolledCourses,
          live: liveCourses,
          upcoming: upcomingCourses,
        },
        "All course data retrieved"
      )
    );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Error fetching course data"));
  }
};
const enrollStudent = async (req, res) => {
  const student_id = req.body.student_id;
  const course_id = new mongoose.Types.ObjectId(req.body.course_id);
  console.log({ student_id, course_id });
  try {
    const enrollment_data = new studentenrolled({
      student_id: student_id.toString(),
      course_id: course_id,
    });
    const enrollment = await enrollment_data.save();
    return res.json(
      new ApiResponse(200, enrollment, "Student enrolled successfully")
    );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Error enrolling student"));
  }
};

// isEnrolled
const isEnrolled = async (req, res) => {
  console.log(req.params.courseId);
 
  const courseId = new mongoose.Types.ObjectId(req.params.courseId);
  const course = await Course.findById(courseId);
  const studentId = req.params.studentId;
  const studentEnrolled = await studentenrolled.findOne({
    course_id: courseId,
    student_id: studentId,
  });
  if (!studentEnrolled) {
    return res.json(
      new ApiResponse(200, { isEnrolled: "false", course }, "student")
    );
  } else {
    return res.json(
      new ApiResponse(200, { isEnrolled: "true", course }, "student")
    );
  }
};
const updatecourse=async(req,res)=>{
  const courseid=new mongoose.Types.ObjectId(req.body.course_id);
  const actualdate=new Date(req.body.expiryDate);
 req.body.expiryDate=actualdate;
 console.log(req.body.expiryDate);
  const data=await Course.findOneAndUpdate({_id:courseid},
    {$set:req.body},
    {new:true}
  )
  res.json(
    new ApiResponse(200, data, "course updated successfully")
);
}
const updatedetails = async (req, res) => {
  const data = await teacher.findOne({ email: req.body.coordinator });
  const courseId = new mongoose.Types.ObjectId(req.body.courseId);
  const coordinator = req.body.coordinator;
  const course = new mongoose.Types.ObjectId(req.body.courseId);

  const coursedetails = await Course.findOneAndUpdate(
    {
      _id: course,
    },
    {
      $set: {
        coordinator_name: data.name,
        coordinator: coordinator,
      },
    }
  );
  response.json(
    new ApiResponse(200, coursedetails, "course updated successfully")
  );
};
const removecourse=async(req,res)=>
{try{
  const id=new mongoose.Types.ObjectId(req.body.course_id);
  const removeAssignment=await Assignment.deleteMany({course:id});
  const findstudentwithquiz=await Quiz.find({courseid:id});
  for(let i=0;i<findstudentwithquiz.length;i++)
  {const quizid=new mongoose.Types.ObjectId(findstudentwithquiz[i]._id);
    await StudentQuiz.deleteMany({quizid:quizid});
  }
  const remmovequiz=await Quiz.deletMany({courseid:id});
const removeenrolledstudent=await StudentEnrolled.deleteMany({courseid:id});
const removelecture=await Lecture.deleteMany({course:id});
const removechapter=await Chapter.deleteMany({course:id});
  const removecourses=await Course.deleteMany({_id:id});
  return res.json(   new ApiResponse(200, removecourses, "course deleted successfully")
);
}
catch(e)
{
  console.log(e);
}
}
module.exports = {
  addCourse,
  uploadImg,
  getAllCoursesData,
  enrollStudent,
  isEnrolled,
  updatedetails,
  updatecourse,
  removecourse
};

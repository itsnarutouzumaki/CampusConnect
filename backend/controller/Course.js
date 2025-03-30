const mongoose = require('mongoose');
const Course = require('../models/courseschema.js');
const response=require('../utils/apiresponse.js');
const studentenrolled=require('../models/studentenrolled.js'); 

// add a course
const addCourse = async (req, res) => {
    let { title,courseId,coordinator,startDate,expiryDate,description,pdfLink} = req.body;
    const isPresent=Course.findById({courseId});
    if(isPresent){
      return res.json({status:'failed',message:'course is already present '});
    }
    try{
       const course = await Course.create({ title,courseId,coordinator,startDate,expiryDate,description,pdfLink});
       return res.json(new response(200,data,'Course created successfully'));
   }
   catch(err){
        return res.json({status:'failed',message:'error',err:err.message});
    }
};

// get all courses
const getAllCourses = async (req, res) => {
    try{
        const courses=await Course.find();
        return res.json(new response(200,courses,"courses fetched successfully"));
    }catch(err){
        return res.json({status:'failed',message:'error',err});
    }
};

const getCoursesByEnrolled=async(req,res)=>{
 const data=[
    {
      $match: {
        student_id:req.student_id
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course_id",
        foreignField: "_id",
        as: "details",
      },
    },
    {
      $unwind: {
        path: "$details",
      },
    },
    {
      $replaceRoot: {
      newRoot: "$details",
      },
    },
  ]  ;
  const d=await studentenrolled.aggregate(data);
  return  res.json(new response(200, 'Course data retrived', d));
}
const  getCoursesByLive=async(req,res)=>{
  const currentDate = new Date(); // Get the current date

  const pipeline = [
    {
      $match: {
        start_date: { $lte: currentDate }, // start_date <= currentDate
        end_date: { $gte: currentDate }    // end_date >= currentDate
      }
    }
  ];
  const data=await Course.aggregate(pipeline);
  return res.json(new response(200, 'Course data retrived', data));
}
const getCoursesByUpcoming=async(req,res)=>{
    const data=[{
        $unwind:{
          path:"$isActive"
        },
      },
       {
         $match:{
           isActive:"upcoming"
         }
       }];
       const d=await Course.aggregate(data);
       return res.json(new response(200, 'Course data retrived', d));
}
const enrollStudent=async (req, res) => {
    const { student_id, course_id } = req.body;
    if (!student_id || !course_id) {
        return res.status(400).json({status: 'failed', message: 'Missing required fields'});
    }
    try{
      const course=new mongoose.Types.ObjectId(course_id);  
        const enrollment = new studentenrolled({ student_id,course});
        await enrollment.save();
        return res.json(new response(200, {enrollment},'Student enrolled successfully'));
    } catch(err) {
        return res.json({status:'failed',message:'error',err});
    }
}
module.exports = { addCourse, getAllCourses ,getCoursesByEnrolled,getCoursesByLive,getCoursesByUpcoming,
  enrollStudent
};  

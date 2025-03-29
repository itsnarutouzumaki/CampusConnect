const mongoose = require('mongoose');
const Course = require('../models/courseschema.js');
const response=require('../utils/apiresponse.js');
const studentenrolled=require('../models/studentenrolled.js');  
const addCourse = async (req, res) => {
    let { title, courseId, description, price, tutor} = req.body;
    if (!title || !courseId || !description || !price || !tutor) {
        return res.status(400).json({status: 'failed', message: 'Missing required fields'});
    }
    if (!courseId) {
        return res.status(400).json({ status: 'failed', message: 'courseId is required' });
    }
    try{
    const course=new Course(req.body);
       const data=await course.save();
       return res.send({status:'success',message:'course added successfully',course:data});
   }
   catch(err){
        return res.json({status:'failed',message:'error',err:err});
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
    const data=[{
        $unwind:{
          path:"$isActive"
        },
      },
       {
         $match:{
           isActive:"live"
         }
       }];
       const d=await Course.aggregate(data);
       return res.json(new response(200, 'Course data retrived', d));
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
module.exports = { addCourse, getAllCourses ,getCoursesByEnrolled,getCoursesByLive,getCoursesByUpcoming};  

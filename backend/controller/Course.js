const mongoose = require('mongoose');
const Course = require('../models/courseschema.js');
const ApiResponse=require('../utils/apiresponse.js');
const studentenrolled=require('../models/studentenrolled.js'); 
let uploadedFile=null;
// add a course
const addCourse = async (req, res) => {
    let { title,courseId,coordinator,startDate,expiryDate,description,pdfLink,price} = req.body;
    console.log({title,courseId,coordinator,startDate,expiryDate,description,pdfLink,price});
    if (!title || !courseId || !coordinator || !startDate || !expiryDate || !description || !pdfLink || !price) {
        return res.json(new ApiResponse(400,'Please fill all the fields'));
    }

    if (!req.file) {
      return res.json(new ApiResponse(200,{},'No file uploaded'));
  }

  
  uploadedFile = req.file.path;  
  
    if(expiryDate<startDate){
        return res.json(new ApiResponse(400,'expiry date should be greater than start date'));
    }

    if(price<0){
        return res.json(new ApiResponse(400,'price should be greater than 0'));
    }

    const isPresent = await Course.findOne({courseId});
    if (isPresent) {
        return res.json(new ApiResponse(400,{},'Course already exists'));
    }

    try{
       const course = await Course.create({ title,courseId,coordinator,startDate,expiryDate,description,pdfLink,price,image:uploadedFile});
       return res.json(new ApiResponse(200,course,'Course created successfully'));
   }
   catch(err){
        return res.json(new ApiResponse(400,err.message,'Course creation failed'));
    }
};

// get all courses
const getAllCourses = async (req, res) => {
    try{
        const courses=await Course.find();
        return res.json(new ApiResponse(200,courses,"courses fetched successfully"));
    }catch(err){
        return res.json(new ApiResponse(400,err,err.message));
    }
};

//upload image
const uploadImg = (req, res) => {
  // console.log('File received:', req.file); // Debugging

  if (!req.file) {
      return res.json(new ApiResponse(200,{},'No file uploaded'));
  }

  
  uploadedFile = req.file.path;  

  return res.json(new ApiResponse(200,{image: uploadedFile},'File uploaded successfully'));
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
  return  res.json(new ApiResponse(200, d,'Course data retrived'));
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
       return res.json(new ApiResponse(200, d, 'Course data retrived'));
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
       return res.json(new ApiResponse(200, d, 'Course data retrived'));
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
        return res.json(new ApiResponse(200, {enrollment},'Student enrolled successfully'));
    } catch(err) {
        return res.json(new ApiResponse(400,err,err.message));
    }
}
module.exports = { addCourse, getAllCourses ,uploadImg, getCoursesByEnrolled,getCoursesByLive,getCoursesByUpcoming,
  enrollStudent
};  

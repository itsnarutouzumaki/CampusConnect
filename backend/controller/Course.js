const mongoose = require('mongoose');
const Course = require('../models/courseschema.js');
const response=require('../utils/apiresponse.js');

// add a course
const addCourse = async (req, res) => {
    let { title, courseId, description, price, tutor} = req.body;
    if (!title || !courseId || !description || !price || !tutor) {
        return res.status(400).json({status: 'failed', message: 'Missing required fields'});
    }
    if (!courseId) {
        return res.status(400).json({ status: 'failed', message: 'courseId is required' });
    }
   // const course=await Course.findOne({courseId});
    // if(!course){
    //     return res.status(400).json({status:'failed',message:'course does not  exists'});
    // }
    try{
        const course=new Course(req.body);
       
        const data=await course.save();

        return res.send({status:'success',message:'course added successfully',course:data});
   }catch(err){
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


module.exports = { addCourse, getAllCourses };
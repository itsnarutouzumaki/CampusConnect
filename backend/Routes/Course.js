const express=require('express');
const {addCourse,getCourse}=require('../Controllers/Course');
const router=express.Router();

// add course
router.post('/add',addCourse);

//get all courses
router.get('/all',getCourse);

module.exports=router;
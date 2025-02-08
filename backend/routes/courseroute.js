const {addCourse,getAllCourses}=require('../controller/Course.js');
const express = require('express');
const router=express.Router();

router.post('/addcourse',addCourse);
router.get('/getallcourses',getAllCourses);

module.exports=router;
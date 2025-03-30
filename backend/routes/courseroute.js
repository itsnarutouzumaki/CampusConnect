const {addCourse,getAllCourses,uploadImg,getCoursesByEnrolled,getCoursesByUpcoming,
getCoursesByLive,enrollStudent
}=require('../controller/Course.js');
const jwttoken=require('../middleware/jwttoken.js');
const express = require('express');
const router=express.Router();
const upload=require('../middleware/uploadMiddleware.js');
router.post('/addcourse',upload.single('file'),addCourse);
router.get('/getallcourses',getAllCourses);
router.post('/uploadImg',upload.single('file'),uploadImg);
router.post('/CoursesByEnrolled',jwttoken.authenticateJWT,getCoursesByEnrolled);    
router.post('/courseByLive',jwttoken.authenticateJWT,getCoursesByLive);
router.post('/courseByUpcoming',jwttoken.authenticateJWT,getCoursesByUpcoming);
router.post('/enrollstudent',jwttoken.authenticateJWT,enrollStudent);
module.exports=router;
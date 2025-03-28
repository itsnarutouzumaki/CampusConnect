const {addCourse,getAllCourses,getCoursesByEnrolled,getCoursesByUpcoming,
    getCoursesByLive
}=require('../controller/Course.js');
const jwttoken=require('../middleware/jwttoken.js');
const express = require('express');
const router=express.Router();

router.post('/addcourse',addCourse);
router.get('/getallcourses',getAllCourses);
router.post('/CoursesByEnrolled',jwttoken.authenticateJWT,getCoursesByEnrolled);    
router.post('/courseByLive',jwttoken.authenticateJWT,getCoursesByLive);
router.post('/courseByUpcoming',jwttoken.authenticateJWT,getCoursesByUpcoming);

module.exports=router;
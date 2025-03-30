const {addCourse,uploadImg,getAllCoursesData
}=require('../controller/Course.js');
const jwttoken=require('../middleware/jwttoken.js');
const express = require('express');
const router=express.Router();
const upload=require('../middleware/uploadMiddleware.js');
router.post('/addcourse',upload.single('file'),addCourse);
router.post('/getallcourses',getAllCoursesData);
router.post('/uploadImg',upload.single('file'),uploadImg);

//router.post('/enrollstudent',jwttoken.authenticateJWT,enrollStudent);
module.exports=router;
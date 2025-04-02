const {addCourse,uploadImg,getAllCoursesData,enrollStudent,isEnrolled,updatecourse,removecourse,courseByTeacher
}=require('../controller/Course.js');
const jwttoken=require('../middleware/jwttoken.js');
const express = require('express');

const router=express.Router();
const upload=require('../middleware/uploadMiddleware.js');
const { editChapter } = require('../controller/ChapterAndLecture.js');
router.post('/addcourse',upload.single('file'),addCourse);
router.post('/getallcourses',getAllCoursesData);
router.put('/updatecourse',updatecourse);
router.post('/uploadImg',upload.single('file'),uploadImg);
router.post('/enrollstudent',enrollStudent);
router.post('/isEnrolled/:courseId/:studentId',isEnrolled);
router.post('/courseByTeacher',courseByTeacher);
router.delete('/removecourse',removecourse);

module.exports=router;
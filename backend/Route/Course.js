const express=require('express');
const {addCourse,getCourse,updateCourse,deleteCourse}=require('../Controller/Course');
const router=express.Router();

// add course
router.post('/add',addCourse);

//get all courses
router.get('/all',getCourse);

//update a course
router.put('/update/:id',updateCourse);

//delete a course
router.delete('/delete/:id',deleteCourse);

module.exports=router;
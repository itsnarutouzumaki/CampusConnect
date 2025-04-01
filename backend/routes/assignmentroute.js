const {addAssignment,getAllAssignments,editAssignment,uploadFile,submitAssignment,viewAssignment,deleteAssignment,viewAssignmentByTeacher} = require('../controller/Assignment');
const express = require('express');
const router=express.Router();
const upload=require('../middleware/uploadMiddleware');

router.post('/addAssignment',addAssignment);
router.post('/getAllAssignment',getAllAssignments);
router.put('/editAssignment',editAssignment);
router.post('/uploadFile',upload.single('file'),uploadFile);
router.post('/submitAssignment',submitAssignment);
router.get('/viewAssignment',viewAssignment);
router.delete('/deleteAssignment',deleteAssignment);
router.post('/viewAssignmentByTeacher',viewAssignmentByTeacher);
module.exports=router;
const {addAssignment,getAllAssignments,editAssignment,uploadFile,submitAssignment,viewAssignment} = require('../controller/Assignment');
const express = require('express');
const router=express.Router();
const upload=require('../middleware/uploadMiddleware');

router.post('/addAssignment',addAssignment);
router.get('/getAllAssignment',getAllAssignments);
router.put('/editAssignment',editAssignment);
router.post('/uploadFile',upload.single('file'),uploadFile);
router.post('/submitAssignment/:assignmentId',submitAssignment);
router.get('/viewAssignment/:assignmentId',viewAssignment);
module.exports=router;
const {addAssignment,getAllAssignments,editAssignment,uploadFile,submitAssignment,viewAssignment} = require('../controller/Assignment');
const express = require('express');
const upload=require('../middleware/uploadMiddleware');
const router=express.Router();

router.post('/addAssignment',addAssignment);
router.get('/getAllAssignment',getAllAssignments);
router.put('/editAssignment/:id',editAssignment);
router.post('/uploadFile',upload.single('file'),uploadFile);
router.post('/submitAssignment',submitAssignment);
router.get('/viewAssignment/:id',viewAssignment);
module.exports=router;
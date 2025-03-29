const {addAssignment,getAllAssignments,editAssignment} = require('../controller/Assignment');
const express = require('express');
const router=express.Router();

router.post('/addAssignment',addAssignment);
router.get('/getAllAssignment',getAllAssignments);
router.put('/editAssignment/:id',editAssignment);

module.exports=router;
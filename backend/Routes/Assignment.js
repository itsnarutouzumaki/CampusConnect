const express=require('express');
const {addAssignment,getAssignment}=require('../Controllers/Assignment')
const router=express.Router();

//add assignement
router.post('/add',addAssignment);

//get all assignments
router.get('/all',getAssignment);

module.exports=router;
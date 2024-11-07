const express=require('express');
const {addAssignment,getAssignment,updateAssignment,deleteAssignment}=require('../Controllers/Assignment')
const router=express.Router();

//add assignement
router.post('/add',addAssignment);

//get all assignments
router.get('/all',getAssignment);

//update an assignment 
router.put('/update/:id',updateAssignment);

//delete an assignment
router.delete('/delete/:id',deleteAssignment)
module.exports=router;
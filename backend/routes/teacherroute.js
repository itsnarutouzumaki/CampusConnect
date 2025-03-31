const {signup,login,checkUserExists,updatedetails}= require('../controller/teachercontroller/teacherloginandsignup');
const express = require('express');
const router=express.Router();

// signup
router.post('/signup',signup);
//login 
router.post('/login',login);
//update details
router.put('/updateDetails',updatedetails);
module.exports=router;
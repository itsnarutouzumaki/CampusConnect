const {signup,login,checkUserExists}= require('../controller/teachercontroller/teacherloginandsignup');
const express = require('express');
const router=express.Router();

// signup
router.post('/signup',signup);
//login 
router.post('/login',login);

module.exports=router;
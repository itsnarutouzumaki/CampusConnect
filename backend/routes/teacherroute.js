const {signup,login,checkUserExists,updatedetails}= require('../controller/teachercontroller/teacherloginandsignup');
const express = require('express');
const router=express.Router();
const upload = require('../middleware/uploadMiddleware.js');
// signup
router.post('/signup',signup);
//login 
router.post('/login',login);
//update details
router.put('/updateDetails',upload.single('file'),updatedetails);
module.exports=router;
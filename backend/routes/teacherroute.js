const {signup,login,checkUserExists,updatedetails,removeteacher,changePassword}= require('../controller/teachercontroller/teacherloginandsignup');
const express = require('express');
const router=express.Router();
const upload = require('../middleware/uploadMiddleware.js');
// signup
router.post('/signup',signup);
//login 
router.post('/login',login);
//update details
router.put('/updateDetails',upload.single('file'),updatedetails);
router.delete('/removeteacher',removeteacher);
router.post('/changepassword',changePassword);
module.exports=router;
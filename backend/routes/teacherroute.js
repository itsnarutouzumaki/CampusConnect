const {signup,login,checkUserExists,updatedetails,removeteacher,changePassword,getTeacher,
logout}= require('../controller/teachercontroller/teacherloginandsignup');
const express = require('express');
const router=express.Router();
const upload = require('../middleware/uploadMiddleware.js');
const jwttoken = require('../middleware/jwttoken.js');
// signup
router.post('/signup',signup);
//login 
router.post('/login',login);
//update details
router.put('/updateDetails',upload.single('file'),updatedetails);
router.delete('/removeteacher',removeteacher);
router.post('/changepassword',jwttoken.authenticateJWT,changePassword);
router.post('/getTeacher',jwttoken.authenticateJWT,getTeacher);
router.post('/teacherlogout',logout);
module.exports=router;
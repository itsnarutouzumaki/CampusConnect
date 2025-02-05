const express=require('express');
const router=express.Router();
const studentController=require('../controller/studentcontroller/studentregistrationandsignup.js');
router.get('/studentlogin',studentController.login);
router.post('/studentregister',studentController.checkUserExists,studentController.signup);
module.exports=router;
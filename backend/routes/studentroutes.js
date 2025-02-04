const express=require('express');
const router=express.Router();
const studentController=require('../controller/studentcontroller/studentregistrationandsignup.js');
router.get('/studentlogin',studentController.checkUserExists,studentController.signup);
router.post('/studentregister',studentController.login);
module.exports=router;
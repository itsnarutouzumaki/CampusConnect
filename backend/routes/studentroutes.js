const express=require('express');
const router=express.Router();
const studentController=require('../controller/studentcontroller/studentregistrationandsignup.js');
const jwt=require('../');
const studentmw=require('../middleware/jwttoken.js');

router.post('/studentlogin',studentController.login);
router.post('/studentregister',studentController.checkUserExists,studentController.signup);
router.post('/updatedetails',studentController.updatedetails);
router.post('/userdetails',studentController.userdetails);
router.post('/studentlogout',studentController.logout);
module.exports=router;
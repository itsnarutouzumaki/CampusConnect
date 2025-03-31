const express=require('express');
const router=express.Router();
const studentController=require('../controller/studentcontroller/studentregistrationandsignup.js');
const jwt=require('../');
const studentmw=require('../middleware/jwttoken.js');
const uplaod=require('../middleware/uploadMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');

router.post('/studentlogin',studentController.login);
router.post('/studentregister',studentController.checkUserExists,studentController.signup);
router.post('/updatedetails',upload.single('file'),studentController.updatedetails);
router.post('/userdetails',studentController.userdetails);
module.exports=router;
const express=require('express');
const router=express.Router();
const student=require('./studentroutes.js');
router.use('/students',student);
module.exports=router;
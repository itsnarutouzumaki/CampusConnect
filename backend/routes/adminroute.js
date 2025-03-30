const {login}=require('../controller/Admin');
const express=require('express');
const  router=express.router;
router.post('/login',login);
module.exports=router;
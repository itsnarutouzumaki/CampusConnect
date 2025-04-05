const {createOrder,verifyPayment,studentPurchase}=require('../controller/Payment');
const express=require('express');
const router=express.Router();
const jwt=require('../middleware/jwttoken');
router.post('/createOrder',jwt.authenticateJWT,createOrder);
router.post('/verifyPayment',jwt.authenticateJWT,verifyPayment);
router.post('/studentPurchase',jwt.authenticateJWT,studentPurchase);

module.exports=router;

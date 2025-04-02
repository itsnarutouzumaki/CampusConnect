const {createOrder,verifyPayment,studentPurchase}=require('../controller/Payment');
const express=require('express');
const router=express.Router();

router.post('/createOrder',createOrder);
router.post('/verifyPayment',verifyPayment);
router.post('/studentPurchase',studentPurchase);

module.exports=router;

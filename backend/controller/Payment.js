const { default: mongoose } = require('mongoose');
const instance=require('../config/razorpay');
const Payment=require('../models/payment');
const response=require('../utils/apiresponse');

//create order
const createOrder=async(req,res)=>{
    try{
        const {amount}=req.body;
    const studentId=new mongoose.Types.ObjectId(req.body.studentId);
    const courseId=new mongoose.Types.ObjectId(req.body.courseId);

    if (!studentId || !courseId) {
        return res.status(400).json({ error: "Invalid studentId or courseId" });
      }
    const option={
        amount:amount*100,
        currency:"INR",
        studentId:studentId,
        courseId:courseId,
        receipt:`receipt_${Date.now()}`
    }

    const order= await instance.orders.create(option);

    res.json(new response(200,{
        orderId:order.id,
        amount:amount,
        studentId:studentId,
        payStatus:"created"
    },'order created successfully'));
    }
    catch(err){
        console.log(err);
        return res.json(new response(500,{},'internal server error'));
    }
}

// verify payment
const verifyPayment=async(req,res)=>{
    try{
        const {orderId,paymentId,paymentSignature,orderAmount}=req.body;
    const studentId=new mongoose.Types.ObjectId(req.body.studentId);
    const courseId=new mongoose.Types.ObjectId(req.body.courseId);

    const payment=await Payment.create({orderId,paymentId,paymentSignature,orderAmount,studentId,courseId,payStatus:"paid"});

    if(!payment){
        return res.json(new response(400,{},'payment not done'));
    }

    return res.json(new response(200,payment,'payment done successfully'));
}
catch(err){
    console.log(err);
    return res.json(new response(500,{},'internal server error'));
}
    }

//student course purchase history
const studentPurchase=async(req,res)=>{
    try{
        const studentId=new mongoose.Types.ObjectId(req.params.studentId);
    const payment=await Payment.find({studentId:studentId});
    if(!payment){
        return res.json(new response(400,{},'this student has not purchase any course'));
    }
    return res.json(new response(200,payment,'student purchase history'));
    }
    catch(err){
        console.log(err);
        return res.json(new response(500,{},'internal server error'));
    }
}

module.exports={
    createOrder,
    verifyPayment,
    studentPurchase
}   
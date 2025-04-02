const { default: mongoose } = require('mongoose');
const instance=require('../config/razorpay');
const Payment=require('../models/payment');
const response=require('../utils/apiresponse');

//create order
const createOrder=async(req,res)=>{
    const {amount}=req.body;
    const studentId=new mongoose.Types.objectId(req.body.studentId);
    const courseId=new mongoose.Types.objectId(req.body.courseId);
    const option={
        amount:amount*100,
        currency:"INR",
        studentId:studentId,
        courseId:courseId,
        receipt:`receipt_${Date.now()}`
    }

    const order= await instance.orders.create(option);

    res.json({
        orderId:order.id,
        amount:amount,
        studentId:studentId,
        payStatus:"created"
    });
}

// verify payment
const verifyPayment=async(req,res)=>{
    const {orderId,paymentId,paymentSignature,orderAmount}=req.body;
    const studentId=new mongoose.Types.objectId(req.body.studentId);
    const courseId=new mongoose.Types.objectId(req.body.courseId);

    const payment=await Payment.create({orderId,paymentId,paymentSignature,orderAmount,studentId,courseId,payStatus:"paid"});

    if(!payment){
        return res.json(new response(400,{},'payment not done'));
    }

    return res.json(new response(200,payment,'payment done successfully'));
}

//student course purchase history
const studentPurchase=async(req,res)=>{
    const studentId=new mongoose.Types.objectId(req.params.studentId);
    const payment=await Payment.find({studentId:studentId});
    if(!payment){
        return res.json(new response(400,{},'this student has not purchase any course'));
    }
    return res.json(new response(200,payment,'student purchase history'));
}

module.exports={
    createOrder,
    verifyPayment,
    studentPurchase
}   
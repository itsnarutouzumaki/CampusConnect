import React,{useState,useEffect} from "react";
import axios from "axios";
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
import dotenv from "dotenv";
dotenv.config();
const handlePayment = async (amount) => {
    const studentId="djjdd";
    const courseId="djjjmksss"
    try{
        const orderResponse = await axios.post("http://localhost:8000/api/payment/createOrder", {
            amount: amount,
            studentId: studentId,
            courseId:courseId
        });

        console.log("order response", orderResponse);
        const { orderId, amount } = orderResponse.data;
    }
    catch(err){
        console.log(err);
    }


    const options = {
        "key": process.env.RazorPay_Key_ID, 
        "amount": amount * 100, 
        "name": "Campus Connect",
        "description": "Course purchase",
        // "image": "https://example.com/your_logo",
        "order_id": orderId, 
        "handler": async function (response){
            const paymentData={
                orderId:response.razorpay_order_id,
                paymentId:response.razorpay_payment_id,
                paymentSignature:response.razorpay_signature,
                studentId:studentId,
                courseId:courseId,
                orderAmount:amount
            }

            const api=await axios.post("http://localhost:8000/api/payment/verifyPayment",paymentData);
            console.log("payment response",api.data);
            //now do after payment process
        },
        "prefill": {
            "name": "Campus connect",
            "email": "campusConnect@example.com",
            "contact": "98999393939"
        },
        "notes": {
            "address": "MNNIT Allahabad"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
}
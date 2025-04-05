import React,{useState,useEffect} from "react";
import axios from "axios";
import { useLocation , useNavigate} from "react-router-dom";

import { useParams } from "react-router-dom";

const handlePayment = async (amount,courseId) => {
    try{
        const orderResponse = await axios.post("/api/payment/createOrder", {
            amount: amount,
            courseId:courseId
        });

        console.log("order response", orderResponse);
        const { orderId } = orderResponse.data;
   


    const options = {
        "key": import.meta.env.VITE_RazorPay_Key_ID, // Enter the Key ID generated from the Dashboard
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
                courseId:courseId,
                orderAmount:amount
            }

            const api=await axios.post("/api/payment/verifyPayment",paymentData);
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
catch(err){
    console.log(err);
}
};

const Payment = () => {
    const { courseId } = useParams();
    const location = useLocation();
    const {fullName,email,mobileNo,amount,courseName}=location.state || {};
    const handleClick = () => {
      handlePayment(amount, courseId); 
    };
  
    return (
        <>
        <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md border">
  <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Payment Summary</h2>

  <div className="space-y-4">
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Full Name:</span>
      <span>{fullName}</span>
    </div>
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Email:</span>
      <span>{email}</span>
    </div>
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Mobile Number:</span>
      <span>{mobileNo}</span>
    </div>
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Course Name:</span>
      <span>{courseName}</span>
    </div>
    <div className="flex justify-between pt-4 text-lg">
      <span className="font-semibold text-gray-800">Total Amount:</span>
      <span className="font-bold text-green-600">₹{amount}</span>
    </div>
  </div>
</div>
      <div className="container text-center my-5">
        <button
  onClick={handleClick}
  className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
>
  Proceed To Pay {}
</button>

      </div>
      </>
    );
  };
  
export default Payment;

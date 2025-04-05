import React, { useEffect } from "react";
import { useParams ,useNavigate, useLocation} from "react-router-dom";
import { useState } from "react";
import { use } from "react";

function PaymentPage() {
  const location = useLocation();
  const courseData = location.state||{};
  console.log(courseData);

      const navigate = useNavigate();
      
      const [email, setEmail] = useState("");
      const [mobileNo, setMobileNo] = useState("");
      const [fullName, setFullName] = useState("");
      const courseId=courseData.id;
      // const amount=location.state?.amount || 0;
      const [amount, setAmount] = useState();
      const [courseName, setCourseName] = useState("data Structures");
      useEffect(() => {
        setCourseName(courseData.title);
        setAmount(courseData.price);
      }, []);
      const handleSubmit = (event) => {
        event.preventDefault();
    
        const data = {
          fullName,
          email,
          mobileNo,
          amount,
          courseName
        };
        console.log(data);
        navigate(`/payment/${courseId}`, { state: data });
      };
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center px-4 py-8 gap-8">
      
      {/* Left Side - Course Details */}
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{courseName}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Includes:</strong> Data Structures & Algorithms + Web Development
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>{courseData.description}</li>
          <li>Complete Data Structures & Algorithms</li>
          <li>Live practice doubt classes for DSA</li>
          <li>Quant & Aptitude resources</li>
        </ul>
        <div className="mt-4 text-lg font-semibold text-orange-600">
          Price: ₹{amount}
        </div>
      </div>

      {/* Right Side - Payment Form */}
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Gateway</h2>
        <form className="space-y-4"
        onSubmit={handleSubmit}
        >
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
            <input
              name="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kamal@example.com"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Mobile Number</label>
            <input
              type="tel"
              name="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              placeholder="9876543210"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="kamal gurjar"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
          >
            Pay 
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;

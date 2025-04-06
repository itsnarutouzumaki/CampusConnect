import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";  
import toast from "react-hot-toast";
const ChangePassoword = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  const [formData,setFormData]=React.useState({
    password:"",
    newPassword:"",
    reTypeNewPassword:""  

  });
 
  const validateForm = () => {
    if (!formData.reTypeNewPassword.trim()) {
      setError("retypenewpassword is required");
      return false;
    }
    if(!formData.newPassword.trim())
    {
      setError("new password is required");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    if(!(formData.newPassword.trim()===formData.reTypeNewPassword.trim()))
    {
      setError("the retyped password and the new password do not match");
      return false;
    }
    return true;
  };
  const handleInputChange=(e)=>
    {
      const { name, value } = e.target;
     
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
      
    }
 const handleSubmit=async ()=>
 {
  if(!validateForm()) return ;
const response=await axios.post('/api/teachers/changepassword',
  {
    password:formData.password,
    newpassword:formData.newPassword
  }
  
);
console.log(response);
closeModal();
  }   
  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-gray-900 text-white p-6 rounded-lg max-w-lg w-full sm:w-[500px] z-50 flex flex-col text-center shadow-lg hover:border-2 hover:border-white hover:shadow-2xl hover:shadow-gray-500 transition-all justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-black underline text-white text-lg my-3">
          Change Password
        </h3>
        <input
          type="text"
          placeholder="Password"
          name="password"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.password}
          required
        />
        <input
          type="text"
          placeholder="New Password"
          name="newPassword"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.newPassword
          }
          required
        />
        <input
          type="text"
          name="reTypeNewPassword"
          placeholder="Repeat New Password"
          className="m-2 rounded-lg p-2 w-[80%] text-black"
          onChange={handleInputChange}
          value={formData.reTypeNewPassword}
          required
        />
        <button
          className="m-2 rounded-lg p-2 bg-blue-400 w-fit hover:bg-gradient-to-r from-[#ee7f7f] via-[#a377ae] to-[#7bdcd3] hover:text-black font-bold cursor-pointer"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
    </div>,
    document.querySelector(".myPortalModalDiv")
  );
};

export default ChangePassoword;

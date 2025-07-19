import React, { useEffect } from 'react'
import RotatingC from './Loading.jsx'

function VerifyAccount() {
  useEffect(() => {
    const { productid } = useParams();
    const verifyAccount = async () => {
      try {
        const response = await axios.get(`/api/students/verify/${productid}`);
        if (response.status === 200) {
          toast.success("Account verified successfully!", {
            position: "top-center",
            duration: 2000,
          });
          navigate("/loginsingup");
        }
        else {
          toast.error(response.message, {
            position: "top-center",
            duration: 2000,
          });
        }
      } catch (error) {
        console.error("Verification failed:", error);
        toast.error("Verification failed. Please try again.", {
          position: "top-center",
          duration: 2000,
        });
      }
    };  
    verifyAccount();
  }, []);
  
  return (
    <RotatingC/>
  )
}

export default VerifyAccount
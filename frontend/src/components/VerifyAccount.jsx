import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import RotatingC from "./Loading.jsx";

function VerifyAccount() {
  const [again, setAgain] = useState(false);
  const [email, setEmail] = useState("");
  const { resetlink } = useParams();
  const navigate = useNavigate();

  const verifyAccount = async () => {
    console.log("Verifying account with link:", resetlink);
    try {
      const response = await axios.get(`/api/students/verifyEmail/${resetlink}`);
      if (response.status === 200) {
        toast.success("Account verified successfully!", {
          position: "top-center",
          duration: 2000,
        });
        navigate("/loginsignup");
      } else if (response.status === 400) {
        toast.error("Account already verified!", {
          position: "top-center",
          duration: 2000,
        });
        navigate("/loginsignup");
      } else if (response.status === 404) {
        toast.error("Invalid verification link!", {
          position: "top-center",
          duration: 2000,
        });
        setAgain(true);
      } else {
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
      setAgain(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  const handleRetry = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.", {
        position: "top-center",
        duration: 2000,
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/students/resend-verification", { email });
      if (response.status === 200) {
        toast.success("Verification email sent!", {
          position: "top-center",
          duration: 2000,
        });
        setAgain(false);
        navigate("/loginsignup");
      } else {
        toast.error("Failed to resend verification email.", {
          position: "top-center",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("Failed to resend verification email.", {
        position: "top-center",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    again ? (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Verification Failed</h1>
        <p className="mb-4">Please enter your email to retry verification.</p>
        <form onSubmit={handleRetry} className="flex flex-col items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="mb-4 px-3 py-2 border rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </form>
      </div>
    ) : (
      <RotatingC />
    )
  );
}

export default VerifyAccount;

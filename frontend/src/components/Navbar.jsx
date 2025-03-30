import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BiMenu, BiX, BiChevronDown } from "react-icons/bi";
import Logo from "./Logo";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navbarRef = useRef(null);
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || null
  );
  const navigate = useNavigate();

  const handleOutsideClick = (e) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setIsOpen(false);
      setIsDropdownOpen(false);
    }
  };

  const handleLogoutRequest = async (e) => {
    e.preventDefault(); // Prevent default link behavior
    localStorage.removeItem("userName");
    setUserName(null);
    try {
      const response = await axios.get("/api/students/studentlogout");
      if (response.status === 200) {
        toast.success("Logout successful", {
          position: "top-center",
          duration: 2000,
        });
        navigate("/loginsignup");
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout.", {
        position: "top-center",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (isOpen || isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, isDropdownOpen]);

  const notLoggedInComponent = (
    <ul
      className={`flex flex-col bg-white/50 p-1 rounded-md md:absolute md:top-full md:left-0 md:w-max md:hidden md:group-hover:flex ${
        isDropdownOpen ? "block" : "hidden"
      }`}
    >
      <li key="login-signup" className="py-0.5 px-1">
        <Link
          to="/loginsignup"
          className="text-black no-underline hover:bg-white/30 hover:rounded-md px-1 py-0.5 w-full"
        >
          Login/SignUp
        </Link>
      </li>
    </ul>
  );

  const loggedInComponent = (
    <ul
      className={`flex flex-col bg-white/50 p-1 rounded-md md:absolute md:top-full md:left-0 md:w-max md:hidden md:group-hover:flex ${
        isDropdownOpen ? "block" : "hidden"
      }`}
    >
      <li key="profile" className="py-0.5 px-1">
        <Link
          to="/dashboard"
          className="text-black no-underline hover:bg-white/30 hover:rounded-md px-1 py-0.5"
        >
          Profile
        </Link>
      </li>
      <li key="profile" className="py-0.5 px-1">
        <Link
          to="/dashboard"
          className="text-black no-underline hover:bg-white/30 hover:rounded-md px-1 py-0.5"
        >
          Change Password
        </Link>
      </li>
      <li key="logout" className="py-0.5 px-1">
        <Link
          to="#"
          onClick={handleLogoutRequest}
          className="text-black no-underline hover:bg-white/30 hover:rounded-md px-1 py-0.5"
        >
          Logout
        </Link>
      </li>
    </ul>
  );

  return (
    <nav ref={navbarRef} className="w-full text-white relative z-10 px-2 py-1">
      <div className="flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl text-white cursor-pointer md:hidden"
        >
          {isOpen ? <BiX /> : <BiMenu />}
        </button>

        <div
          className={`flex flex-col absolute top-10 left-0 w-full p-1 md:bg-transparent md:flex md:flex-row md:static md:w-auto ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          <ul className="flex flex-col list-none p-0 m-0 md:flex-row md:items-center">
            <li key="course" className="py-0.5 px-1 md:px-2">
              <Link
                to="/course"
                className="text-white no-underline hover:bg-white/30 hover:rounded-md px-1 py-0.5"
              >
                Course
              </Link>
            </li>

            <li key="about" className="py-0.5 px-1 md:px-2">
              <Link
                to="/about"
                className="text-white no-underline hover:bg-white/30 hover:rounded-md px-1 py-0.5"
              >
                About
              </Link>
            </li>

            <li key="contact" className="py-0.5 px-1 md:px-2">
              <Link
                to="/contactUs"
                className="text-white no-underline hover:bg-white/30 hover:rounded-md px-1 py-0.5"
              >
                Contact
              </Link>
            </li>

            {/* Dropdown for login and profile */}
            <li
              key="dropdown"
              className="relative py-0.5 px-1 md:px-2 group"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="text-white flex items-center hover:bg-white/30 hover:rounded-md px-1 py-0.5 md:hover:bg-transparent">
                {userName == null ? "Login/SignUp" : userName} <BiChevronDown />
              </div>

              {userName == null ? notLoggedInComponent : loggedInComponent}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

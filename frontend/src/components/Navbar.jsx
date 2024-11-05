import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link
import { BiMenu, BiX, BiChevronDown } from "react-icons/bi";
import Logo from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navbarRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setIsOpen(false);
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen || isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, isDropdownOpen]);

  return (
    <nav ref={navbarRef} className="bg-purple-700 text-white relative z-10 px-2 py-1">
      <div className="flex justify-between items-center">
        <Link to="/" ><Logo /></Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl text-white cursor-pointer md:hidden"
        >
          {isOpen ? <BiX /> : <BiMenu />}
        </button>

        <div
          className={`flex flex-col absolute top-10 left-0 w-full p-1 bg-blue-600 md:bg-transparent md:flex md:flex-row md:static md:w-auto ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          <ul className="flex flex-col list-none p-0 m-0 md:flex-row md:items-center">
            <li className="py-0.5 px-1 md:px-2">
              <Link to="/" className="text-white no-underline hover:bg-blue-700 hover:rounded-md px-1 py-0.5">Home</Link>
            </li>

            <li
              className="relative py-0.5 px-1 md:px-2 group"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <button
                className="text-white flex items-center hover:bg-blue-700 hover:rounded-md px-1 py-0.5 md:hover:bg-transparent"
              >
                Services <BiChevronDown />
              </button>
              <ul
                className={`flex flex-col bg-blue-600 p-1 rounded-md md:absolute md:top-full md:left-0 md:w-max md:hidden md:group-hover:flex ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <li className="py-0.5 px-1">
                  <Link to="/course" className="text-white no-underline hover:bg-blue-700 hover:rounded-md px-1 py-0.5">Course</Link>
                </li>
                <li className="py-0.5 px-1">
                  <Link to="/assignment" className="text-white no-underline hover:bg-blue-700 hover:rounded-md px-1 py-0.5">Assignment</Link>
                </li>
              </ul>
            </li>

            <li className="py-0.5 px-1 md:px-2">
              <Link to="/about" className="text-white no-underline hover:bg-blue-700 hover:rounded-md px-1 py-0.5">About</Link>
            </li>
            <li className="py-0.5 px-1 md:px-2">
              <Link to="/contact" className="text-white no-underline hover:bg-blue-700 hover:rounded-md px-1 py-0.5">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

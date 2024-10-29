import React, { useState, useEffect, useRef } from "react";
import { BiMenu, BiX, BiChevronDown } from "react-icons/bi";
import "./Navbar.css";
import Logo from "./Logo";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown
  const navbarRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setIsOpen(false);
      setIsDropdownOpen(false); // Close dropdown on outside click
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
    <nav ref={navbarRef} className="navbar">
      <div className="navbar-container">
      <Logo/>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="navbar-menu-icon"
        >
          {isOpen ? <BiX /> : <BiMenu />}
        </button>

        <div className={`navbar-links ${isOpen ? 'navbar-links-open' : ''}`}>
          <ul className="navbar-list">
            <li className="navbar-item"><a href="#home">Home</a></li>

            <li className="navbar-item navbar-services">
              <button 
                className="navbar-services-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
              >
                Services <BiChevronDown />
              </button>
              {isDropdownOpen && ( // Show dropdown if open
                <ul className="navbar-dropdown">
                  <li className="navbar-dropdown-item"><a href="#web">Web Development</a></li>
                  <li className="navbar-dropdown-item"><a href="#design">Design</a></li>
                </ul>
              )}
            </li>

            <li className="navbar-item"><a href="#about">About</a></li>
            <li className="navbar-item"><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

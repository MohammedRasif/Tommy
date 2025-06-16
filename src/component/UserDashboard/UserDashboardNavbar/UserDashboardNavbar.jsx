const UserDashboardNavbar = () => {
  return <div></div>;
"use client"

import { useState, useEffect, useRef } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { GoChevronRight } from "react-icons/go";
import { RiUploadCloud2Line } from "react-icons/ri";

const UserDashboardNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-20 shadow-md z-50">
      <div>
        <h1 className="text-xl font-bold">Logo Here</h1>
      </div>
      <div className="flex items-center space-x-10">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center cursor-pointer ">
          <RiUploadCloud2Line className="mr-2" size={20} />
          Upgrade
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-4 hover:text-gray-900 cursor-pointer"
          >
            <span className="font-semibold">Md. Sajib</span>
            <img
              src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <GoChevronRight className="w-5 h-5" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Change Email
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Change Password
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardNavbar;
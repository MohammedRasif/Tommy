"use client"

import { useState } from "react";
import { FaSearch, FaBuilding, FaEnvelope, FaAddressBook, FaAward, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserDashboardSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [activeItem, setActiveItem] = useState("Search"); // Default active item
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FaSearch />, text: "Search", path: "/search" },
    { icon: <FaBuilding />, text: "Companies", path: "/companies" },
    { icon: <FaEnvelope />, text: "Ai Generator", path: "/ai-generator" },
    { icon: <FaAddressBook />, text: "Contact list", path: "/contact-list" },
    { icon: <FaAward />, text: "Membership", path: "/membership" },
    { icon: <FaUser />, text: "Profile", path: "/profile" },
    { icon: <FaSignOutAlt />, text: "Logout", path: "/logout" },
  ];

  const handleClick = (text, path) => {
    setActiveItem(text);
    navigate(path);
  };

  return (
    <div className="py-4 pr-4 mt-20 roboto">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(item.text, item.path)}
          className={`w-full flex items-center space-x-5 p-3 rounded-r-md transition-colors duration-200 my-2 cursor-pointer pl-8 ${
            activeItem === item.text
              ? "bg-[#645CE8] text-white"
              : "text-gray-400 hover:bg-indigo-100"
          }`}
        >
          <span className="text-[22px]">{item.icon}</span>
          <span className="text-[21px] font-medium">{item.text}</span>
        </button>
      ))}
    </div>
  );
};

export default UserDashboardSidebar;
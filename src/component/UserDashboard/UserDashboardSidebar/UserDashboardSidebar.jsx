"use client"

import { useState, useEffect } from "react";
import { FaSearch, FaBuilding, FaEnvelope, FaAddressBook, FaAward, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const UserDashboardSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [activeItem, setActiveItem] = useState("Search"); // Default active item
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <FaSearch />, text: "Search", path: "/dashboard" },
    { icon: <FaBuilding />, text: "Companies", path: "/dashboard/company_list" },
    { icon: <FaEnvelope />, text: "Ai Generator", path: "/ai-generator" },
    { icon: <FaAddressBook />, text: "Contact list", path: "/dashboard/contact_list" },
    { icon: <FaAward />, text: "Membership", path: "/membership" },
    { icon: <FaUser />, text: "Profile", path: "/profile" },
    { icon: <FaSignOutAlt />, text: "Logout", path: "/logout" },
  ];

  // Update active item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    let newActiveItem = "Search"; // Default to Search

    if (currentPath === "/dashboard") newActiveItem = "Search";
    else if (currentPath === "/dashboard/company_list") newActiveItem = "Companies";
    else if (currentPath === "/ai-generator") newActiveItem = "Ai Generator";
    else if (currentPath === "/contact-list") newActiveItem = "Contact list";
    else if (currentPath === "/membership") newActiveItem = "Membership";
    else if (currentPath === "/profile") newActiveItem = "Profile";
    else if (currentPath === "/logout") newActiveItem = "Logout";
    else if (currentPath === "/company_details") newActiveItem = "Search"; // Special case for /company_details

    setActiveItem(newActiveItem);
  }, [location.pathname]);

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
          className={`w-full flex items-center space-x-5 p-3 rounded-r-md transition-colors duration-200 my-2 cursor-pointer pl-8 ${activeItem === item.text
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
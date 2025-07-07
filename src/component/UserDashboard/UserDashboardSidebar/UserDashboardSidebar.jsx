
import { useState, useEffect, useCallback } from "react";
import {
  FaSearch,
  FaBuilding,
  FaEnvelope,
  FaAddressBook,
  FaAward,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const UserDashboardSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [activeItem, setActiveItem] = useState("Search");
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <FaSearch />, text: "Search", path: "/dashboard" },
    { icon: <FaBuilding />, text: "Companies", path: "/dashboard/company_list" },
    { icon: <FaEnvelope />, text: "Ai Generator", path: "/dashboard/ai_generator" },
    { icon: <FaAddressBook />, text: "Contact list", path: "/dashboard/contact_list" },
    { icon: <FaAward />, text: "Membership", path: "/dashboard/membership" },
    { icon: <FaUser />, text: "Profile", path: "/dashboard/profile" },
    { icon: <FaSignOutAlt />, text: "Logout", path: "/" },
  ];

  // Map routes to menu item text
  useEffect(() => {
    const pathToItem = {
      "/dashboard": "Search",
      "/dashboard/company_list": "Companies",
      "/dashboard/ai_generator": "Ai Generator",
      "/dashboard/contact_list": "Contact list",
      "/dashboard/membership": "Membership",
      "/dashboard/profile": "Profile",
      "/dashboard/edit_profile": "Profile",
      "/": "Logout",
      "/dashboard/company_details": "Search",
    };

    const currentPath = location.pathname;
    const newActiveItem = pathToItem[currentPath] || "Search";
    setActiveItem(newActiveItem);
  }, [location.pathname]);

  const handleClick = useCallback((text, path) => {
    navigate(path);
  }, [navigate]);

  return (
    <div className="py-4 pr-4 mt-16 roboto">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(item.text, item.path)}
          className={`w-full flex items-center py-[11px] rounded-r-md transition-colors duration-200 my-2 cursor-pointer pl-8 ${
            activeItem === item.text
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:bg-indigo-100"
          } ${isSidebarOpen ? "space-x-5" : ""}`}
          aria-label={item.text}
        >
          <span className={`text-[22px] ${isSidebarOpen ? "" : "mx-auto"}`}>{item.icon}</span>
          {isSidebarOpen && <span className="text-[21px] font-medium">{item.text}</span>}
        </button>
      ))}
    </div>
  );
};

export default UserDashboardSidebar;

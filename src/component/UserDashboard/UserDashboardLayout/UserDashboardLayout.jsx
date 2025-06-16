"use client";


import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import UserDashboardSidebar from "../UserDashboardSidebar/UserDashboardSidebar";
import UserDashboardNavbar from "../UserDashboardNavbar/UserDashboardNavbar";

const UserDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkIfMobile();

    // Set sidebar closed by default on mobile
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);
import { Outlet } from "react-router-dom"
import { useState } from "react"
import UserDashboardSidebar from "../UserDashboardSidebar/UserDashboardSidebar"
import UserDashboardNavbar from "../UserDashboardNavbar/UserDashboardNavbar"

const UserDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen relative">

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#20325A] dark:bg-[#1E232E] text-white p-2 rounded-md"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-[#20325A] dark:bg-[#1E232E] h-full fixed z-50 transition-all duration-300 ease-in-out ${
          isSidebarOpen
            ? "w-72 translate-x-0"
            : "w-0 -translate-x-full lg:translate-x-0 lg:w-16"

      {/* Sidebar */}
      <div
        className={`bg-white shadow-md border-r border-gray-200 h-full fixed z-30 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-72 translate-x-0" : "w-16"
        }`}
      >
        <div className="h-full flex flex-col justify-between overflow-hidden">
          {/* Sidebar Content */}
          <UserDashboardSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isMobile={isMobile}
          />
          <UserDashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex flex-col w-full transition-all duration-300 ease-in-out border border-red-500 ${
          isSidebarOpen ? "lg:ml-72" : "lg:ml-16"
        className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-72" : "ml-16"
        }`}
      >
        {/* Navbar - Fixed, Full Width, Above Sidebar */}
        <div
          className="fixed top-0 z-30  bg-white dark:bg-[#1E232E] w-full border-b border-gray-200 dark:border-gray-600 transition-all duration-300 ease-in-out"
          style={{
            left: isMobile ? "0" : isSidebarOpen ? "288px" : "64px",
            width: isMobile
              ? "100%"
              : isSidebarOpen
              ? "calc(100% - 288px)"
              : "calc(100% - 64px)",
            paddingLeft: isMobile ? "60px" : "0", // Add padding for mobile menu button
          }}

          className="fixed top-0 left-0 z-50 bg-white w-full border-b border-gray-200 h-16 flex items-center px-4 shadow-md transition-all duration-300 ease-in-out"
        >
          <UserDashboardNavbar />
        </div>

        {/* Outlet (Main Content) */}
        <div className="h-full mt-16 overflow-auto bg-[#F7F8F7] p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;

"use client"

import { Outlet } from "react-router-dom"
import { useState } from "react"
import UserDashboardSidebar from "../UserDashboardSidebar/UserDashboardSidebar"
import UserDashboardNavbar from "../UserDashboardNavbar/UserDashboardNavbar"

const UserDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md border-r border-gray-200 h-full fixed z-30 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-72 translate-x-0" : "w-16"
        }`}
      >
        <div className="h-full flex flex-col justify-between overflow-hidden">
          {/* Sidebar Content */}
          <UserDashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-72" : "ml-16"
        }`}
      >
        {/* Navbar - Fixed, Full Width, Above Sidebar */}
        <div
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
  )
}

export default UserDashboardLayout
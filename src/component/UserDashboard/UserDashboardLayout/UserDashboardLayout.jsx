
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
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#F7F8F7] relative">
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-60 bg-[#20325A] text-white p-2 rounded-md hover:bg-[#2a3f6d] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        aria-expanded={isSidebarOpen}
      >
        <Menu size={20} />
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white h-full fixed z-40 shadow-lg transition-all duration-300 ease-in-out ${
          isSidebarOpen
            ? "w-72 translate-x-0 rounded-r-lg lg:rounded-none"
            : "-translate-x-full lg:translate-x-0 lg:w-16"
        }`}
      >
        <div className="h-full flex flex-col justify-between overflow-hidden">
          <UserDashboardSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
          isMobile ? "ml-0" : isSidebarOpen ? "lg:ml-72" : "lg:ml-16"
        }`}
      >
        {/* Navbar */}
        <div
          className={`fixed top-0 z-50 bg-white border-b border-gray-200 h-16 flex items-center px-4 sm:px-6 shadow-md w-full ${
            isMobile ? "" : isSidebarOpen ? "lg:ml-72 lg:w-[calc(100%-288px)]" : "lg:ml-16 lg:w-[calc(100%-64px)]"
          }`}
        >
          <UserDashboardNavbar isSidebarOpen={isSidebarOpen} isMobile={isMobile} />
        </div>

        {/* Outlet (Main Content) */}
        <div className="h-full mt-16 overflow-auto bg-[#F7F8F7] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;

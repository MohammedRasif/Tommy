import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Address Section */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Logo here DEMO. Ai</h2>
            <div className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">
              <p>Villa No. 45, Street 12, Khalifa City,</p>
              <p>Abu Dhabi United Arab Emirates</p>
            </div>
            <div className="text-gray-600 text-sm sm:text-[15px]">
              <p>demonexusvision@Demoai.com</p>
            </div>
          </div>

          {/* Our Collaborators Section */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800">Our collaborators</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-600 text-sm sm:text-[15px] hover:text-blue-600 transition-colors">
                Demo company limited
              </a>
              <a href="#" className="block text-gray-600 text-sm sm:text-[15px] hover:text-blue-600 transition-colors">
                Demo task company
              </a>
            </div>
          </div>

          {/* About Us Section */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800">About Us</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-600 text-sm sm:text-[15px] hover:text-blue-600 transition-colors">
                Why us?
              </a>
              <a href="#" className="block text-gray-600 text-sm sm:text-[15px] hover:text-blue-600 transition-colors">
                Learn more
              </a>
              <NavLink to="/contact">
                <a href="#" className="block text-blue-600 text-sm sm:text-[15px] hover:text-blue-700 transition-colors underline">
                Contact Us
              </a>
              </NavLink>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800">Follow us on</h3>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a
                href="#"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a
                href="#"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a
                href="#"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between space-y-4 sm:space-y-0 text-center sm:text-left">
            <div className="text-xs sm:text-[15px]">© 2024 ChaskiX. All rights reserved</div>
            <div className="flex flex-col sm:flex-row sm:space-x-6 text-xs sm:text-[15px] space-y-2 sm:space-y-0">
              <a href="#" className="hover:text-gray-300 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Terms of service
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Cookies Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
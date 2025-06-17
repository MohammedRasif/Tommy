import { NavLink } from "react-router-dom";
import video from "../../image/hero.mp4";

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-black text-white py-16 md:py-32 lg:py-64 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to ensure text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 bg-opacity-50 z-10"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center z-20">
        <div className="w-full lg:w-1/2 lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Target the right <br /> businesses and engage <br /> with top executives
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6">
            With Demo.ai, you can discover businesses based on industry and geography, connect with the right contacts, and send AI-generated personalized emails.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <NavLink to="/business_filter">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer font-medium sm:w-auto">
                Get started for free
              </button>
            </NavLink>
            <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 cursor-pointer font-medium sm:w-auto w-48">
              Watch demo
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          {/* Placeholder for future content, e.g., image or illustration */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
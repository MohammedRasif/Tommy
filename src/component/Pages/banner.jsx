import { NavLink } from "react-router-dom";

const Banner = () => {
    return (
        <div className="bg-gradient-to-r from-gray-900 to-black text-white py-64  ">
            <div className="flex items-center justify-center container mx-auto"> 
                <div className=" w-1/2">
                    <h1 className="text-6xl font-bold mb-4">
                        Target the right <br /> businesses and engage <br /> with top executives
                    </h1>
                    <p className="text-lg mb-6">
                        With Demo.ai, you can discover businesses based on industry and geography, connect with the right contacts, and send AI-generated personalized emails.
                    </p>
                    <div className="space-x-4">
                       <NavLink to="/business_filter">
                         <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer font-medium">
                            Get started for free
                        </button>
                       </NavLink>
                        <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 cursor-pointer font-medium">
                            Watch demo
                        </button>
                    </div>
                </div>
                <div className="w-1/2">

                </div>
            </div>
        </div>
    );
};

export default Banner;
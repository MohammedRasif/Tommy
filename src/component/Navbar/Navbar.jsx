import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [activeItem, setActiveItem] = useState('Home');
    const location = useLocation();

    // Effect to update activeItem based on the current URL
    useEffect(() => {
        const pathname = location.pathname;
        // Set 'Home' as active for specific routes
        if (pathname === '/' || pathname === '/business_Partner' || pathname === '/business_filter') {
            setActiveItem('Home');
        }
    }, [location.pathname]);

    const handleClick = (item) => {
        setActiveItem(item);

    };

    return (
        <nav className="bg-[#312D46] py-2 text-white">
            <div className="flex items-center justify-between container mx-auto">
                <div>
                    <h1 className="ml-5 text-[26px]">logo</h1>
                </div>
                <div className="flex items-center py-1 text-[20px] font-medium">
                    <NavLink to="/">
                        <button
                            onClick={() => handleClick('Home')}
                            className={`px-4 py-[5px] mx-1 rounded ${activeItem === 'Home'
                                ? 'bg-[#4F46E5] cursor-pointer text-white shadow-2xl'
                                : 'bg-transparent text-white hover:bg-blue-600'
                                }`}
                        >
                            Home
                        </button>
                    </NavLink>
                    <button
                        onClick={() => handleClick('Service')}
                        className={`px-4 py-[5px] mx-1 rounded ${activeItem === 'Service'
                            ? 'bg-[#4F46E5] cursor-pointer text-white'
                            : 'bg-transparent text-white hover:bg-blue-600'
                            }`}
                    >
                        Service
                    </button>
                    <button
                        onClick={() => handleClick('Pricing')}
                        className={`px-4 py-[5px] mx-1 rounded ${activeItem === 'Pricing'
                            ? 'bg-[#4F46E5] cursor-pointer text-white'
                            : 'bg-transparent text-white hover:bg-blue-600'
                            }`}
                    >
                        Pricing
                    </button>
                    <button
                        onClick={() => handleClick('Why us')}
                        className={`px-4 py-[5px] mx-1 rounded ${activeItem === 'Why us'
                            ? 'bg-[#4F46E5] cursor-pointer text-white'
                            : 'bg-transparent text-white hover:bg-blue-600'
                            }`}
                    >
                        Why us
                    </button>
                    <button
                        onClick={() => handleClick('Reviews')}
                        className={`px-4 py-[5px] mx-1 rounded ${activeItem === 'Reviews'
                            ? 'bg-[#4F46E5] cursor-pointer text-white'
                            : 'bg-transparent text-white hover:bg-blue-600'
                            }`}
                    >
                        Reviews
                    </button>
                </div>
                <div className="text-[19px]">
                    <NavLink to="/login">
                        <button
                        onClick={() => handleClick('login')}
                        className={`px-4 py-[5px] mx-1 rounded hover:bg-[#4F46E5] font-medium cursor-pointer text-white border hover:border-gray-700`}
                    >
                        login
                    </button>
                    </NavLink>
                     <NavLink to="/register">
                    <button
                        onClick={() => handleClick('Register')}
                        className={`px-4 py-[5px] mx-1 rounded hover:bg-[#4F46E5] font-medium cursor-pointer text-white border hover:border-gray-700`}
                    >
                        Register
                    </button>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
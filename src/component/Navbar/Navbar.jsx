import { useState } from 'react';

const Navbar = () => {
    const [activeItem, setActiveItem] = useState('Home');

    const handleClick = (item) => {
        setActiveItem(item);
        // Add navigation logic here (e.g., using React Router)
    };

    return (
        <nav className="bg-[#312D46] py-2  text-white ">
            <div className='flex items-center justify-between container mx-auto'>
                <div>
                    <h1 className="ml-5 text-[26px]">logo</h1>
                </div>
                <div className="flex items-center py-1 text-[20px] font-medium">
                    <button
                        onClick={() => handleClick('Home')}
                        className={`px-4 py-[5px] mx-1 rounded ${activeItem === 'Home' ? 'bg-[#4F46E5] cursor-pointer text-white shadow-2xl ' : 'bg-transparent text-white hover:bg-blue-600'}`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => handleClick('Service')}
                        className={`px-4 py-[5px] mx-1 rounded ${activeItem === 'Service' ? 'bg-[#4F46E5] cursor-pointer text-white ' : 'bg-transparent text-white hover:bg-blue-600'}`}
                    >
                        Service
                    </button>
                    <button
                        onClick={() => handleClick('Pricing')}
                        className={`px-4 py-[5px] mx-1 rounded ${activeItem === 'Pricing' ? 'bg-[#4F46E5] cursor-pointer text-white ' : 'bg-transparent text-white hover:bg-blue-600'}`}
                    >
                        Pricing
                    </button>
                    <button
                        onClick={() => handleClick('Why us')}
                        className={`px-4 py-[5px] mx-1 rounded ${activeItem === 'Why us' ? 'bg-[#4F46E5] cursor-pointer text-white ' : 'bg-transparent text-white hover:bg-blue-600'}`}
                    >
                        Why us
                    </button>
                    <button
                        onClick={() => handleClick('Reviews')}
                        className={`px-4 py-[5px] mx-1 rounded ${activeItem === 'Reviews' ? 'bg-[#4F46E5] cursor-pointer text-white ' : 'bg-transparent text-white hover:bg-blue-600'}`}
                    >
                        Reviews
                    </button>
                </div>
                <div className='text-[19px]'>
                    <button
                        onClick={() => handleClick('Register')}
                        className={`px-4 py-[5px] mx-1 rounded hover:bg-[#4F46E5] font-medium cursor-pointer text-white border hover:border-gray-700`}
                    >
                        login
                    </button>
                    <button
                        onClick={() => handleClick('Register')}
                        className={`px-4 py-[5px] mx-1 rounded hover:bg-[#4F46E5] font-medium cursor-pointer text-white border hover:border-gray-700`}
                    >
                        Register
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
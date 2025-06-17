import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import img from "../../image/Group (3).png"

const Navbar = () => {
    const [activeItem, setActiveItem] = useState('Home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Effect to update activeItem based on the current URL
    useEffect(() => {
        const pathname = location.pathname;
        if (pathname === '/' || pathname === '/business_Partner' || pathname === '/business_filter') {
            setActiveItem('Home');
        }
    }, [location.pathname]);

    // Effect to track active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['banner', 'service', 'pricing', 'why-us', 'reviews'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        const sectionName = section === 'banner' ? 'Home' : section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                        if (activeItem !== sectionName) {
                            setActiveItem(sectionName);
                        }
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeItem]);

    // Smooth scroll to section
    const scrollToSection = (id, item) => {
        const section = document.getElementById(id);
        if (section) {
            const offset = 50; // Offset for fixed navbar
            const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = sectionPosition - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
            setActiveItem(item);
            setIsMenuOpen(false); // Close mobile menu
        } else {
            console.log(`Section with id "${id}" not found`);
        }
    };

    const handleClick = (item, sectionId) => {
        if (sectionId) {
            scrollToSection(sectionId, item);
        } else {
            setActiveItem(item);
            setIsMenuOpen(false); // Close menu on item click in mobile view
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Dynamic classes for nav links
    const getNavLinkClass = (item) => {
        return `px-4 py-[5px] mx-1 rounded ${
            activeItem === item
                ? 'bg-[#4F46E5] cursor-pointer text-white shadow-2xl'
                : 'bg-transparent text-white hover:bg-blue-600'
        }`;
    };

    return (
        <nav className="bg-[#312D46] py-2 text-white fixed top-0 w-full z-50">
            <div className="flex items-center justify-between container mx-auto px-4">
                {/* Logo */}
                <div>
                    <img src={img} className='h-14' alt="" />
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>

                {/* Navigation Links - Desktop */}
                <div className="hidden lg:flex items-center py-1 text-[20px] font-medium">
                    <NavLink to="/">
                        <button
                            onClick={() => handleClick('Home', 'banner')}
                            className={getNavLinkClass('Home')}
                        >
                            Home
                        </button>
                    </NavLink>
                    <button
                        onClick={() => handleClick('Service', 'service')}
                        className={getNavLinkClass('Service')}
                    >
                        Service
                    </button>
                    <button
                        onClick={() => handleClick('Pricing', 'pricing')}
                        className={getNavLinkClass('Pricing')}
                    >
                        Pricing
                    </button>
                    <button
                        onClick={() => handleClick('Why us', 'why-us')}
                        className={getNavLinkClass('Why us')}
                    >
                        Why us
                    </button>
                    <button
                        onClick={() => handleClick('Reviews', 'reviews')}
                        className={getNavLinkClass('Reviews')}
                    >
                        Reviews
                    </button>
                </div>

                {/* Login/Register - Desktop */}
                <div className="hidden lg:flex text-[19px]">
                    <NavLink to="/login">
                        <button
                            onClick={() => handleClick('login')}
                            className={`px-4 py-[5px] mx-1 rounded hover:bg-[#4F46E5] font-medium cursor-pointer text-white border hover:border-gray-700 ${
                                activeItem === 'login' ? 'bg-[#4F46E5]' : ''
                            }`}
                        >
                            login
                        </button>
                    </NavLink>
                    <NavLink to="/register">
                        <button
                            onClick={() => handleClick('Register')}
                            className={`px-4 py-[5px] mx-1 rounded hover:bg-[#4F46E5] font-medium cursor-pointer text-white border hover:border-gray-700 ${
                                activeItem === 'Register' ? 'bg-[#4F46E5]' : ''
                            }`}
                        >
                            Register
                        </button>
                    </NavLink>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden absolute top-14 left-0 w-80 bg-[#312D46] flex flex-col items-center text-[20px] font-medium transition-all duration-300 ease-in-out ${
                        isMenuOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}
                >
                    <NavLink to="/" className="w-full">
                        <button
                            onClick={() => handleClick('Home', 'banner')}
                            className={`w-full text-left px-4 py-2 rounded ${
                                activeItem === 'Home'
                                    ? 'bg-[#4F46E5] text-white'
                                    : 'bg-transparent text-white hover:bg-blue-600'
                            }`}
                        >
                            Home
                        </button>
                    </NavLink>
                    <button
                        onClick={() => handleClick('Service', 'service')}
                        className={`w-full text-left px-4 py-2 rounded ${
                            activeItem === 'Service'
                                ? 'bg-[#4F46E5] text-white'
                                : 'bg-transparent text-white hover:bg-blue-600'
                        }`}
                    >
                        Service
                    </button>
                    <button
                        onClick={() => handleClick('Pricing', 'pricing')}
                        className={`w-full text-left px-4 py-2 rounded ${
                            activeItem === 'Pricing'
                                ? 'bg-[#4F46E5] text-white'
                                : 'bg-transparent text-white hover:bg-blue-600'
                        }`}
                    >
                        Pricing
                    </button>
                    <button
                        onClick={() => handleClick('Why us', 'why-us')}
                        className={`w-full text-left px-4 py-2 rounded ${
                            activeItem === 'Why us'
                                ? 'bg-[#4F46E5] text-white'
                                : 'bg-transparent text-white hover:bg-blue-600'
                        }`}
                    >
                        Why us
                    </button>
                    <button
                        onClick={() => handleClick('Reviews', 'reviews')}
                        className={`w-full text-left px-4 py-2 rounded ${
                            activeItem === 'Reviews'
                                ? 'bg-[#4F46E5] text-white'
                                : 'bg-transparent text-white hover:bg-blue-600'
                        }`}
                    >
                        Reviews
                    </button>
                    <NavLink to="/login" className="w-full">
                        <button
                            onClick={() => handleClick('login')}
                            className={`w-full text-left px-4 py-2 rounded hover:bg-[#4F46E5] text-white border hover:border-gray-700 ${
                                activeItem === 'login' ? 'bg-[#4F46E5]' : ''
                            }`}
                        >
                            login
                        </button>
                    </NavLink>
                    <NavLink to="/register" className="w-full">
                        <button
                            onClick={() => handleClick('Register')}
                            className={`w-full text-left px-4 py-2 rounded hover:bg-[#4F46E5] text-white border hover:border-gray-700 ${
                                activeItem === 'Register' ? 'bg-[#4F46E5]' : ''
                            }`}
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
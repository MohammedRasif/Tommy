import { IoMdSend } from "react-icons/io";
import img from "../../image/Group 2147226130.png";

const WhyUs = () => {
    return (
        <div id="why-us" className="bg-white py-8 lg:py-16">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center">
                {/* Text Section */}
                <div className="w-full lg:w-1/2 text-center lg:text-left lg:pr-8 mb-8 lg:mb-0">
                    <h2 className="text-2xl lg:text-5xl font-bold text-gray-700 mb-4">
                        Why Us?
                    </h2>
                    <p className="text-xs lg:text-lg text-gray-600 mb-4  mx-auto lg:mx-0">
                        Particularly impressed by your recent project launch. Given your role as Chief Technology Officer, I believe you recently came across TechNova Solutions' innovative work in cloud solutions and was particularly impressed by your recent project launch. Given your role as Chief Technology Officer, I believe you recently came across TechNova Solutions' innovative work in cloud solutions and was particularly impressed by your recent project launch.
                    </p>
                    <ul className="list-none mb-6 lg:mb-10 max-w-md mx-auto lg:mx-0">
                        <li className="flex items-center mb-3">
                            <span className="mr-2 text-[#2920B8]">
                                <IoMdSend size={18} />
                            </span>
                            <span className="text-xs lg:text-base text-gray-600">
                                Donec adipiscing tristique risus nec feugiat in
                            </span>
                        </li>
                        <li className="flex items-center mb-3">
                            <span className="mr-2 text-[#2920B8]">
                                <IoMdSend size={18} />
                            </span>
                            <span className="text-xs lg:text-base text-gray-600">
                                Donec adipiscing tristique risus nec feugiat in
                            </span>
                        </li>
                        <li className="flex items-center">
                            <span className="mr-2 text-[#2920B8]">
                                <IoMdSend size={18} />
                            </span>
                            <span className="text-xs lg:text-base text-gray-600">
                                Donec adipiscing tristique risus nec feugiat in
                            </span>
                        </li>
                    </ul>
                    <button className="bg-gradient-to-r from-indigo-600 to-indigo-900 text-white py-2 lg:py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 cursor-pointer w-full lg:w-auto">
                        Get Started Now
                    </button>
                </div>
                {/* Image Section */}
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <img src={img} alt="Why Us Illustration" className="w-full max-w-sm lg:max-w-xl h-auto" />
                </div>
            </div>
        </div>
    );
};

export default WhyUs;
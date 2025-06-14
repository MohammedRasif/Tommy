import { IoMdSend } from "react-icons/io";
import img from "../../image/Group 2147226130.png";

const WhyUs = () => {
    return (
        <div className="flex items-center justify-center  bg-white">
            <div className="flex flex-row w-full container mx-auto py-32">
                {/* Text Section */}
                <div className="w-1/2 pr-8">
                    <h2 className="text-5xl font-bold text-gray-700 mb-4">Why Us?</h2>
                    <p className="text-gray-600 mb-4">
                        Particularly impressed by your recent project launch. Given your role as Chief Technology Officer, I believe you recently came across TechNova Solutions' innovative work in cloud solutions and was particularly impressed by your recent project launch. Given your role as Chief Technology Officer, I believe you recently came across TechNova Solutions' innovative work in cloud solutions and was particularly impressed by your recent project launch.
                    </p>
                    <ul className="list-none mb-10">
                        <li className="flex items-center mb-3">
                            <span className=" mr-2 text-[#2920B8]"><IoMdSend /></span>
                            <span className="text-gray-600">Donec adipiscing tristique risus nec feugiat in</span>
                        </li>
                        <li className="flex items-center mb-3">
                            <span className=" mr-2 text-[#2920B8]"><IoMdSend /></span>
                            <span className="text-gray-600">Donec adipiscing tristique risus nec feugiat in</span>
                        </li>
                        <li className="flex items-center">
                            <span className=" mr-2 text-[#2920B8]"><IoMdSend /></span>
                            <span className="text-gray-600">Donec adipiscing tristique risus nec feugiat in</span>
                        </li>
                    </ul>
                    <button className="bg-gradient-to-r from-indigo-600 to-indigo-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                        Get Started Now
                    </button>
                </div>
                {/* Image Section */}
                <div className="w-1/2 flex justify-center items-center">
                    <img src={img} alt="Why Us Illustration" className="w-[60vh] h-auto" />
                </div>
            </div>
        </div>
    );
};

export default WhyUs;
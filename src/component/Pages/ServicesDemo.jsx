import img from "../../image/Group 2147226129.png";

const ServicesDemo = () => {
    return (
        <div id="service" className="py-8 sm:py-12 lg:py-16 container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-16 lg:mb-20">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    Services Of Demo. Ai
                </h1>
                <p className="text-sm sm:text-base lg:text-[17px] text-gray-600 mb-8 max-w-2xl mx-auto">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                </p>
            </div>
            <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
                <img src={img} alt="Services Timeline" className="w-full  h-auto" />
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-6 sm:gap-8 lg:gap-20">
                <div className="text-center max-w-xs">
                    <h1 className="text-lg sm:text-xl font-semibold text-[#625DC0]">
                        Accurate Company Search
                    </h1>
                    <p className="text-xs sm:text-sm mt-2 text-gray-600">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    </p>
                </div>
                <div className="text-center max-w-xs">
                    <h1 className="text-lg sm:text-xl font-semibold text-[#625DC0]">
                        AI Email Generation
                    </h1>
                    <p className="text-xs sm:text-sm mt-2 text-gray-600">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    </p>
                </div>
                <div className="text-center max-w-xs">
                    <h1 className="text-lg sm:text-xl font-semibold text-[#625DC0]">
                        Leads Management
                    </h1>
                    <p className="text-xs sm:text-sm mt-2 text-gray-600">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServicesDemo;
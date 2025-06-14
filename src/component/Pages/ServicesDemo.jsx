import img from "../../image/Group 2147226129.png";

const ServicesDemo = () => {
    return (
        <div className="  py-16 container mx-auto">
            <div className="text-center mb-20">
                <h1 className="text-5xl font-bold mb-4">Services Of Demo. Ai</h1>
                <p className="text-[17px] text-gray-600 mb-8">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                </p>
            </div>
            <div className="flex justify-center ">
                <img src={img} alt="Services Timeline" className="w-full  " />
            </div>
            <div className="flex justify-center space-x-20">
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-[#625DC0]">Accurate Company Search</h1>
                    <p className="text-sm mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    </p>
                </div>
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-[#625DC0]">AI Email Generation</h1>
                    <p className="text-sm mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    </p>
                </div>
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-[#625DC0]">Leads Management</h1>
                    <p className="text-sm mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServicesDemo;
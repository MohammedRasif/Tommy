import React from 'react';
import { FaEdit } from 'react-icons/fa'; // Importing the edit icon from react-icons
import { NavLink } from 'react-router-dom';

const userData = {
    header: {
        title: "Profile Details",
        invitationCode: "INVITATION CODE: 101020"
    },
    userInfo: {
        imageSrc: "https://res.cloudinary.com/dpi0t9wfn/image/upload/v1741443124/samples/smile.jpg", // Placeholder image
        name: "Footcraft plastics ltd.",
        location: "24/2, website street road, Dhaka bangladesh",
        website: "Demowebsite.com",
        email: "alexammy123@gmail.com",
        annualIncome: "100M",
        contactNumber: "+1234567890",
    },
    about: {
        title: "About me",
        description: "Ype and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in ype and scrambled.typesetting, remaining essentially It has survived not only five centuries"
    },
    personalInfo: [
        { label: "First Name", value: "Alex" },
        { label: "Last Name", value: "Tammy" },
        { label: "Age", value: "20 years" },
        { label: "Gender", value: "Bangla" },
        { label: "Educational qualification", value: "BSc. in Computer science" },
        { label: "Language", value: "Bangla, English" },
        { label: "Phone (Home)", value: "+1234567890" },
        { label: "Email Address (Business)", value: "alextammy.123@gmail.com" }
    ],
    address: [
        { label: "House No.", value: "63/4" },
        { label: "Road No.", value: "24/1" },
        { label: "City/State", value: "Tammy" },
        { label: "Country", value: "Tammy" },
        { label: "Post Code", value: "8250" },
        { label: "Country", value: "Bangladesh" },
        { label: "Phone number (Home)", value: "163494130358651320", span: 3 }
    ]
};

function Profile() {
    return (
        <div className="mx-auto p-4">
            {/* Header Section */}
            <div className="flex  items-center justify-center py-2 space-y-2 sm:space-y-0 mb-2">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">{userData.header.title}</h2>
                <div className="flex items-center justify-between sm:justify-end space-x-2 bg-white ml-2">
                    <NavLink to="/dashboard/edit_profile">
                        <button className=" hover:underline border  rounded-sm px-4 sm:px-2 py-1 flex items-center cursor-pointer">
                            <FaEdit className="mr-2" /> Edit
                        </button>
                    </NavLink>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start mb-6 bg-white p-4 sm:p-5 rounded-md">
                {/* User Image and Title */}
                <div className="w-full sm:w-1/4 flex flex-col items-center sm:items-start mb-4 sm:mb-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-full overflow-hidden mb-2">
                        <img
                            src={userData.userInfo.imageSrc}
                            className="w-full h-full object-cover"
                            alt="Company profile"
                        />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-500">Company Information</h3>
                </div>

                {/* Company Details */}
                <div className="w-full sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-4 pl-0 sm:pl-6">
                    <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="text-base text-gray-800">{userData.userInfo.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <p className="text-base text-gray-800">{userData.userInfo.website}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-base text-gray-800">{userData.userInfo.location}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-base text-gray-800">{userData.userInfo.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Annual Income</p>
                        <p className="text-base text-gray-800">{userData.userInfo.annualIncome}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Contact number</p>
                        <p className="text-base text-gray-800">{userData.userInfo.contactNumber}</p>
                    </div>
                </div>
            </div>

            {/* Personal Information Section */}
            <div className="mb-6 bg-white p-4 sm:p-5 rounded-md">
                <h3 className="text-xl sm:text-[24px] font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {userData.personalInfo.map((item, index) => (
                        <div key={index}>
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <p className="text-md font-medium text-gray-800">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Address Section */}
            <div className="bg-white p-4 sm:p-5 rounded-md">
                <h3 className="text-xl sm:text-[24px] font-semibold text-gray-800 mb-4">Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {userData.address.map((item, index) => (
                        <div
                            key={index}
                            className={item.span ? `col-span-1 sm:col-span-${item.span}` : ""}
                        >
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <p className="text-md font-medium text-gray-800">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
import { IoBusinessSharp } from "react-icons/io5"
import img from "../../../image/Layer 1.png"


import { useState } from "react"
import { MdOutlineLocationOn } from "react-icons/md"
import { NavLink } from "react-router-dom"

// Sample business data
const businessData = [
    {
        id: 1,
        company: "Tech Solutions Inc",
        job: "Software Development",
        category: "Technology",
        location: "Austin, TX",
        employeeSize: "201-500",
        revenue: "10M-50M",
        keywords: ["software", "development", "tech"],
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        employees: 350,
        website: "techsolutions.com",
    },
    {
        id: 2,
        company: "Marketing Pro Agency",
        job: "Digital Marketing",
        category: "Marketing",
        location: "Dallas, TX",
        employeeSize: "51-200",
        revenue: "5M-10M",
        keywords: ["marketing", "digital", "advertising"],
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        employees: 125,
        website: "marketingpro.com",
    },
    {
        id: 3,
        company: "Healthcare Innovations",
        job: "Healthcare Services",
        category: "Healthcare",
        location: "Houston, TX",
        employeeSize: "501-1000",
        revenue: "50M-100M",
        keywords: ["healthcare", "medical", "innovation"],
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        employees: 750,
        website: "healthcareinnovations.com",
    },
    {
        id: 4,
        company: "Financial Advisors LLC",
        job: "Financial Services",
        category: "Finance",
        location: "San Antonio, TX",
        employeeSize: "11-50",
        revenue: "1M-5M",
        keywords: ["finance", "advisory", "investment"],
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        employees: 35,
        website: "financialadvisors.com",
    },
    {
        id: 5,
        company: "Construction Masters",
        job: "Construction Services",
        category: "Construction",
        location: "Fort Worth, TX",
        employeeSize: "101-200",
        revenue: "20M-50M",
        keywords: ["construction", "building", "contractor"],
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        employees: 180,
        website: "constructionmasters.com",
    },
    {
        id: 6,
        company: "Education Plus",
        job: "Educational Services",
        category: "Education",
        location: "Plano, TX",
        employeeSize: "51-100",
        revenue: "5M-10M",
        keywords: ["education", "learning", "training"],
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        employees: 85,
        website: "educationplus.com",
    },
]

const Dashboard = () => {
    const [filters, setFilters] = useState({
        company: "",
        job: "",
        category: "",
        location: "",
        employeeSize: "",
        revenue: "",
        keywords: "",
    })

    const [hasActiveFilters, setHasActiveFilters] = useState(false)
    const [openFilter, setOpenFilter] = useState(null)

    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...filters, [filterType]: value }
        setFilters(newFilters)

        // Check if any filter has a value
        const hasFilters = Object.values(newFilters).some((filter) => filter.trim() !== "")
        setHasActiveFilters(hasFilters)
    }

    const toggleFilter = (filterName) => {
        setOpenFilter(openFilter === filterName ? null : filterName)
    }

    const resetFilters = () => {
        setFilters({
            company: "",
            job: "",
            category: "",
            location: "",
            employeeSize: "",
            revenue: "",
            keywords: "",
        })
        setHasActiveFilters(false)
        setOpenFilter(null)
    }

    const filteredData = businessData.filter((business) => {
        return (
            (filters.company === "" || business.company.toLowerCase().includes(filters.company.toLowerCase())) &&
            (filters.job === "" || business.job.toLowerCase().includes(filters.job.toLowerCase())) &&
            (filters.category === "" || business.category.toLowerCase().includes(filters.category.toLowerCase())) &&
            (filters.location === "" || business.location.toLowerCase().includes(filters.location.toLowerCase())) &&
            (filters.employeeSize === "" || business.employeeSize === filters.employeeSize) &&
            (filters.revenue === "" || business.revenue === filters.revenue) &&
            (filters.keywords === "" ||
                business.keywords.some((keyword) => keyword.toLowerCase().includes(filters.keywords.toLowerCase())))
        )
    })

    return (
        <div className=" bg-gray-50">
            {/* Header */}
            <div className="bg-white  border-gray-200 px-6 py-4 shadow-md border-b rounded-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className=""> <IoBusinessSharp size={20} />
                        </div>
                        <h1 className="text-xl font-semibold text-gray-900">Businesses Search</h1>
                    </div>
                    <div className="border px-3 py-1 rounded-md text-blue-600 border-black font-medium ">50 Search Credits available</div>
                </div>
            </div>

            <div className="flex">
                {/* Filter Section */}
                <div className="w-1/5 bg-white border rounded-md shadow-md border-gray-200 p-6 mt-2 ">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-medium text-gray-900">Filters</h2>
                        <button onClick={resetFilters} className="text-blue-600 text-sm hover:text-blue-800 underline cursor-pointer">
                            Reset
                        </button>
                    </div>

                    <div className="space-y-2">
                        {/* Company Filter */}
                        <div className="border-b border-gray-200">
                            <button
                                onClick={() => toggleFilter("company")}
                                className="w-full flex items-center justify-between py-4 text-left  transition-colors"
                            >
                                <span className={`text-[18px] font-medium ${openFilter === "company" ? "text-blue-600" : "text-gray-700"}`}>
                                    Company
                                </span>
                                <span
                                    className={`text-[24px] font-light transition-transform duration-200 ${openFilter === "company" ? "text-blue-600" : "text-gray-400"}`}
                                >
                                    {openFilter === "company" ? "−" : "+"}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFilter === "company" ? "max-h-20 pb-4" : "max-h-0"}`}
                            >
                                <input
                                    type="text"
                                    value={filters.company}
                                    onChange={(e) => handleFilterChange("company", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500  bg-gray-50"
                                    placeholder="Enter here"
                                />
                            </div>
                        </div>

                        {/* Job Filter */}
                        <div className="border-b border-gray-200">
                            <button
                                onClick={() => toggleFilter("job")}
                                className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className={`text-[18px] font-medium ${openFilter === "job" ? "text-blue-600" : "text-gray-700"}`}>
                                    Job
                                </span>
                                <span
                                    className={`text-[24px] font-light transition-transform duration-200 ${openFilter === "job" ? "text-blue-600" : "text-gray-400"}`}
                                >
                                    {openFilter === "job" ? "−" : "+"}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFilter === "job" ? "max-h-20 pb-4" : "max-h-0"}`}
                            >
                                <input
                                    type="text"
                                    value={filters.job}
                                    onChange={(e) => handleFilterChange("job", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 bg-gray-50"
                                    placeholder="Enter here"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="border-b border-gray-200">
                            <button
                                onClick={() => toggleFilter("category")}
                                className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span
                                    className={`text-[18px] font-medium ${openFilter === "category" ? "text-blue-600" : "text-gray-700"}`}
                                >
                                    Category
                                </span>
                                <span
                                    className={`text-[24px] font-light transition-transform duration-200 ${openFilter === "category" ? "text-blue-600" : "text-gray-400"}`}
                                >
                                    {openFilter === "category" ? "−" : "+"}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFilter === "category" ? "max-h-20 pb-4" : "max-h-0"}`}
                            >
                                <select
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange("category", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 bg-gray-50"
                                >
                                    <option value="">Enter here</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Construction">Construction</option>
                                    <option value="Education">Education</option>
                                </select>
                            </div>
                        </div>

                        {/* Location Filter */}
                        <div className="border-b border-gray-200">
                            <button
                                onClick={() => toggleFilter("location")}
                                className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span
                                    className={`text-[18px] font-medium ${openFilter === "location" ? "text-blue-600" : "text-gray-700"}`}
                                >
                                    Location
                                </span>
                                <span
                                    className={`text-[24px] font-light transition-transform duration-200 ${openFilter === "location" ? "text-blue-600" : "text-gray-400"}`}
                                >
                                    {openFilter === "location" ? "−" : "+"}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFilter === "location" ? "max-h-20 pb-4" : "max-h-0"}`}
                            >
                                <select
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange("location", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 bg-gray-50"
                                >
                                    <option value="">Enter here</option>
                                    <option value="Austin, TX">Austin, TX</option>
                                    <option value="Dallas, TX">Dallas, TX</option>
                                    <option value="Houston, TX">Houston, TX</option>
                                    <option value="San Antonio, TX">San Antonio, TX</option>
                                    <option value="Fort Worth, TX">Fort Worth, TX</option>
                                    <option value="Plano, TX">Plano, TX</option>
                                </select>
                            </div>
                        </div>

                        {/* Employee Size Filter */}
                        <div className="border-b border-gray-200">
                            <button
                                onClick={() => toggleFilter("employeeSize")}
                                className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span
                                    className={`text-[18px] font-medium ${openFilter === "employeeSize" ? "text-blue-600" : "text-gray-700"}`}
                                >
                                    Employee size
                                </span>
                                <span
                                    className={`text-[24px] font-light transition-transform duration-200 ${openFilter === "employeeSize" ? "text-blue-600" : "text-gray-400"}`}
                                >
                                    {openFilter === "employeeSize" ? "−" : "+"}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFilter === "employeeSize" ? "max-h-20 pb-4" : "max-h-0"}`}
                            >
                                <select
                                    value={filters.employeeSize}
                                    onChange={(e) => handleFilterChange("employeeSize", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 bg-gray-50"
                                >
                                    <option value="">Enter here</option>
                                    <option value="1-10">1-10</option>
                                    <option value="11-50">11-50</option>
                                    <option value="51-100">51-100</option>
                                    <option value="51-200">51-200</option>
                                    <option value="101-200">101-200</option>
                                    <option value="201-500">201-500</option>
                                    <option value="501-1000">501-1000</option>
                                </select>
                            </div>
                        </div>

                        {/* Revenue Filter */}
                        <div className="border-b border-gray-200">
                            <button
                                onClick={() => toggleFilter("revenue")}
                                className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className={`text-[18px] font-medium ${openFilter === "revenue" ? "text-blue-600" : "text-gray-700"}`}>
                                    Revenue
                                </span>
                                <span
                                    className={`text-[24px] font-light transition-transform duration-200 ${openFilter === "revenue" ? "text-blue-600" : "text-gray-400"}`}
                                >
                                    {openFilter === "revenue" ? "−" : "+"}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFilter === "revenue" ? "max-h-20 pb-4" : "max-h-0"}`}
                            >
                                <select
                                    value={filters.revenue}
                                    onChange={(e) => handleFilterChange("revenue", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 bg-gray-50"
                                >
                                    <option value="">Enter here</option>
                                    <option value="0-1M">0-1M</option>
                                    <option value="1M-5M">1M-5M</option>
                                    <option value="5M-10M">5M-10M</option>
                                    <option value="10M-50M">10M-50M</option>
                                    <option value="20M-50M">20M-50M</option>
                                    <option value="50M-100M">50M-100M</option>
                                </select>
                            </div>
                        </div>

                        {/* Keywords Filter */}
                        <div className="border-b border-gray-200">
                            <button
                                onClick={() => toggleFilter("keywords")}
                                className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span
                                    className={`text-[18px] font-medium ${openFilter === "keywords" ? "text-blue-600" : "text-gray-700"}`}
                                >
                                    Keywords
                                </span>
                                <span
                                    className={`text-[24px] font-light transition-transform duration-200 ${openFilter === "keywords" ? "text-blue-600" : "text-gray-400"}`}
                                >
                                    {openFilter === "keywords" ? "−" : "+"}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFilter === "keywords" ? "max-h-20 pb-4" : "max-h-0"}`}
                            >
                                <input
                                    type="text"
                                    value={filters.keywords}
                                    onChange={(e) => handleFilterChange("keywords", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 bg-gray-50"
                                    placeholder="Enter here"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button className="w-full mt-8 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium text-xl">
                        Search
                    </button>
                </div>

                {/* Data Display Section */}
                <div className="w-4/5 p-6">
                    {!hasActiveFilters ? (
                        // Show imported image when no filters are active
                        <div className="flex flex-col items-center justify-center h-full">
                            <img
                                src={img}
                                alt="Dashboard Preview"
                                className="max-w-full max-h-full object-contain"
                            />
                            <h1 className="text-3xl font-semibold">No Data available</h1>
                        </div>
                    ) : (
                        // Show filtered results
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 mt-2">Search Results</h2>

                            {filteredData.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">No businesses found matching your criteria.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredData.map((business) => (
                                        <div key={business.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start space-x-4">
                                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-semibold text-lg">{business.company.charAt(0)}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{business.company}</h3>
                                                            <div className="flex items-center space-x-2 ml-4">
                                                                <MdOutlineLocationOn className="text-gray-500" />

                                                                <span className="text-gray-500 text-sm">{business.location}</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">{business.description}</p>

                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex items-center justify-between pl-16">
                                                <div className="flex items-center space-x-4 text-sm text-gray-500 pt-5">
                                                    <span className="flex items-center">
                                                        <span className="w-4 h-4 mr-1 -mt-2">👥</span>
                                                        Employee: {business.employees}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <span className="w-4 h-4 mr-1 -mt-1">🌐</span>
                                                        Website: {business.website}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-end space-x-3 mt-4">

                                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                                                        Save
                                                    </button>

                                                    <NavLink to="/dashboard/company_details">
                                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
                                                            View
                                                        </button>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard

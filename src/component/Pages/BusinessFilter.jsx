"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"

const BusinessFilter = () => {
    const [showFilters, setShowFilters] = useState(false)
    const [selectedEmployeeSize, setSelectedEmployeeSize] = useState("")
    const [searchKeywords, setSearchKeywords] = useState("")
    const [location, setLocation] = useState("")
    const [category, setCategory] = useState("")

    const employeeSizeOptions = [
        { value: "2-10", label: "2-10" },
        { value: "11-50", label: "11-50" },
        { value: "51-200", label: "51-200" },
        { value: "201-500", label: "201-500" },
        { value: "501-1000", label: "501-1000" },
        { value: "1000+", label: "1000+" },
    ]

    const handleReset = () => {
        setSearchKeywords("")
        setLocation("")
        setCategory("")
        setSelectedEmployeeSize("")
    }

    const handleSearch = () => {
        const searchData = {
            keywords: searchKeywords,
            location: location,
            category: category,
            employeeSize: selectedEmployeeSize,
        }
        console.log("Search data:", searchData)
        alert("Search functionality triggered! Check console for data.")
    }

    return (
        <div className="min-h-screen border-b border-gray-300">
            <div className="py-8 pb-32">
                <h1 className="text-5xl font-semibold text-center pb-2">Find the Right Business Partner for Your Goals</h1>
                <p className="text-md font-medium text-gray-600 text-center">Discover companies and professionals that align with your vision—perfect for strategic outreach and collaboration.</p>
            </div>
            <div className="container mx-auto bg-white">
                {/* Top Search Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Search Keywords */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search for Business or keywords"
                            value={searchKeywords}
                            onChange={(e) => setSearchKeywords(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>

                    {/* Location */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Location (City, State, Country etc)"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                {/* Filter Toggle and Reset Row */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                            />
                        </svg>
                        {showFilters ? "Hide filters" : "Show filters"}
                        <svg
                            className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <button onClick={handleReset} className="text-gray-500 hover:text-gray-700 font-medium">
                        Reset
                    </button>
                </div>

                {/* Additional Filters (Collapsible) */}
                {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-in slide-in-from-top duration-300">
                        {/* Category */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Categories the industry (Ex. Real estate, food etc)"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>

                        {/* Employee Size Dropdown */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <select
                                value={selectedEmployeeSize}
                                onChange={(e) => setSelectedEmployeeSize(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                            >
                                <option value="">Employee size</option>
                                {employeeSizeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Employee Size Options Display */}
                        {showFilters && (
                            <div className="md:col-span-2">
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {employeeSizeOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setSelectedEmployeeSize(option.value)}
                                            className={`px-3 py-1 text-sm rounded-full border transition-colors ${selectedEmployeeSize === option.value
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Search Button */}
                <div className="flex justify-center">
                    <NavLink to="/business_Partner">
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            Search Business
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default BusinessFilter

import { IoBusinessSharp } from "react-icons/io5";
import img from "../../../image/Layer 1.png";

import { useState, useEffect } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useBusinessSearchMutation, useSaveCompanyMutation, useGetCountryOptionsMutation } from "../../../Redux/feature/ApiSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Dashboard = () => {
  // Initialize state from localStorage or defaults
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem('dashboardFilters');
    return savedFilters ? JSON.parse(savedFilters) : {
      company: "",
      job: "",
      category: "",
      location: "",
      employeeSize: "",
      revenue: "",
      keywords: "",
    };
  });

  const [openFilter, setOpenFilter] = useState(null);
  const [searchResults, setSearchResults] = useState(() => {
    const savedResults = localStorage.getItem('dashboardSearchResults');
    return savedResults ? JSON.parse(savedResults) : [];
  });
  const [isSearching, setIsSearching] = useState(false);
  const [savedCompaniesCount, setSavedCompaniesCount] = useState(0);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  // API hooks
  const [businessSearch, { isLoading: isSearchLoading }] = useBusinessSearchMutation();
  const [saveCompany] = useSaveCompanyMutation();
  const [getCountryOptions, { isLoading: isLoadingCountries }] = useGetCountryOptionsMutation();

  // Country options state
  const [countryOptions, setCountryOptions] = useState([]);

  // Load countries on component mount
  useEffect(() => {
    loadCountries();
  }, [getCountryOptions]);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dashboardFilters', JSON.stringify(filters));
  }, [filters]);

  // Save search results to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dashboardSearchResults', JSON.stringify(searchResults));
  }, [searchResults]);

  // Function to load countries
  const loadCountries = async () => {
    try {
      console.log('🌍 Dashboard - Loading countries...');
      const response = await getCountryOptions().unwrap();
      console.log('🌍 Dashboard - Country options response:', response);

      if (response && response.options && Array.isArray(response.options)) {
        setCountryOptions(response.options);
        console.log('🌍 Dashboard - Countries loaded:', response.options);
      } else {
        console.log('⚠️ Dashboard - Unexpected country response format:', response);
        setCountryOptions([]);
      }
    } catch (error) {
      console.error('❌ Dashboard - Failed to load countries:', error);
      setCountryOptions([]);
    }
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
  };

  const toggleFilter = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  // Reset filters - only clears results when explicitly called by user
  const resetFilters = () => {
    const defaultFilters = {
      company: "",
      job: "",
      category: "",
      location: "",
      employeeSize: "",
      revenue: "",
      keywords: "",
    };
    setFilters(defaultFilters);
    setOpenFilter(null);
    setSearchResults([]); // Only clear results on explicit reset
    setIsSearching(false);
    setExpandedDescriptions({}); // Clear expanded descriptions on reset

    // Clear localStorage
    localStorage.removeItem('dashboardFilters');
    localStorage.removeItem('dashboardSearchResults');
  };

  // Helper function to truncate description to 90 words
  const truncateDescription = (description, wordLimit = 90) => {
    if (!description) return 'No description available';
    const words = description.split(' ');
    if (words.length <= wordLimit) return description;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  // Toggle description expansion
  const toggleDescription = (businessId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [businessId]: !prev[businessId]
    }));
  };



  // Handle business search
  const handleSearch = async () => {
    try {
      setIsSearching(true);

      // Validate that a country is selected
      if (!filters.location) {
        toast.error('Please select a country to search');
        setIsSearching(false);
        return;
      }

      // Prepare search data according to API format
      const searchData = {
        company_name: filters.company || "",
        location: [filters.location],
        category: filters.category || "",
        company_size: filters.employeeSize || "",
        previous_results_count: 0
      };

      console.log('🔍 Searching with data:', searchData);

      const response = await businessSearch(searchData).unwrap();
      console.log('✅ Search results:', response);

      // Ensure searchResults is always an array
      let results = [];
      if (response && Array.isArray(response.result)) {
        results = response.result;
      } else if (response && Array.isArray(response.results)) {
        results = response.results;
      } else if (response && Array.isArray(response)) {
        results = response;
      } else {
        console.warn('⚠️ Unexpected response format:', response);
        results = [];
      }

      setSearchResults(results);
      toast.success(`Found ${results.length} companies`);

    } catch (error) {
      console.error('❌ Search error:', error);
      toast.error(error?.data?.message || 'Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle save company
  const handleSaveCompany = async (companyId) => {
    try {
      console.log('💾 Saving company:', companyId);
      await saveCompany(companyId).unwrap();
      setSavedCompaniesCount(prev => prev + 1); // Increment counter
      toast.success('Company saved successfully!');
    } catch (error) {
      console.error('❌ Save error:', error);
      if (error.status === 401) {
        toast.error('Please log in to save companies');
      } else {
        toast.error(error?.data?.message || 'Failed to save company');
      }
    }
  };



  return (
    <div className=" bg-gray-50">
      {/* Header */}
      <div className="bg-white  border-gray-200 px-6 py-4 shadow-md border-b rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="">
              {" "}
              <IoBusinessSharp size={20} />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Businesses Search
            </h1>
          </div>
          <div className="flex space-x-3">
            <div className="border px-3 py-1 rounded-md text-blue-600 border-black font-medium">
              50 Search Credits available
            </div>
            <div className="border px-3 py-1 rounded-md text-green-600 border-green-500 font-medium">
              Saved: {savedCompaniesCount} companies
            </div>
          </div>
        </div>
      </div>

      {/* Debug Panel for Saved Companies */}
      {/* <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <h3 className="font-semibold text-yellow-800 mb-2">🔍 Debug: Saved Companies API</h3>
        <div className="text-sm space-y-1">
          <p><strong>Available Endpoint:</strong> /search/company/{`{id}`}/saved/ (check if specific company is saved)</p>
          <p><strong>Note:</strong> No endpoint found for getting all saved companies</p>
          <p><strong>Saved Count:</strong> {savedCompaniesCount} (manually tracked)</p>
          <p><strong>Test:</strong> Use buttons below to test individual company saved status</p>
        </div>
        <div className="mt-2 space-x-2">
          <button
            onClick={() => {
              console.log('🔍 Saved Companies Debug:');
              console.log('Saved Count:', savedCompaniesCount);
              console.log('Search Results:', searchResults);
            }}
            className="px-3 py-1 bg-yellow-500 text-white rounded text-xs"
          >
            Log to Console
          </button>

          <button
            onClick={async () => {
              try {
                console.log('🔄 Testing individual company saved status...');
                const token = localStorage.getItem('accessToken');
                const testCompanyId = 1; 
                const response = await fetch(`https://multiply-mint-ghost.ngrok-free.app/search/company/${testCompanyId}/saved/`, {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                  }
                });
                const data = await response.json();
                console.log(`Company ${testCompanyId} saved status:`, data);
                toast.info(`Company ${testCompanyId}: ${response.status} - ${JSON.stringify(data)}`);
              } catch (error) {
                console.error(' Individual test error:', error);
                toast.error('Individual test failed');
              }
            }}
            className="px-3 py-1 bg-green-500 text-white rounded text-xs"
          >
            Test Company 1 Saved
          </button>
        </div>
      </div> */}

      <div className="flex">
        {/* Filter Section */}
        <div className="w-1/5 bg-white border rounded-md shadow-md border-gray-200 p-6 mt-2 ">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-medium text-gray-900">Filters</h2>
            <button
              onClick={resetFilters}
              className="text-blue-600 text-sm hover:text-blue-800 underline cursor-pointer"
            >
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
                <span
                  className={`text-[18px] font-medium ${
                    openFilter === "company" ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  Company
                </span>
                <span
                  className={`text-[24px] font-light transition-transform duration-200 ${
                    openFilter === "company" ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {openFilter === "company" ? "−" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFilter === "company" ? "max-h-20 pb-4" : "max-h-0"
                }`}
              >
                <input
                  type="text"
                  value={filters.company}
                  onChange={(e) =>
                    handleFilterChange("company", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500  bg-gray-50"
                  placeholder="Enter here"
                />
              </div>
            </div>

            {/* Job Filter */}
            {/* <div className="border-b border-gray-200">
              <button
                onClick={() => toggleFilter("job")}
                className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span  
                  className={`text-[18px] font-medium ${
                    openFilter === "job" ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  Job
                </span>
                <span
                  className={`text-[24px] font-light transition-transform duration-200 ${
                    openFilter === "job" ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {openFilter === "job" ? "−" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFilter === "job" ? "max-h-20 pb-4" : "max-h-0"
                }`}
              >
                <input
                  type="text"
                  value={filters.job}
                  onChange={(e) => handleFilterChange("job", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 bg-gray-50"
                  placeholder="Enter here"
                />
              </div>
            </div> */}

            {/* Category Filter */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleFilter("category")}
                className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span
                  className={`text-[18px] font-medium ${
                    openFilter === "category"
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  Category
                </span>
                <span
                  className={`text-[24px] font-light transition-transform duration-200 ${
                    openFilter === "category"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  {openFilter === "category" ? "−" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFilter === "category" ? "max-h-20 pb-4" : "max-h-0"
                }`}
              >
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
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
                  className={`text-[18px] font-medium ${
                    openFilter === "location"
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  Location
                </span>
                <span
                  className={`text-[24px] font-light transition-transform duration-200 ${
                    openFilter === "location"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  {openFilter === "location" ? "−" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFilter === "location" ? "max-h-20 pb-4" : "max-h-0"
                }`}
              >
                <select
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 bg-gray-50"
                  disabled={isLoadingCountries}
                >
                  <option value="">Select Country</option>
                  {isLoadingCountries ? (
                    <option disabled>Loading countries...</option>
                  ) : (
                    countryOptions.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))
                  )}
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
                  className={`text-[18px] font-medium ${
                    openFilter === "employeeSize"
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  Employee size
                </span>
                <span
                  className={`text-[24px] font-light transition-transform duration-200 ${
                    openFilter === "employeeSize"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  {openFilter === "employeeSize" ? "−" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFilter === "employeeSize" ? "max-h-20 pb-4" : "max-h-0"
                }`}
              >
                <select
                  value={filters.employeeSize}
                  onChange={(e) =>
                    handleFilterChange("employeeSize", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 bg-gray-50"
                >
                  <option value="">Enter here</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-100">51-100</option>
                  <option value="51-200">51-200</option>
                  <option value="101-200">101-200</option>
                  <option value="201-500">201-500</option>
                
                </select>
              </div>
            </div>

            {/* Revenue Filter */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleFilter("revenue")}
                className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span
                  className={`text-[18px] font-medium ${
                    openFilter === "revenue" ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  Revenue
                </span>
                <span
                  className={`text-[24px] font-light transition-transform duration-200 ${
                    openFilter === "revenue" ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {openFilter === "revenue" ? "−" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFilter === "revenue" ? "max-h-20 pb-4" : "max-h-0"
                }`}
              >
                <select
                  value={filters.revenue}
                  onChange={(e) =>
                    handleFilterChange("revenue", e.target.value)
                  }
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
            {/* <div className="border-b border-gray-200">
              <button
                onClick={() => toggleFilter("keywords")}
                className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span
                  className={`text-[18px] font-medium ${
                    openFilter === "keywords"
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  Keywords
                </span>
                <span
                  className={`text-[24px] font-light transition-transform duration-200 ${
                    openFilter === "keywords"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  {openFilter === "keywords" ? "−" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFilter === "keywords" ? "max-h-20 pb-4" : "max-h-0"
                }`}
              >
                <input
                  type="text"
                  value={filters.keywords}
                  onChange={(e) =>
                    handleFilterChange("keywords", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 bg-gray-50"
                  placeholder="Enter here"
                />
              </div>
            </div> */}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isSearchLoading || isSearching}
            className="w-full mt-8 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearchLoading || isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Data Display Section */}
        <div className="w-4/5 p-6">
          {(!Array.isArray(searchResults) || searchResults.length === 0) && !isSearching ? (
            // Show imported image when no search results
            <div className="flex flex-col items-center justify-center h-full">
              <img
                src={img}
                alt="Dashboard Preview"
                className="max-w-full max-h-full object-contain"
              />
              <h1 className="text-3xl font-semibold">No Data available</h1>
              <p className="text-gray-500 mt-2">Use the filters and click Search to find companies</p>
            </div>
          ) : (
            // Show search results
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 mt-2">
                Search Results ({Array.isArray(searchResults) ? searchResults.length : 0})
              </h2>

              {isSearching ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Searching for companies...</p>
                </div>
              ) : (!Array.isArray(searchResults) || searchResults.length === 0) ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No businesses found matching your criteria.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.isArray(searchResults) && searchResults.map((business) => (
                    <div
                      key={business.id || business.name}
                      className="bg-white border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                              {(business.name || 'C').charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {business.name || 'Unknown Company'}
                              </h3>
                              <div className="flex items-center space-x-2 ml-4">
                                <MdOutlineLocationOn className="text-gray-500" />
                                <span className="text-gray-500 text-sm">
                                  {business.location || 'Location not available'}
                                </span>
                              </div>
                            </div>
                            <div className="text-gray-600 text-sm mb-3 leading-relaxed">
                              <p>
                                {expandedDescriptions[business.name]
                                  ? (business.description || 'No description available')
                                  : truncateDescription(business.description)
                                }
                              </p>
                              {business.description && business.description.split(' ').length > 90 && (
                                <button
                                  onClick={() => toggleDescription(business.name)}
                                  className="text-blue-600 hover:text-blue-800 text-xs mt-1 font-medium"
                                >
                                  {expandedDescriptions[business.name] ? 'See less' : 'See more'}
                                </button>
                              )}
                            </div>
                            {business.category && (
                              <div className="mb-3">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {business.category}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pl-16">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 pt-5">
                          <span className="flex items-center">
                            <span className="w-4 h-4 mr-1 -mt-2">👥</span>
                            Employees: {business.employee_size || 'N/A'}
                          </span>
                          {business.domain && (
                            <span className="flex items-center">
                              <span className="w-4 h-4 mr-1 -mt-1">🌐</span>
                              Website: {business.domain}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-end space-x-3 mt-4">
                          <button
                            onClick={() => handleSaveCompany(business.id)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            Save
                          </button>

                          <NavLink
                            to="/dashboard/company_details"
                            state={{ companyData: business }}
                          >
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
      <ToastContainer />
    </div>
  );
};

export default Dashboard;

import { useState, useMemo, useEffect, useCallback } from "react"
import { useSearchcompanyMutation } from "../../Redux/feature/ApiSlice"

const BusinessPartner = () => {
  // API hook for company search
  const [searchCompany, { isLoading: isSearching }] = useSearchcompanyMutation()

  // State for companies and search
  const [companies, setCompanies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Filter states
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    company_size: "",
  })

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchData) => {
      try {
        console.log('🔍 Searching with data:', searchData)
        const response = await searchCompany(searchData).unwrap()
        console.log('✅ Search results:', response)

        // Handle different response formats
        const results = response.results || response.companies || response || []
        setCompanies(Array.isArray(results) ? results : [])
        setIsInitialLoad(false)
      } catch (error) {
        console.error('❌ Search failed:', error)
        setCompanies([])
        setIsInitialLoad(false)
      }
    }, 500),
    [searchCompany]
  )

  // Debounce utility function
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Selection states
  const [selectedCompanies, setSelectedCompanies] = useState(new Set())
  const [viewBy, setViewBy] = useState("Name")
  const [isFilterOpen, setIsFilterOpen] = useState(false) // Mobile filter toggle

  // Effect to trigger search when searchTerm or filters change
  useEffect(() => {
    const searchData = {
      company_name: searchTerm,
      location: filters.location ? [filters.location] : [],
      category: filters.category,
      company_size: filters.company_size,
    }

    // Only search if there's a search term or any filter is applied
    if (searchTerm.trim() || filters.category || filters.location || filters.company_size) {
      debouncedSearch(searchData)
    } else if (!isInitialLoad) {
      // Clear results if no search criteria
      setCompanies([])
    }
  }, [searchTerm, filters, debouncedSearch, isInitialLoad])

  // Since we're getting filtered results from API, just return companies
  const filteredCompanies = useMemo(() => {
    return companies
  }, [companies])

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: "",
      location: "",
      company_size: "",
    })
    setSearchTerm("")
    setCompanies([])
    setIsFilterOpen(false) // Close filter on mobile
  }

  // Handle company selection
  const toggleCompanySelection = (companyId) => {
    setSelectedCompanies((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(companyId)) {
        newSet.delete(companyId)
      } else {
        newSet.add(companyId)
      }
      return newSet
    })
  }

  // Save selected list
  const saveSelectedList = () => {
    const selectedList = companies.filter((company) => selectedCompanies.has(company.id))
    console.log("Selected companies:", selectedList)
    alert(`Saved ${selectedList.length} companies to your list!`)
  }

  // Toggle filter visibility on mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <div id="service" className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="text-center mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 pb-2">
          Find the Right Business Partner for Your Goals
        </h1>
        <p className="text-sm sm:text-base lg:text-md font-medium text-gray-600">
          Discover companies and professionals that align with your vision—perfect for strategic outreach and collaboration.
        </p>
      </div>
      <div className="flex flex-col lg:flex lg:flex-row  container mx-auto">
        {/* Filter Toggle Button for Mobile */}
        <div className="lg:hidden mb-4">
          <button
            onClick={toggleFilter}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Filter Section */}
        <div
          className={`w-full lg:w-1/5 bg-white p-4 sm:p-5 lg:p-6 m-0 sm:m-4 lg:m-5 shadow-md rounded-xl border border-gray-200 h-fit transition-all duration-300 lg:block ${
            isFilterOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span className="font-medium text-gray-700 text-lg sm:text-xl lg:text-2xl">Filters</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-blue-600 text-sm sm:text-sm hover:text-blue-700 cursor-pointer underline"
            >
              Reset
            </button>
          </div>

          {/* Business Category Filter */}
          <div className="mb-4 sm:mb-5 lg:mb-6">
            <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1 sm:mb-2">
              Business Category
            </label>
            <input
              type="text"
              placeholder="Enter category"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 border-b border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Location Filter */}
          <div className="mb-4 sm:mb-5 lg:mb-6">
            <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1 sm:mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter location"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 border-b border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Company Size Filter */}
          <div className="mb-4 sm:mb-5 lg:mb-6">
            <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1 sm:mb-2">
              Company Size
            </label>
            <div className="space-y-2">
              <select
                value={`${filters.minSize}-${filters.maxSize}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split('-').map(Number)
                  handleFilterChange('minSize', min)
                  handleFilterChange('maxSize', max)
                }}
                className="w-full px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {`${filters.minSize}-${filters.maxSize}` === '-' || !['2-10', '11-50', '51-200', '201-500', '501-1000'].includes(`${filters.minSize}-${filters.maxSize}`) ? (
                  <option value="">Select size range</option>
                ) : null}
                <option value="2-10">2-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-4/5 p-4 sm:p-5 lg:p-6">
          {/* Selected Bar */}
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-5 lg:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCompanies.size > 0}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-xs sm:text-sm font-medium">
                    {selectedCompanies.size.toString().padStart(2, "0")} Selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-600">View by:</span>
                  <select
                    value={viewBy}
                    onChange={(e) => setViewBy(e.target.value)}
                    className="text-xs sm:text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Name">Name</option>
                    <option value="Location">Location</option>
                    <option value="Category">Category</option>
                  </select>
                </div>
              </div>
              <button
                onClick={saveSelectedList}
                disabled={selectedCompanies.size === 0}
                className="bg-[#645CE8] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Save Selected list
              </button>
            </div>
          </div>

          {/* Company Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow-sm border border-gray-200 relative"
              >
                {/* Selection Checkbox */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <input
                    type="checkbox"
                    checked={selectedCompanies.has(company.id)}
                    onChange={() => toggleCompanySelection(company.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                {/* Company Info */}
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <img
                    src={company.avatar || "/placeholder.svg"}
                    alt={company.name}
                    className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 text-base sm:text-lg lg:text-lg">
                      {company.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                      {company.description}
                    </p>
                  </div>
                </div>

                {/* Company Details */}
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {company.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    {company.category}
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {company.size}
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                      />
                    </svg>
                    <a href={`https://${company.website}`} className="hover:underline">
                      {company.website}
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <button className="flex-1 bg-[#645CE8] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Find the decision makers
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-gray-200 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Generate Email
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredCompanies.length === 0 && (
            <div className="text-center py-8 sm:py-10 lg:py-12">
              <p className="text-gray-500 text-sm sm:text-base">
                No companies found matching your filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm sm:text-base"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BusinessPartner
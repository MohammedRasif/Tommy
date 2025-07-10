import { debounce } from "lodash"

import { useState, useEffect, useCallback } from "react"
import { NavLink } from "react-router-dom"
import { useBusinessSearchMutation, useGetCountryOptionsMutation } from "../../Redux/feature/ApiSlice"

const BusinessFilter = () => {
    // API hooks
    const [searchCompany, { isLoading: isSearching }] = useBusinessSearchMutation()
    const [getCountryOptions, { isLoading: isLoadingCountries }] = useGetCountryOptionsMutation()

    // Form states
    const [showFilters, setShowFilters] = useState(false)
    const [selectedEmployeeSize, setSelectedEmployeeSize] = useState("")
    const [searchKeywords, setSearchKeywords] = useState("")
    const [location, setLocation] = useState("")
    const [category, setCategory] = useState("")

    // Hierarchical location states
    const [selectedCountry, setSelectedCountry] = useState("")
    const [selectedState, setSelectedState] = useState("")
    const [selectedCity, setSelectedCity] = useState("")
    const [stateOptions, setStateOptions] = useState([])
    const [cityOptions, setCityOptions] = useState([])
    const [isLoadingStates, setIsLoadingStates] = useState(false)
    const [isLoadingCities, setIsLoadingCities] = useState(false)

    // Country options state
    const [countryOptions, setCountryOptions] = useState([])

    // Search results state
    const [searchResults, setSearchResults] = useState([])
    const [showResults, setShowResults] = useState(false)

    const employeeSizeOptions = [
        { value: "2-10", label: "2-10" },
        { value: "11-50", label: "11-50" },
        { value: "51-200", label: "51-200" },
        { value: "201-500", label: "201-500" },
        { value: "501-1000", label: "501-1000" },
        { value: "1000+", label: "1000+" },
    ]

    // Handle country selection
    const handleCountryChange = (country) => {
        setSelectedCountry(country)
        setSelectedState("")
        setSelectedCity("")
        setStateOptions([])
        setCityOptions([])

        // Update the main location state for backward compatibility
        setLocation(country)

        if (country) {
            loadStates(country)
        }
    }

    // Handle state selection
    const handleStateChange = (state) => {
        setSelectedState(state)
        setSelectedCity("")
        setCityOptions([])

        // Update location to include state
        const locationPath = selectedCountry + (state ? `, ${state}` : "")
        setLocation(locationPath)

        if (state && selectedCountry) {
            loadCities(selectedCountry, state)
        }
    }

    // Handle city selection
    const handleCityChange = (city) => {
        setSelectedCity(city)

        // Update location to include city
        const locationPath = selectedCountry +
                            (selectedState ? `, ${selectedState}` : "") +
                            (city ? `, ${city}` : "")
        setLocation(locationPath)
    }

    // Load countries on component mount
    useEffect(() => {
        loadCountries()
    }, [getCountryOptions])

    // Function to load countries
    const loadCountries = async () => {
        try {
            console.log('🌍 Loading countries...')
            const response = await getCountryOptions().unwrap()
            console.log('🌍 Country options response:', response)

            if (response && response.options && Array.isArray(response.options)) {
                setCountryOptions(response.options)
                console.log('🌍 Countries loaded:', response.options)
            } else {
                console.log('⚠️ Unexpected country response format:', response)
                setCountryOptions([])
            }
        } catch (error) {
            console.error('❌ Failed to load countries:', error)
            setCountryOptions([])
        }
    }

    // Function to load states/regions for selected country
    const loadStates = async (country) => {
        try {
            setIsLoadingStates(true)
            console.log('🏛️ Loading states for country:', country)

            const response = await fetch('https://multiply-mint-ghost.ngrok-free.app/search/get_country_options/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({
                    location_path: [country]
                })
            })

            const data = await response.json()
            console.log('🏛️ States response:', data)

            if (data && data.options && Array.isArray(data.options)) {
                setStateOptions(data.options)
                console.log('🏛️ States loaded:', data.options)
            } else {
                setStateOptions([])
            }
        } catch (error) {
            console.error('❌ Failed to load states:', error)
            setStateOptions([])
        } finally {
            setIsLoadingStates(false)
        }
    }

    // Function to load cities for selected state
    const loadCities = async (country, state) => {
        try {
            setIsLoadingCities(true)
            console.log('🏙️ Loading cities for:', { country, state })

            const response = await fetch('https://multiply-mint-ghost.ngrok-free.app/search/get_country_options/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({
                    location_path: [country, state]
                })
            })

            const data = await response.json()
            console.log('🏙️ Cities response:', data)

            if (data && data.options && Array.isArray(data.options)) {
                setCityOptions(data.options)
                console.log('🏙️ Cities loaded:', data.options)
            } else {
                setCityOptions([])
            }
        } catch (error) {
            console.error('❌ Failed to load cities:', error)
            setCityOptions([])
        } finally {
            setIsLoadingCities(false)
        }
    }

    const categoryOptions = [
        "Technology",
        "Healthcare",
        "Finance",
        "Education",
        "Manufacturing",
        "Retail",
        "Real Estate",
        "Consulting",
        "Marketing",
        "Other"
    ]

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce(async (searchData) => {
            try {
                console.log('🔍 Real-time searching with data:', searchData)
                const response = await searchCompany(searchData).unwrap()
                console.log('✅ Search API response:', response)
                
                if (response && response.results) {
                    setSearchResults(response.results)
                    setShowResults(true)
                } else if (Array.isArray(response)) {
                    setSearchResults(response)
                    setShowResults(true)
                } else {
                    console.log('⚠️ Unexpected response format:', response)
                    setSearchResults([])
                    setShowResults(false)
                }
            } catch (error) {
                console.error('❌ Search error:', error)
                setSearchResults([])
                setShowResults(false)
            }
        }, 300), // 300ms delay for real-time feel
        [searchCompany]
    )

    // Effect to trigger real-time search
    useEffect(() => {
        console.log('🔍 Search effect triggered:', {
            searchKeywords,
            selectedCountry,
            selectedState,
            selectedCity,
            category,
            selectedEmployeeSize
        })

        // Only search if there's a search term (at least 2 characters) AND a country is selected
        if (searchKeywords.trim().length >= 2 && selectedCountry) {
            // Build hierarchical location array
            const locationArray = [selectedCountry]
            if (selectedState) locationArray.push(selectedState)
            if (selectedCity) locationArray.push(selectedCity)

            const searchData = {
                company_name: searchKeywords,
                location: locationArray, // Send hierarchical location array
                category: category,
                company_size: selectedEmployeeSize,
                previous_results_count: 0
            }
            console.log('📤 About to search with hierarchical location data:', searchData)
            debouncedSearch(searchData)
        } else {
            // Clear results if search term is too short or no country selected
            if (searchKeywords.trim().length < 2) {
                console.log('❌ Search term too short, clearing results')
            } else if (!selectedCountry) {
                console.log('❌ No country selected, clearing results')
            }
            setSearchResults([])
            setShowResults(false)
        }
    }, [searchKeywords, selectedCountry, selectedState, selectedCity, category, selectedEmployeeSize, debouncedSearch])

    const handleReset = () => {
        setSearchKeywords("")
        setLocation("")
        setCategory("")
        setSelectedEmployeeSize("")

        // Reset hierarchical location states
        setSelectedCountry("")
        setSelectedState("")
        setSelectedCity("")
        setStateOptions([])
        setCityOptions([])

        setSearchResults([])
        setShowResults(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                            Find Your Perfect
                            <span className="block text-yellow-300">Business Partners</span>
                        </h1>
                        <p className="text-sm sm:text-base lg:text-md font-medium text-gray-600 max-w-2xl mx-auto">
                            Discover companies and professionals that align with your vision—perfect for strategic outreach and collaboration.
                        </p>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
                    {/* Search Input */}
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search for companies, industries, or keywords..."
                            value={searchKeywords}
                            onChange={(e) => setSearchKeywords(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        />
                        {isSearching && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                            </div>
                        )}
                    </div>

                    {/* Location (Country) */}
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 616 0z" />
                            </svg>
                        </div>
                        {/* Country Dropdown */}
                        <select
                            value={selectedCountry}
                            onChange={(e) => handleCountryChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base appearance-none bg-white mb-3"
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

                        {/* State/Region Dropdown */}
                        {selectedCountry && (
                            <div className="relative mb-3">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <select
                                    value={selectedState}
                                    onChange={(e) => handleStateChange(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base appearance-none bg-white"
                                    disabled={isLoadingStates}
                                >
                                    <option value="">Select State/Region</option>
                                    {isLoadingStates ? (
                                        <option disabled>Loading states...</option>
                                    ) : (
                                        stateOptions.map((state, index) => (
                                            <option key={index} value={state}>
                                                {state}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        )}

                        {/* City Dropdown */}
                        {selectedState && (
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <select
                                    value={selectedCity}
                                    onChange={(e) => handleCityChange(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base appearance-none bg-white"
                                    disabled={isLoadingCities}
                                >
                                    <option value="">Select City</option>
                                    {isLoadingCities ? (
                                        <option disabled>Loading cities...</option>
                                    ) : (
                                        cityOptions.map((city, index) => (
                                            <option key={index} value={city}>
                                                {city}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        )}

                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>



                    {/* Reset Button */}
                    <div className="mt-6">
                        <button
                            onClick={handleReset}
                            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            Reset All Filters
                        </button>
                    </div>

                    {/* Search Results */}
                    {showResults && searchResults.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">Search Results ({searchResults.length})</h3>
                            <div className="space-y-4">
                                {searchResults.map((company, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                                        <h4 className="font-medium text-gray-900">{company.name || company.company_name || 'Unknown Company'}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{company.description || company.industry || 'No description available'}</p>
                                        {company.location && (
                                            <p className="text-xs text-gray-500 mt-2">📍 {company.location}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BusinessFilter

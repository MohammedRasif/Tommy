"use client"

import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSearchDecisionMakersMutation, useSaveCompanyMutation, useSaveDecisionMakerMutation, useBusinessSearchMutation } from "../../../Redux/feature/ApiSlice"

const CompanyDetails = () => {
  const location = useLocation()
  const [selectedLeads, setSelectedLeads] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [designation, setDesignation] = useState("")
  const [decisionMakers, setDecisionMakers] = useState([])
  const [isLoadingDecisionMakers, setIsLoadingDecisionMakers] = useState(false)

  // Redux API hooks
  const [searchDecisionMakers, { isLoading: isSearchingDecisionMakers }] = useSearchDecisionMakersMutation()
  const [saveCompany, { isLoading: isSavingCompany }] = useSaveCompanyMutation()
  const [saveDecisionMaker, { isLoading: isSavingDecisionMaker }] = useSaveDecisionMakerMutation()
  const [businessSearch, { isLoading: isSearchingCompany }] = useBusinessSearchMutation()

  // Decision maker options
  const decisionMakerOptions = [
    "ceo", "cto", "engineering", "finance",
    "hr", "it", "logistics", "marketing",
    "operations", "buyer", "sales"
  ]

  // Get company data from navigation state or use fallback
  const passedCompanyData = location.state?.companyData

  // Debug: Log the passed company data
  console.log('🔍 Raw passed company data:', passedCompanyData)
  console.log('🔑 Company ID for decision makers:', passedCompanyData?.id)
  console.log('📊 Data source:', passedCompanyData?.source || 'search_results')
  console.log('🔍 passedCompanyData.source:', passedCompanyData?.source)
  console.log('🔍 All passedCompanyData keys:', passedCompanyData ? Object.keys(passedCompanyData) : 'No data')

  const companyData = passedCompanyData ? {
    id: passedCompanyData.id, // Use the actual ID from API response
    name: passedCompanyData.name || "Company Name Not Available",
    location: passedCompanyData.location || "Location not available",
    description: passedCompanyData.description || "No description available",
    employees: passedCompanyData.employee_size || passedCompanyData.employees || "Company size information not available",
    website: passedCompanyData.domain || passedCompanyData.website || "Website information not available",
    phone: passedCompanyData.phone || "Phone information not available",
    annualIncome: passedCompanyData.annualIncome || "Revenue information not available",
    category: passedCompanyData.category || "Category not available",
    email: passedCompanyData.email || "Email information not available",
    source: passedCompanyData.source || "search_results" // Preserve source information
  } : {
    id: 1, // Fallback ID
    name: "Company Name Will Be Displayed Here",
    location: "Austin, Tx",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    employees: "1-500",
    website: "Website.com",
    phone: "+8801775551325",
    annualIncome: "Annual Income",
    category: "Technology",
    email: "contact@company.com",
    source: "fallback"
  }

  // Debug: Log the constructed company data
  console.log('🏗️ Constructed companyData:', companyData)
  console.log('🏗️ companyData.source:', companyData.source)
  console.log('🏗️ companyData.id:', companyData.id)

  // Debug: Log the final company data
  console.log('🔍 Final company data with ID:', companyData)

  // Use real decision makers data instead of dummy data
  const leadsData = decisionMakers

  const toggleLeadSelection = (leadId) => {
    setSelectedLeads((prev) => (prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]))
  }

  const handleFindDecisionMaker = () => {
    setIsModalOpen(true)
  }

  // Handle save company
  const handleSaveCompany = async () => {
    if (!companyData.id) {
      toast.error('Company ID not available. Cannot save company.')
      return
    }

    try {
      console.log('💾 Saving company:', companyData.id)
      await saveCompany(companyData.id).unwrap()
      toast.success('Company saved successfully!')
    } catch (error) {
      console.error('❌ Failed to save company:', error)
      toast.error(`Failed to save company: ${error.data?.detail || error.message || 'Unknown error'}`)
    }
  }

  // Handle save decision maker
  const handleSaveDecisionMaker = async (decisionMaker) => {
    if (!decisionMaker.apiId) {
      toast.error('Decision maker ID not available. Cannot save decision maker.')
      return
    }

    try {
      console.log('💾 Saving decision maker:', decisionMaker.apiId, decisionMaker.name)
      await saveDecisionMaker(decisionMaker.apiId).unwrap()
      toast.success(`Decision maker ${decisionMaker.name} saved successfully!`)
    } catch (error) {
      console.error('❌ Failed to save decision maker:', error)
      toast.error(`Failed to save decision maker: ${error.data?.detail || error.message || 'Unknown error'}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!designation) {
      toast.error('Please select a designation')
      return
    }

    // Check if we have a valid company ID
    if (!companyData.id) {
      console.error('❌ No company ID available:', companyData)
      toast.error('Company ID not available. Cannot search decision makers.')
      return
    }

    try {
      console.log('🔍 Company data available:', passedCompanyData)
      console.log('🔍 Data source:', companyData.source)
      console.log(`🔍 Searching decision makers for company ${companyData.id} with designation ${designation}`)

      // If this company comes from saved companies, we need to search for it first
      // to get it into the "search context" that the backend expects
      if (companyData.source === 'saved_companies' || companyData.source === 'platform') {
        console.log('🔄 Company from saved list - searching first to establish context...')

        try {
          // Search for the company by name to get it into search context
          const searchResponse = await businessSearch({
            company_name: companyData.name,
            location: "",
            category: "",
            company_size: "",
            previous_results_count: 0
          }).unwrap()

          console.log('🔍 Company search response:', searchResponse)

          // Find the matching company in search results
          const matchingCompany = searchResponse.result?.find(company =>
            company.name.toLowerCase() === companyData.name.toLowerCase()
          )

          if (matchingCompany) {
            console.log('✅ Found matching company in search results:', matchingCompany)
            // Use the search result company ID for decision makers
            const searchCompanyId = matchingCompany.id

            const response = await searchDecisionMakers({
              companyId: searchCompanyId,
              designation: designation
            }).unwrap()

            console.log('✅ Decision makers found using search company ID:', response)

            // Process the response...
            if (response.success && response.name && response.email) {
              const newDecisionMaker = {
                id: response.id || Date.now(),
                apiId: response.id,
                name: response.name,
                designation: response.designation.toUpperCase(),
                website: companyData.website,
                email: response.email
              }

              setDecisionMakers(prev => [...prev, newDecisionMaker])
              toast.success(`Added ${response.name} (${response.designation.toUpperCase()}) to leads`)
            } else {
              toast.success(`Found decision makers for ${designation.toUpperCase()}`)
            }

          } else {
            console.log('❌ Company not found in search results')
            toast.error('Company not found in search results. Cannot find decision makers.')
            return
          }

        } catch (searchError) {
          console.error('❌ Failed to search for company:', searchError)
          toast.error('Failed to search for company. Cannot find decision makers.')
          return
        }

      } else {
        // Company from direct search - use normal flow
        console.log('🔍 Company from search results - using direct decision makers API')

        const response = await searchDecisionMakers({
          companyId: companyData.id,
          designation: designation
        }).unwrap()

        console.log('✅ Decision makers found:', response)

        // Process the response...
        if (response.success && response.name && response.email) {
          const newDecisionMaker = {
            id: response.id || Date.now(),
            apiId: response.id,
            name: response.name,
            designation: response.designation.toUpperCase(),
            website: companyData.website,
            email: response.email
          }

          setDecisionMakers(prev => [...prev, newDecisionMaker])
          toast.success(`Added ${response.name} (${response.designation.toUpperCase()}) to leads`)
        } else {
          toast.success(`Found decision makers for ${designation.toUpperCase()}`)
        }
      }

      setIsModalOpen(false)
      setDesignation("")

    } catch (error) {
      console.error('❌ Failed to search decision makers:', error)
      console.error('❌ Error details:', error)

      // Handle specific backend errors
      if (error.status === 500 && error.data?.detail?.includes('HasSearchCredit')) {
        toast.error('Backend permission error. Please contact support.')
      } else if (error.status === 500) {
        toast.error('Server error. The API call was successful but there\'s a backend issue.')
      } else {
        toast.error(`Failed to search decision makers: ${error.data?.detail || error.message || 'Unknown error'}`)
      }
    }
  }

  return (
    <div className="bg-gray-50 roboto">
      {/* Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/dashboard">
            <button
              onClick={() => setIsModalOpen(false)} // Close modal if open
              className="flex items-center text-gray-600 hover:text-gray-800 mr-4 cursor-pointer"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </NavLink>
          <h1 className="text-3xl font-semibold text-gray-900">Company Details</h1>
          <div></div>
        </div>
      </div>

      <div className="mx-auto">
        {/* Company Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">{companyData.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{companyData.name}</h2>
              </div>
            </div>
            <div className="flex items-center text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              {companyData.location}
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-4">{companyData.description}</p>

          {/* Category */}
          {companyData.category && companyData.category !== "Category not available" && (
            <div className="mb-6">
              <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {companyData.category}
              </span>
            </div>
          )}

          {/* Company Stats */}
          <div className="flex items-center space-x-8 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Employee ({companyData.employees})
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                />
              </svg>
              <span className="text-blue-600 hover:text-blue-800 cursor-pointer">{companyData.website}</span>
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {companyData.phone}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              {companyData.annualIncome}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveCompany}
              disabled={isSavingCompany}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-[#645CE8] hover:text-white font-semibold cursor-pointer transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSavingCompany ? 'Saving...' : 'Save'}
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-[#645CE8] hover:text-white font-semibold cursor-pointer transition-colors">
              Generate Email
            </button>
            <button
              onClick={handleFindDecisionMaker}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-[#645CE8] hover:text-white font-semibold cursor-pointer transition-colors"
            >
              Find Decision Maker
            </button>
          </div>
        </div>

        {/* Company Leads Section */}
        <div className="bg-white rounded-lg shadow-sm border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Company Leads</h3>
              <span className="text-sm text-gray-500">
                Selected ({selectedLeads.length.toString().padStart(2, "0")})
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedLeads.length === leadsData.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLeads(leadsData.map((lead) => lead.id))
                        } else {
                          setSelectedLeads([])
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generate mail
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leadsData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <p className="text-lg font-medium">No decision makers found</p>
                        <p className="text-sm mt-2">Use the &quot;Find Decision Maker&quot; button above to search for company leads</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  leadsData.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 text-c">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => toggleLeadSelection(lead.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.designation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center">
                        {lead.website}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {lead.email && lead.email !== 'Access Email' ? (
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-gray-900">{lead.email}</span>
                        </div>
                      ) : (
                        <button className="px-3 py-1 text-xs border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                          {lead.email}
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="text-blue-600 hover:text-blue-800 cursor-pointer underline font-semibold">
                        Click
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleSaveDecisionMaker(lead)}
                        disabled={isSavingDecisionMaker}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer font-semibold disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSavingDecisionMaker ? 'Saving...' : 'Save'}
                      </button>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Find Decision Maker */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[50vh] shadow-lg transform transition-all duration-300 ease-in-out">
            <div className="flex flex-col  justify-between mb-8">
              <NavLink >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex items-center text-gray-600 hover:text-gray-800 mr-4 cursor-pointer"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              </NavLink>
              
              <h2 className="text-xl font-semibold text-gray-700 text-center pb-5">Find Decision Maker</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Designation</label>
              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose a designation...</option>
                {decisionMakerOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={!designation || isSearchingDecisionMakers}
                className="w-full mt-4 bg-[#645CE8] text-white py-2 rounded-sm hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {isSearchingDecisionMakers ? 'Searching...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default CompanyDetails
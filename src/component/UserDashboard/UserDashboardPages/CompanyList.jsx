"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGetSavedCompaniesAllQuery, useDeleteCompanyMutation } from "../../../Redux/feature/ApiSlice"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AiOutlineCloudUpload } from "react-icons/ai" // For the cloud icon

const CompanyList = () => {
  // Hooks
  const navigate = useNavigate()

  // API hooks
  const { data: savedCompaniesData, isLoading: isLoadingSavedCompanies, error: savedCompaniesError, refetch: refetchSavedCompanies } = useGetSavedCompaniesAllQuery()
  const [deleteCompany, { isLoading: isDeleting }] = useDeleteCompanyMutation()

  // Initialize companies with API data or dummy data
  const [companies, setCompanies] = useState([])

  const [activeTab, setActiveTab] = useState("all")
  const [selectedCompanies, setSelectedCompanies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchName, setSearchName] = useState("")
  const [searchLocation, setSearchLocation] = useState("")
  const [openDropdown, setOpenDropdown] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false) // State for modal

  // Load saved companies from API
  useEffect(() => {
    if (savedCompaniesData && Array.isArray(savedCompaniesData)) {
      console.log('📊 Saved companies loaded from API:', savedCompaniesData)
      // Transform API data to match the expected format
      const transformedData = savedCompaniesData.map(company => ({
        id: company.id,
        name: company.name,
        location: company.location,
        description: company.description,
        category: company.category,
        source: company.source,
        phone: "N/A", // API doesn't provide phone
        website: "View", // Default value
        status: "saved" // All companies from this API are saved
      }))
      setCompanies(transformedData)
    } else if (savedCompaniesError) {
      console.error('❌ Failed to load saved companies:', savedCompaniesError)
      toast.error('Failed to load saved companies')
    }
  }, [savedCompaniesData, savedCompaniesError])

  // Filter companies based on active tab and search terms
  const filteredCompanies = companies.filter((company) => {
    const matchesTab = activeTab === "all" || company.status === activeTab

    // General search term (backward compatibility)
    const matchesGeneralSearch = !searchTerm ||
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())

    // Specific name search
    const matchesNameSearch = !searchName ||
      company.name.toLowerCase().includes(searchName.toLowerCase())

    // Specific location search
    const matchesLocationSearch = !searchLocation ||
      company.location.toLowerCase().includes(searchLocation.toLowerCase())

    return matchesTab && matchesGeneralSearch && matchesNameSearch && matchesLocationSearch
  })

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedCompanies([])
  }

  // Handle company selection
  const toggleCompanySelection = (companyId) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId],
    )
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedCompanies.length === filteredCompanies.length) {
      setSelectedCompanies([])
    } else {
      setSelectedCompanies(filteredCompanies.map((company) => company.id))
    }
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedCompanies.length > 0) {
      setDeleteTarget("bulk")
      setShowDeleteConfirm(true)
    }
  }

  // Handle single delete
  const handleSingleDelete = (companyId) => {
    setDeleteTarget(companyId)
    setShowDeleteConfirm(true)
    setOpenDropdown(null)
  }

  // Confirm delete
  const confirmDelete = async () => {
    try {
      if (deleteTarget === "bulk") {
        
        const deletePromises = selectedCompanies.map(companyId =>
          deleteCompany(companyId).unwrap()
        )
        await Promise.all(deletePromises)

        setCompanies((prev) => prev.filter((company) => !selectedCompanies.includes(company.id)))
        setSelectedCompanies([])
        toast.success(`Successfully deleted ${selectedCompanies.length} companies`)
      } else {
     
        await deleteCompany(deleteTarget).unwrap()

        // Update local state after successful API call
        setCompanies((prev) => prev.filter((company) => company.id !== deleteTarget))
        toast.success('Company deleted successfully')
      }
    } catch (error) {
      console.error('❌ Delete error:', error)
      toast.error(error?.data?.message || 'Failed to delete company. Please try again.')
    } finally {
      setShowDeleteConfirm(false)
      setDeleteTarget(null)
    }
  }



  // Handle modal open
  const handleImportClick = () => {
    setIsModalOpen(true)
  }

  // Handle file upload (placeholder)
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      console.log("File uploaded:", file.name)
      // Add file processing logic here (e.g., parse CSV/Excel)
      setIsModalOpen(false) // Close modal after upload (can be adjusted)
    }
  }

  // Handle drag and drop
  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      console.log("File dropped:", file.name)
      // Add file processing logic here (e.g., parse CSV/Excel)
      setIsModalOpen(false) // Close modal after drop (can be adjusted)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  // Handle view company details
  const handleViewCompanyDetails = (company) => {
    console.log('🔍 BUTTON CLICKED - Viewing company details for:', company)
    console.log('🔍 Available company fields:', Object.keys(company))
    console.log('🔍 Full company object:', company)
    console.log('🔍 company.id:', company.id)
    console.log('🔍 company.company_id:', company.company_id)
    console.log('🔍 company["company_id"]:', company["company_id"])

    // Add alert to confirm button click is working
    alert('View button clicked! Check console for details.')

    const companyData = {
      // Core identification - CRITICAL for decision makers API
      id: company.company_id || company.id, // Use company_id for decision makers API, fallback to id

      // Basic company information
      name: company.name || "Company Name Not Available",
      location: company.location || "Location not available",
      description: company.description || "No description available",
      category: company.category || "Category not available",

      // Extended information - now available from API
      employee_size: company.employee_size || "Company size not specified",
      domain: company.domain || "Website not available",
      email: company.email || "Email not available",
      phone: company.phone || "Phone not available",
      annualIncome: company.anual_income || "Revenue information not available",

      // Additional metadata
      source: company.source || "saved_companies",
      user: company.user,
      originalId: company.id, // Keep original ID for reference

      // Ensure we have all the fields that CompanyDetails expects
      employees: company.employee_size || "Company size not specified", // Alternative field name
      website: company.domain || "Website not available" // Alternative field name
    }

    console.log('📊 Original company data from API:', company)
    console.log('📊 Transformed company data for CompanyDetails:', companyData)
    console.log('🔑 Company ID for decision makers API:', companyData.id)
    console.log('🌐 Website:', companyData.domain)
    console.log('📧 Email:', companyData.email)

    // Validate that we have a proper company ID
    if (!companyData.id) {
      console.error('❌ Company ID validation failed:', {
        'company.company_id': company.company_id,
        'company.id': company.id,
        'companyData.id': companyData.id
      })
      toast.error(`Company ID is missing. Cannot view company details. company_id: ${company.company_id}, id: ${company.id}`)
      return
    }

    // Navigate to company details page with company data
    navigate('/dashboard/company_details', {
      state: { companyData }
    })
  }

  return (
    <div className="mt-5">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">Company profiles</h1>

          {/* Tabs */}
          <div className="flex justify-center space-x-1 mb-6">
            <button
              onClick={() => handleTabChange("all")}
              className={`px-4 py-2 text-md font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#645CE8] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleTabChange("uploaded")}
              className={`px-4 py-2 text-md font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === "uploaded"
                  ? "bg-[#645CE8] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Uploaded
            </button>
            <button
              onClick={() => handleTabChange("saved")}
              className={`px-4 py-2 text-md font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === "saved"
                  ? "bg-[#645CE8] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Saved
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                Selected ({selectedCompanies.length.toString().padStart(2, "0")})
              </span>
              {selectedCompanies.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                  title="Delete selected"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleImportClick}
              className="px-4 py-2 bg-[#645CE8] text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Import
            </button>
            {/* Search by Company Name */}
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search by company name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Search by Location */}
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search by location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
            </div>

            {/* Search Reset Button */}
            {(searchName || searchLocation) && (
              <button
                onClick={() => {
                  setSearchName("")
                  setSearchLocation("")
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#645CE8] focus:ring-blue-500"
                      checked={selectedCompanies.length === filteredCompanies.length && filteredCompanies.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoadingSavedCompanies ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-lg font-medium">Loading saved companies...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredCompanies.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <p className="text-lg font-medium">No companies found</p>
                        <p className="text-sm mt-2">
                          {searchName || searchLocation ?
                            'Try adjusting your search criteria' :
                            'No saved companies available'
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#645CE8] focus:ring-blue-500"
                        checked={selectedCompanies.includes(company.id)}
                        onChange={() => toggleCompanySelection(company.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {company.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {company.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {company.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="text-[#645CE8] hover:text-blue-800 cursor-pointer flex items-center">
                        {company.website}
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewCompanyDetails(company)}
                        className="text-[#645CE8] hover:text-blue-800 cursor-pointer font-semibold transition-colors"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === company.id ? null : company.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>

                      {openDropdown === company.id && (
                        <div className="absolute right-5 top-[40px] mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleSingleDelete(company.id)}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                {deleteTarget === "bulk"
                  ? `Are you sure you want to delete ${selectedCompanies.length} selected companies?`
                  : "Are you sure you want to delete this company?"}
                <br />
                This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Import Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[80vh] shadow-lg transform transition-all duration-300 ease-in-out">
              <div className="flex items-center justify-between mb-10">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex items-center text-gray-600 hover:text-gray-800 mr-4 cursor-pointer"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <h2 className="text-2xl font-semibold text-gray-900">Enrich your information List</h2>
                <div>

                </div>
              </div>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragOver}
              >
                <AiOutlineCloudUpload className="mx-auto text-[#645CE8] w-12 h-12 mb-2" />
                <p className="text-gray-600 mb-1">Drag & drop files or <span className="text-[#645CE8] cursor-pointer">Browse</span></p>
                <p className="text-sm text-gray-500">Supported formats: Excel or CSV</p>
                <input
                  type="file"
                  accept=".csv, .xls, .xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-[#645CE8] hover:underline"
                >
                  Browse
                </label>
              </div>
              <div className="flex items-center justify-center">
                <button
                onClick={() => document.getElementById("fileInput").click()}
                className="px-5 bg-[#645CE8] text-white py-2 rounded-md hover:bg-indigo-700 transition-colors "
              >
                Upload Files
              </button>
              </div>
              <p className="text-sm text-red-600 mt-4">
                NOTE: Kindly ensure that all bulk information is uploaded following the specified format and sequence outlined below
               
              </p>
              <p className="text-[14px] text-gray-500"> 
                Employee name, Designation, Personal Email, Company name, Company website, Annual company income, Company phone, Company Email, Company Employee size.</p>
            </div>
          </div>
        )}

        {/* Click outside to close dropdown */}
        {openDropdown && <div className="fixed inset-0 z-0" onClick={() => setOpenDropdown(null)}></div>}
      </div>
      <ToastContainer />
    </div>
  )
}

export default CompanyList
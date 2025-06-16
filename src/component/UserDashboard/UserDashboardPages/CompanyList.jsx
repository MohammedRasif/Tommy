"use client"

import { useState } from "react"
import { AiOutlineCloudUpload } from "react-icons/ai" // For the cloud icon

const CompanyList = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "L dorado KGF ltd.",
      location: "Dhaka, Bangladesh",
      phone: "+8801775551325",
      website: "View",
      status: "all",
    },
    {
      id: 2,
      name: "L dorado KGF ltd.",
      location: "Dhaka, Bangladesh",
      phone: "+8801775551325",
      website: "View",
      status: "uploaded",
    },
    {
      id: 3,
      name: "L dorado KGF ltd.",
      location: "Dhaka, Bangladesh",
      phone: "+8801775551325",
      website: "View",
      status: "saved",
    },
    {
      id: 4,
      name: "L dorado KGF ltd.",
      location: "Dhaka, Bangladesh",
      phone: "+8801775551325",
      website: "View",
      status: "all",
    },
    {
      id: 5,
      name: "L dorado KGF ltd.",
      location: "Dhaka, Bangladesh",
      phone: "+8801775551325",
      website: "View",
      status: "uploaded",
    },
    {
      id: 6,
      name: "L dorado KGF ltd.",
      location: "Dhaka, Bangladesh",
      phone: "+8801775551325",
      website: "View",
      status: "saved",
    },
    {
      id: 7,
      name: "L dorado KGF ltd.",
      location: "Dhaka, Bangladesh",
      phone: "+8801775551325",
      website: "View",
      status: "all",
    },
    {
      id: 8,
      name: "L dorado KGF ltd.",
      location: "Dhaka, Bangladesh",
      phone: "+8801775551325",
      website: "View",
      status: "uploaded",
    },
    {
      id: 9,
      name: "L dorado KGF ltd.",
      location: "Dhaka, Bangladesh",
      phone: "+8801775551325",
      website: "View",
      status: "saved",
    },
    {
      id: 10,
      name: "L dorado KGF ltd.",
      location: "Dhaka, Bangladesh",
      phone: "+8801775551325",
      website: "View",
      status: "all",
    },
    {
      id: 11,
      name: "L dorado KGF ltd.",
      location: "Dhaka, Bangladesh",
      phone: "+8801775551325",
      website: "View",
      status: "saved",
    },
  ])

  const [activeTab, setActiveTab] = useState("all")
  const [selectedCompanies, setSelectedCompanies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [openDropdown, setOpenDropdown] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [editingCompany, setEditingCompany] = useState(null)
  const [editForm, setEditForm] = useState({
    name: "",
    location: "",
    phone: "",
    website: "",
  })
  const [isModalOpen, setIsModalOpen] = useState(false) // State for modal

  // Filter companies based on active tab and search term
  const filteredCompanies = companies.filter((company) => {
    const matchesTab = activeTab === "all" || company.status === activeTab
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
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
  const confirmDelete = () => {
    if (deleteTarget === "bulk") {
      setCompanies((prev) => prev.filter((company) => !selectedCompanies.includes(company.id)))
      setSelectedCompanies([])
    } else {
      setCompanies((prev) => prev.filter((company) => company.id !== deleteTarget))
    }
    setShowDeleteConfirm(false)
    setDeleteTarget(null)
  }

  // Handle edit
  const handleEdit = (company) => {
    setEditingCompany(company.id)
    setEditForm({
      name: company.name,
      location: company.location,
      phone: company.phone,
      website: company.website,
    })
    setOpenDropdown(null)
  }

  // Save edit
  const saveEdit = () => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === editingCompany
          ? {
              ...company,
              name: editForm.name,
              location: editForm.location,
              phone: editForm.phone,
              website: editForm.website,
            }
          : company,
      ),
    )
    setEditingCompany(null)
    setEditForm({ name: "", location: "", phone: "", website: "" })
  }

  // Cancel edit
  const cancelEdit = () => {
    setEditingCompany(null)
    setEditForm({ name: "", location: "", phone: "", website: "" })
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

  return (
    <div className="bg-gray-50 mt-5">
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
            <div className="relative">
              <input
                type="text"
                placeholder="Search by company name or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
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
                {filteredCompanies.map((company) => (
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
                      {editingCompany === company.id ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        company.name
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {editingCompany === company.id ? (
                        <input
                          type="text"
                          value={editForm.location}
                          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        company.location
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {editingCompany === company.id ? (
                        <input
                          type="text"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        company.phone
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {editingCompany === company.id ? (
                        <input
                          type="text"
                          value={editForm.website}
                          onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
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
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="text-[#645CE8] hover:text-blue-800 cursor-pointer">View</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm relative">
                      {editingCompany === company.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={saveEdit}
                            className="text-green-600 hover:text-green-800 text-xs px-2 py-1 border border-green-600 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-600 hover:text-gray-800 text-xs px-2 py-1 border border-gray-300 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
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
                                  onClick={() => handleEdit(company)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleSingleDelete(company.id)}
                                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
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
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Delete
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
    </div>
  )
}

export default CompanyList
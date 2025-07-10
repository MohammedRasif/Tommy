"use client"

import { useState, useEffect } from "react"
import { useGetSavedDecisionMakersQuery } from "../../../Redux/feature/ApiSlice"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import EmailShowGen from "./pages/mails/EmailShowGen"

const ContactList = () => {
  // API hook to fetch saved decision makers
  const { data: savedDecisionMakersData, isLoading: isLoadingSavedDecisionMakers, error: savedDecisionMakersError } = useGetSavedDecisionMakersQuery()

  // Local state for contacts and search
  const [contacts, setContacts] = useState([])
  const [searchName, setSearchName] = useState("")
  const [searchDesignation, setSearchDesignation] = useState("")

  // Load saved decision makers from API
  useEffect(() => {
    if (savedDecisionMakersData && Array.isArray(savedDecisionMakersData)) {
      console.log('📊 Saved decision makers loaded from API:', savedDecisionMakersData)
      // Transform API data to match the expected format
      const transformedData = savedDecisionMakersData.map(decisionMaker => ({
        id: decisionMaker.id,
        name: decisionMaker.name,
        designation: decisionMaker.designation,
        companyName: decisionMaker.company_name || "N/A",
        companyWebsite: decisionMaker.company_website || "View",
        email: decisionMaker.email,
        hasEmail: decisionMaker.email && decisionMaker.email !== 'Access Email'
      }))
      setContacts(transformedData)
    } else if (savedDecisionMakersError) {
      console.error('❌ Failed to load saved decision makers:', savedDecisionMakersError)
      toast.error('Failed to load saved decision makers')
    }
  }, [savedDecisionMakersData, savedDecisionMakersError])

  // Dummy data as fallback (will be replaced by API data)
  const [dummyContacts] = useState([
    {
      id: 1,
      name: "L dorado KGF ltd.",
      designation: "Dhaka, Bangladesh",
      companyName: "L dorado KGF ltd.",
      companyWebsite: "View",
      email: "Access Email",
      hasEmail: false,
    },
    {
      id: 2,
      name: "L dorado KGF ltd.",
      designation: "Dhaka, Bangladesh",
      companyName: "L dorado KGF ltd.",
      companyWebsite: "View",
      email: "Sajibahamed@gmail.com",
      hasEmail: true,
    },
    {
      id: 3,
      name: "L dorado KGF ltd.",
      designation: "Dhaka, Bangladesh",
      companyName: "L dorado KGF ltd.",
      companyWebsite: "View",
      email: "Access Email",
      hasEmail: false,
    },
    {
      id: 4,
      name: "L dorado KGF ltd.",
      designation: "Dhaka, Bangladesh",
      companyName: "L dorado KGF ltd.",
      companyWebsite: "View",
      email: "Access Email",
      hasEmail: false,
    },
    {
      id: 5,
      name: "L dorado KGF ltd.",
      designation: "Dhaka, Bangladesh",
      companyName: "L dorado KGF ltd.",
      companyWebsite: "View",
      email: "Access Email",
      hasEmail: false,
    },
    {
      id: 6,
      name: "L dorado KGF ltd.",
      designation: "Dhaka, Bangladesh",
      companyName: "L dorado KGF ltd.",
      companyWebsite: "View",
      email: "Access Email",
      hasEmail: false,
    },
    {
      id: 7,
      name: "L dorado KGF ltd.",
      designation: "Dhaka, Bangladesh",
      companyName: "L dorado KGF ltd.",
      companyWebsite: "View",
      email: "Access Email",
      hasEmail: false,
    },
    {
      id: 8,
      name: "L dorado KGF ltd.",
      designation: "Dhaka, Bangladesh",
      companyName: "L dorado KGF ltd.",
      companyWebsite: "View",
      email: "Sajibahamed@gmail.com",
      hasEmail: true,
    },
    {
      id: 9,
      name: "L dorado KGF ltd.",
      designation: "Dhaka, Bangladesh",
      companyName: "L dorado KGF ltd.",
      companyWebsite: "View",
      email: "Sajibahamed@gmail.com",
      hasEmail: true,
    },
  ])

  const [selectedContacts, setSelectedContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [openDropdown, setOpenDropdown] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [editingContact, setEditingContact] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  // Email generation states
  const [isEmailShown, setIsEmailShown] = useState(false)
  const [idToShowEmailSingle, setIdToShowEmailSingle] = useState("")
  const [selectedContactForEmail, setSelectedContactForEmail] = useState(null)

  const [editForm, setEditForm] = useState({
    name: "",
    designation: "",
    companyName: "",
    companyWebsite: "",
    email: "",
  })
  const [addForm, setAddForm] = useState({
    name: "",
    designation: "",
    companyName: "",
    companyWebsite: "",
    email: "",
  })

  // Filter contacts based on search terms
  const filteredContacts = contacts.filter((contact) => {
    // General search term (backward compatibility)
    const matchesGeneralSearch = !searchTerm ||
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.designation.toLowerCase().includes(searchTerm.toLowerCase())

    // Specific name search
    const matchesNameSearch = !searchName ||
      contact.name.toLowerCase().includes(searchName.toLowerCase())

    // Specific designation search
    const matchesDesignationSearch = !searchDesignation ||
      contact.designation.toLowerCase().includes(searchDesignation.toLowerCase())

    return matchesGeneralSearch && matchesNameSearch && matchesDesignationSearch
  })

  // Handle contact selection
  const toggleContactSelection = (contactId) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId],
    )
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(filteredContacts.map((contact) => contact.id))
    }
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedContacts.length > 0) {
      setDeleteTarget("bulk")
      setShowDeleteConfirm(true)
    }
  }

  // Handle single delete
  const handleSingleDelete = (contactId) => {
    setDeleteTarget(contactId)
    setShowDeleteConfirm(true)
    setOpenDropdown(null)
  }

  // Confirm delete
  const confirmDelete = () => {
    if (deleteTarget === "bulk") {
      setContacts((prev) => prev.filter((contact) => !selectedContacts.includes(contact.id)))
      setSelectedContacts([])
    } else {
      setContacts((prev) => prev.filter((contact) => contact.id !== deleteTarget))
    }
    setShowDeleteConfirm(false)
    setDeleteTarget(null)
  }

  // Handle generate email from "Generate mail" column
  const handleGenerateEmail = (contact) => {
    console.log('Generate email clicked for contact:', contact)
    setIdToShowEmailSingle(contact.id)
    setSelectedContactForEmail(contact)
    setIsEmailShown(true)
    setOpenDropdown(null)
  }

  // Handle edit - Show email generation popup (from dropdown)
  const handleEdit = (contact) => {
    console.log('Edit clicked for contact:', contact)
    setIdToShowEmailSingle(contact.id)
    setIsEmailShown(true)
    setOpenDropdown(null)
  }

  // Handle inline edit (for the old edit functionality if needed)
  const handleInlineEdit = (contact) => {
    setEditingContact(contact.id)
    setEditForm({
      name: contact.name,
      designation: contact.designation,
      companyName: contact.companyName,
      companyWebsite: contact.companyWebsite,
      email: contact.email,
    })
    setOpenDropdown(null)
  }

  // Save edit
  const saveEdit = () => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === editingContact
          ? {
              ...contact,
              name: editForm.name,
              designation: editForm.designation,
              companyName: editForm.companyName,
              companyWebsite: editForm.companyWebsite,
              email: editForm.email,
              hasEmail: editForm.email.includes("@"),
            }
          : contact,
      ),
    )
    setEditingContact(null)
    setEditForm({ name: "", designation: "", companyName: "", companyWebsite: "", email: "" })
  }

  // Cancel edit
  const cancelEdit = () => {
    setEditingContact(null)
    setEditForm({ name: "", designation: "", companyName: "", companyWebsite: "", email: "" })
  }

  // Handle add contact
  const handleAddContact = () => {
    const newContact = {
      id: Math.max(...contacts.map((c) => c.id)) + 1,
      name: addForm.name,
      designation: addForm.designation,
      companyName: addForm.companyName,
      companyWebsite: addForm.companyWebsite,
      email: addForm.email,
      hasEmail: addForm.email.includes("@"),
    }
    setContacts((prev) => [...prev, newContact])
    setAddForm({ name: "", designation: "", companyName: "", companyWebsite: "", email: "" })
    setShowAddModal(false)
  }

  return (
    <div className="p-2 ">
      <div className="mx-auto ">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <h1 className="text-2xl font-semibold text-gray-900">Contact List</h1>
            <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">50 Mail Credits available</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                Selected ({selectedContacts.length.toString().padStart(2, "0")})
              </span>
              {selectedContacts.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="text-red-600 hover:text-red-800 transition-colors"
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
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
            {/* Search by Name */}
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search by name"
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

            {/* Search by Designation */}
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search by designation"
                value={searchDesignation}
                onChange={(e) => setSearchDesignation(e.target.value)}
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            {/* Search Reset Button */}
            {(searchName || searchDesignation) && (
              <button
                onClick={() => {
                  setSearchName("")
                  setSearchDesignation("")
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
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company name
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
                {isLoadingSavedDecisionMakers ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-lg font-medium">Loading saved decision makers...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <p className="text-lg font-medium">No contacts found</p>
                        <p className="text-sm mt-2">
                          {searchName || searchDesignation ?
                            'Try adjusting your search criteria' :
                            'No saved decision makers available'
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => toggleContactSelection(contact.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {editingContact === contact.id ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        contact.name
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {editingContact === contact.id ? (
                        <input
                          type="text"
                          value={editForm.designation}
                          onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        contact.designation
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {editingContact === contact.id ? (
                        <input
                          type="text"
                          value={editForm.companyName}
                          onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        contact.companyName
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {editingContact === contact.id ? (
                        <input
                          type="text"
                          value={editForm.companyWebsite}
                          onChange={(e) => setEditForm({ ...editForm, companyWebsite: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer flex items-center">
                          {contact.companyWebsite}
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
                      {editingContact === contact.id ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : contact.hasEmail ? (
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
                          <span className="text-gray-900 ">{contact.email}</span>
                        </div>
                      ) : (
                        <button className="px-3 py-1 text-md border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors cursor-pointer">
                          {contact.email}
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleGenerateEmail(contact)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer font-semibold transition-colors"
                      >
                        Generate Email
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm relative">
                      {editingContact === contact.id ? (
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
                            onClick={() => setOpenDropdown(openDropdown === contact.id ? null : contact.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>

                          {openDropdown === contact.id && (
                            <div className="absolute right-22 top-12 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                              <div className="py-1">
                                {/* <button
                                  onClick={() => handleEdit(contact)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                  Generate Email
                                </button> */}
                                <button
                                  onClick={() => handleSingleDelete(contact.id)}
                                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Contact Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center mb-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex items-center text-gray-600 hover:text-gray-800 mr-4 cursor-pointer"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <h3 className="text-lg font-semibold text-gray-900 pl-20">Add Member</h3>
                
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee name</label>
                  <input
                    type="text"
                    value={addForm.name}
                    onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                    placeholder="Enter here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                  <select
                    value={addForm.designation}
                    onChange={(e) => setAddForm({ ...addForm, designation: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  >
                    <option value="">Select one</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Analyst">Analyst</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company name</label>
                  <input
                    type="text"
                    value={addForm.companyName}
                    onChange={(e) => setAddForm({ ...addForm, companyName: e.target.value })}
                    placeholder="Enter here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
                  <input
                    type="text"
                    value={addForm.companyWebsite}
                    onChange={(e) => setAddForm({ ...addForm, companyWebsite: e.target.value })}
                    placeholder="www.demowebsite.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={addForm.email}
                    onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                    placeholder="sajibahamed@gmail.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>
              </div>

              <button
                onClick={handleAddContact}
                className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                {deleteTarget === "bulk"
                  ? `Are you sure you want to delete ${selectedContacts.length} selected contacts?`
                  : "Are you sure you want to delete this contact?"}
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
      </div>

      {/* Click outside to close dropdown */}
      {openDropdown && <div className="fixed inset-0 z-0" onClick={() => setOpenDropdown(null)}></div>}

      {/* Email Generation Popup */}
      {isEmailShown && (
        <EmailShowGen
          idToShowEmailSingle={idToShowEmailSingle}
          handleDelete={handleSingleDelete}
          setIsEmailShown={setIsEmailShown}
          setIdToShowEmailSingle={setIdToShowEmailSingle}
          contactData={selectedContactForEmail}
        />
      )}

      <ToastContainer />
    </div>
  )
}

export default ContactList

"use client"

import { useState } from "react"

const ContactList = () => {
  // Sample contact data
  const [contacts, setContacts] = useState([
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

  // Filter contacts based on search term
  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))

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

  // Handle edit
  const handleEdit = (contact) => {
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
    <div className=" ">
      <div className=" mx-auto ">
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
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                {filteredContacts.map((contact) => (
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
                      <span className="text-blue-600 hover:text-blue-800 cursor-pointer">Click</span>
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
                                <button
                                  onClick={() => handleEdit(contact)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                  Edit
                                </button>
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
                ))}
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
    </div>
  )
}

export default ContactList

"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"

const CompanyDetails = () => {
  const [selectedLeads, setSelectedLeads] = useState([1, 2, 3])

  const companyData = {
    name: "Company Name Will Be Displayed Here",
    location: "Austin, Tx",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    employees: "1-500",
    website: "Website.com",
    phone: "+8801775551325",
    annualIncome: "Annual Income",
  }

  const leadsData = [
    {
      id: 1,
      name: "I. Gerardo KGF ltd.",
      designation: "UI/Ux Designer",
      website: "View",
      email: "Access Email",
      hasEmail: false,
    },
    {
      id: 2,
      name: "I. Gerardo KGF ltd.",
      designation: "UI/Ux Designer",
      website: "View",
      email: "Access Email",
      hasEmail: false,
    },
    {
      id: 3,
      name: "I. Gerardo KGF ltd.",
      designation: "UI/Ux Designer",
      website: "View",
      email: "Access Email",
      hasEmail: false,
    },
    {
      id: 4,
      name: "I. Gerardo KGF ltd.",
      designation: "UI/Ux Designer",
      website: "View",
      email: "Access Email",
      hasEmail: false,
    },
    {
      id: 5,
      name: "I. Gerardo KGF ltd.",
      designation: "UI/Ux Designer",
      website: "View",
      email: "Sophiaharris@gmail.com",
      hasEmail: true,
    },
  ]

  const toggleLeadSelection = (leadId) => {
    setSelectedLeads((prev) => (prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]))
  }

  

  return (
    <div className=" bg-gray-50 roboto">
      {/* Header */}
      <div className=" px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/dashboard">
            <button  className="flex items-center text-gray-600 hover:text-gray-800 mr-4 cursor-pointer">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          </NavLink>
          <h1 className="text-3xl font-semibold text-gray-900 ">Company Details</h1>
          <div>

          </div>
        </div>
      </div>

      <div className=" mx-auto">
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

          <p className="text-gray-600 text-sm leading-relaxed mb-6">{companyData.description}</p>

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
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-[#645CE8] hover:text-white font-semibold cursor-pointer transition-colors">
              Save
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-[#645CE8] hover:text-white font-semibold cursor-pointer transition-colors">
              Generate Email
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-[#645CE8] hover:text-white font-semibold cursor-pointer transition-colors">
              Find Decision Maker
            </button>
          </div>
        </div>

        {/* Company Leads Section */}
        <div className="bg-white rounded-lg shadow-sm  border-gray-200">
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
                {leadsData.map((lead) => (
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
                      <span className=" text-blue-600 hover:text-blue-800 cursor-pointer flex items-center">
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
                      {lead.hasEmail ? (
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
                      <span className="text-blue-600 hover:text-blue-800 cursor-pointer underline font-semibold">Click</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="text-blue-600 hover:text-blue-800 cursor-pointer font-semibold">Save</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDetails

"use client";

import React, { useState, useMemo } from "react";
import Draft from "./pages/Draft";
import EmailShowGen from "./pages/mails/EmailShowGen";
import Sent from "./pages/Sent";

// Sample data
const sampleData = [
  {
    id: "1",
    name: "Loredo KGF ltd.",
    designation: "Dhaka, Bangladesh",
    companyDetails: "Company Details 1",
    email: "Sajibahamed@gmail.com",
  },
  {
    id: "2",
    name: "Ahmed Corp.",
    designation: "Chittagong, Bangladesh",
    companyDetails: "Company Details 2",
    email: "ahmed@example.com",
  },
  {
    id: "3",
    name: "Rahman Industries",
    designation: "Sylhet, Bangladesh",
    companyDetails: "Company Details 3",
    email: "rahman@company.com",
  },
  {
    id: "4",
    name: "Loredo KGF ltd.",
    designation: "Dhaka, Bangladesh",
    companyDetails: "Company Details 4",
    email: "Sajibahamed@gmail.com",
  },
  {
    id: "5",
    name: "Tech Solutions",
    designation: "Rajshahi, Bangladesh",
    companyDetails: "Company Details 5",
    email: "tech@solutions.com",
  },
  {
    id: "6",
    name: "Loredo KGF ltd.",
    designation: "Dhaka, Bangladesh",
    companyDetails: "Company Details 6",
    email: "Sajibahamed@gmail.com",
  },
  {
    id: "7",
    name: "Green Energy Co.",
    designation: "Khulna, Bangladesh",
    companyDetails: "Company Details 7",
    email: "green@energy.com",
  },
  {
    id: "8",
    name: "Loredo KGF ltd.",
    designation: "Dhaka, Bangladesh",
    companyDetails: "Company Details 8",
    email: "Sajibahamed@gmail.com",
  },
];

export default function Dashboard() {
  const [data, setData] = useState(sampleData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [activeTab, setActiveTab] = useState("draft");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmailShown, setIsEmailShown] = useState(false);
  const [idToShowEmailSingle, setIdToShowEmailSingle] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter(
      (row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedRows([]);
    setSelectedData([]);
    console.log("Tab changed to:", tab);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSelectedRows([]);
    setSelectedData([]);
    console.log("Search query:", query);
  };

  const handleSelectionChange = (selectedIds, selectedRowData) => {
    setSelectedRows(selectedIds);
    setSelectedData(selectedRowData);
    console.log("Selected IDs:", selectedIds);
    console.log("Selected Data:", selectedRowData);
  };

  const handleView = (id) => {
    console.log("View clicked for ID:", id);
    const item = data.find((item) => item.id === id);
    console.log("View item:", item);
  };

  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
    const item = data.find((item) => item.id === id);
    setIdToShowEmailSingle(id);
    setIsEmailShown(true);
    console.log("Edit item:", item);
  };

  const handleDelete = (id) => {
    console.log("Delete clicked for ID:", id);
    const item = data.find((item) => item.id === id);
    console.log("Deleting item:", item);
    setData((prevData) => prevData.filter((item) => item.id !== id));
    setSelectedRows((prev) => prev.filter((selectedId) => selectedId !== id));
    setSelectedData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleBulkDelete = (ids) => {
    console.log("Bulk delete for IDs:", ids);
    const itemsToDelete = data.filter((item) => ids.includes(item.id));
    console.log("Bulk deleting items:", itemsToDelete);
    setData((prevData) => prevData.filter((item) => !ids.includes(item.id)));
    setSelectedRows([]);
    setSelectedData([]);
  };

  const handleCopyEmail = (email) => {
    console.log("Email copied:", email);
    // You could show a toast here
  };

  return (
    <>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex w-full items-center justify-center mb-5">
            <div className="flex w-fit">
              <button
                onClick={() => handleTabChange("draft")}
                className={`px-6 py-3 text-sm font-medium  transition-colors rounded-s-xl hover:cursor-pointer ${
                  activeTab === "draft"
                    ? "bg-[#645CE8]  text-white text-lg "
                    : "bg-[#ededed] text-lg text-black"
                }`}
              >
                Draft
              </button>
              <button
                onClick={() => handleTabChange("sent")}
                className={`px-6 py-3 text-sm font-medium  transition-colors rounded-e-xl hover:cursor-pointer ${
                  activeTab === "sent"
                    ? "bg-[#645CE8]  text-white text-lg "
                    : "bg-[#ededed] text-lg text-black"
                }`}
              >
                Sent
              </button>
            </div>
          </div>
          {/* Debug Info */}
          {/* <div className="mb-4 p-4 bg-white rounded-lg shadow text-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <strong>Active Tab:</strong> {activeTab}
            </div>
            <div>
              <strong>Search Query:</strong> "{searchQuery}"
            </div>
            <div>
              <strong>Total Items:</strong> {data.length}
            </div>
            <div>
              <strong>Filtered Items:</strong> {filteredData.length}
            </div>
            <div>
              <strong>Selected Count:</strong> {selectedRows.length}
            </div>
            <div>
              <strong>Selected IDs:</strong> [{selectedRows.join(", ")}]
            </div>
          </div>
        </div> */}

          {activeTab == "draft" ? (
            <Draft
              data={data}
              filteredData={filteredData}
              selectedRows={selectedRows}
              activeTab={activeTab}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSelectionChange={handleSelectionChange}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onBulkDelete={handleBulkDelete}
              onCopyEmail={handleCopyEmail}
            />
          ) : (
            <Sent />
          )}
        </div>
      </div>
      {isEmailShown && activeTab == "draft" && (
        <EmailShowGen
          idToShowEmailSingle={idToShowEmailSingle}
          handleDelete={handleDelete}
          setIsEmailShown={setIsEmailShown}
          setIdToShowEmailSingle={setIdToShowEmailSingle}
        />
      )}
    </>
  );
}

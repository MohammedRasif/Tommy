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

export default function AiGenerator() {
  const [draftData, setDraftData] = useState([...sampleData]);
  const [sentData, setSentData] = useState([...sampleData]); // Separate data for Sent
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [activeTab, setActiveTab] = useState("draft");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEmailShown, setIsEmailShown] = useState(false);
  const [idToShowEmailSingle, setIdToShowEmailSingle] = useState("");

  const currentData = activeTab === "draft" ? draftData : sentData;
  const setCurrentData = activeTab === "draft" ? setDraftData : setSentData;

  const filteredData = useMemo(() => {
    if (!searchQuery) return currentData;
    return currentData.filter(
      (row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentData, searchQuery]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedRows([]);
    setSelectedData([]);
    setSearchQuery("");
    console.log("Tab changed to:", tab);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSelectedRows([]);
    setSelectedData([]);
    console.log(`${activeTab} search query:`, query);
  };

  const handleSelectionChange = (selectedIds, selectedRowData) => {
    setSelectedRows(selectedIds);
    setSelectedData(selectedRowData);
    console.log(`${activeTab} selected IDs:`, selectedIds);
    console.log(`${activeTab} selected Data:`, selectedRowData);
  };

  const handleView = (id) => {
    console.log(`${activeTab} view clicked for ID:`, id);
    const item = currentData.find((item) => item.id === id);
    console.log(`${activeTab} view item:`, item);
  };

  const handleEdit = (id) => {
    console.log(`${activeTab} edit clicked for ID:`, id);
    const item = currentData.find((item) => item.id === id);
    setIdToShowEmailSingle(id);
    setIsEmailShown(true);
    console.log(`${activeTab} edit item:`, item);
  };

  const handleDelete = (id) => {
    console.log(`${activeTab} delete clicked for ID:`, id);
    const item = currentData.find((item) => item.id === id);
    console.log(`${activeTab} deleting item:`, item);
    setCurrentData((prevData) => prevData.filter((item) => item.id !== id));
    setSelectedRows((prev) => prev.filter((selectedId) => selectedId !== id));
    setSelectedData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleBulkDelete = (ids) => {
    console.log(`${activeTab} bulk delete for IDs:`, ids);
    const itemsToDelete = currentData.filter((item) => ids.includes(item.id));
    console.log(`${activeTab} bulk deleting items:`, itemsToDelete);
    setCurrentData((prevData) =>
      prevData.filter((item) => !ids.includes(item.id))
    );
    setSelectedRows([]);
    setSelectedData([]);
  };

  const handleCopyEmail = (email) => {
    console.log(`${activeTab} email copied:`, email);
  };

  return (
    <>
      <div className="">
        <div className="mx-auto">
          <div className="flex w-full items-center justify-center mb-5">
            <div className="flex w-fit">
              <button
                onClick={() => handleTabChange("draft")}
                className={`px-6 py-3 text-sm font-medium transition-colors rounded-s-xl hover:cursor-pointer ${
                  activeTab === "draft"
                    ? "bg-[#645CE8] text-white text-lg"
                    : "bg-[#ededed] text-lg text-black"
                }`}
              >
                Draft
              </button>
              <button
                onClick={() => handleTabChange("sent")}
                className={`px-6 py-3 text-sm font-medium transition-colors rounded-e-xl hover:cursor-pointer ${
                  activeTab === "sent"
                    ? "bg-[#645CE8] text-white text-lg"
                    : "bg-[#ededed] text-lg text-black"
                }`}
              >
                Sent
              </button>
            </div>
          </div>

          {activeTab === "draft" ? (
            <Draft
              data={draftData}
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
            <Sent
              data={sentData}
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

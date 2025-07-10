"use client";

import { useState, useEffect } from "react";
import RecipientForm from "./ReciverInfo";
import EmailPreview from "./EmailPreview";
import toast, { Toaster } from "react-hot-toast";
import ReciverList from "./ReciverList";
import { useGenerateEmailTemplateMutation } from "../../../../../Redux/feature/ApiSlice";

// Dummy data
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

export default function EmailShowGen({
  setIsEmailShown,
  setIdToShowEmailSingle,
  handleDelete,
  idToShowEmailSingle,
  contactData, // New prop for contact data
}) {
  // API hook for email generation
  const [generateEmailTemplate, { isLoading: isGeneratingEmail }] = useGenerateEmailTemplateMutation()
  const [recipientData, setRecipientData] = useState({
    name: "Enter here",
    company: "Technova Solutions",
    position: "Chief Technology Officer",
    email: "Johon.Smith@Technova.com",
    description: "I hope this email finds you well. My name i",
    single: true,
  });

  // Auto-fill recipient data when contactData is provided
  useEffect(() => {
    if (contactData) {
      console.log('📧 Auto-filling recipient data from contact:', contactData)
      setRecipientData({
        name: contactData.name || "Enter here",
        company: contactData.companyName || "Company Name",
        position: contactData.designation || "Position",
        email: contactData.email || "email@example.com",
        description: contactData.description || "I hope this email finds you well.",
        single: true,
      });
    }
  }, [contactData]);

  const [emailData, setEmailData] = useState({
    subject: "Partnership Opportunity with Demo ai",
    content: `Dear John Smith,

I hope this email finds you well. My name is Alex Johnson, and I'm the Business Development Manager at OpenSeason.ai.

I recently came across TechNova Solutions's innovative work in cloud solutions and was particularly impressed by your recent project launch. Given your role as Chief Technology Officer, I believe you might be interested in exploring how our AI-powered business intelligence platform could complement your existing tech stack.`,
  });

  const [isReciverList, setIsReciverList] = useState(false);
  const [ReciverDataList, setReciverDataList] = useState([...sampleData]);
  const [filteredData, setFilteredData] = useState([...sampleData]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("sent");

  const handleRecipientChange = (field, value) => {
    setRecipientData({
      ...recipientData,
      [field]: value,
    });
  };

  const generateEmail = async (tone = "Formal", mailLength = "Short") => {
    try {
      console.log("🔄 Generating email with data:", {
        description: recipientData.description,
        tone,
        mail_length: mailLength
      });

      const templateData = {
        description: recipientData.description || "Generate a professional email",
        tone: tone,
        mail_length: mailLength
      };

      const response = await generateEmailTemplate(templateData).unwrap();
      console.log("✅ Email template generated:", response);

      // Update the email content with the generated response
      const generatedContent = response.email || response.content || response.template || response;
      setEmailData({
        ...emailData,
        content: generatedContent
      });

      toast.success("Email generated successfully!");
    } catch (error) {
      console.error("❌ Failed to generate email:", error);
      toast.error(`Failed to generate email: ${error.data?.detail || error.message || 'Unknown error'}`);
    }
  };

  const handleEmailAction = async (action) => {
    switch (action) {
      case "copy":
        navigator.clipboard.writeText(emailData.content);
        toast.success("Copied");
        break;
      case "draft":
        toast.success("Saved as Draft");
        setTimeout(() => {
          setIdToShowEmailSingle("");
          setIsEmailShown(false);
        }, 700);
        break;
      case "send":
        console.log("Send action triggered");
        break;
      case "delete":
        handleDelete(idToShowEmailSingle);
        toast((t) => (
          <span className="text-red-500 font-bold text-2xl">Deleted</span>
        ));
        setTimeout(() => {
          setIdToShowEmailSingle("");
          setIsEmailShown(false);
        }, 700);
        break;
      case "regenerate":
        console.log("Regenerate action triggered");
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const filtered = ReciverDataList.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSelectionChange = (ids, selectedData) => {
    setSelectedRows(ids);
  };

  const handleView = (id) => {
    setIdToShowEmailSingle(id);
    setIsEmailShown(true);
    setIsReciverList(false);
    const selectedRecipient = ReciverDataList.find((item) => item.id === id);
    setRecipientData({
      ...recipientData,
      name: selectedRecipient.name,
      company: selectedRecipient.companyDetails,
      position: selectedRecipient.designation,
      email: selectedRecipient.email,
    });
  };

  const handleDeleteRow = (id) => {
    const updatedData = ReciverDataList.filter((item) => item.id !== id);
    setReciverDataList(updatedData);
    setFilteredData(
      updatedData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    toast.success("Recipient deleted");
  };

  const handleBulkDelete = (ids) => {
    const updatedData = ReciverDataList.filter(
      (item) => !ids.includes(item.id)
    );
    setReciverDataList(updatedData);
    setFilteredData(
      updatedData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setSelectedRows([]);
    toast.success("Selected recipients deleted");
  };

  const handleCopyEmail = (email) => {
    toast.success(`Email copied: ${email}`);
  };

  return (
    <div className="flex h-[80vh] w-[60%] bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-lg absolute bottom-0 right-5">
      <Toaster />
      {!isReciverList ? (
        <>
          <RecipientForm
            isReciverList={isReciverList}
            setIsReciverList={setIsReciverList}
            recipientData={recipientData}
            onInputChange={handleRecipientChange}
            onGenerateEmail={generateEmail}
          />
          <EmailPreview
            setIsEmailShown={setIsEmailShown}
            emailData={emailData}
            onAction={handleEmailAction}
            setEmailData={setEmailData}
          />
        </>
      ) : (
        <ReciverList
          data={ReciverDataList}
          filteredData={filteredData}
          selectedRows={selectedRows}
          activeTab={activeTab}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSelectionChange={handleSelectionChange}
          onView={handleView}
          onDelete={handleDeleteRow}
          onBulkDelete={handleBulkDelete}
          onCopyEmail={handleCopyEmail}
          goBack={setIsReciverList}
        />
      )}
    </div>
  );
}

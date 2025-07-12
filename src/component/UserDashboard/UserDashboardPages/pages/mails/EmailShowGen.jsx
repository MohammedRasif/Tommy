"use client";

import { useState, useEffect } from "react";
import RecipientForm from "./ReciverInfo";
import EmailPreview from "./EmailPreview";
import toast, { Toaster } from "react-hot-toast";
import ReciverList from "./ReciverList";
import { useGenerateEmailTemplateMutation, useSendEmailMutation } from "../../../../../Redux/feature/ApiSlice";

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
  allContactsData, // All contacts data for recipient list
}) {
  // API hooks for email generation and sending
  const [generateEmailTemplate, { isLoading: isGeneratingEmail }] = useGenerateEmailTemplateMutation()
  const [sendEmail, { isLoading: isSendingEmail }] = useSendEmailMutation()
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
      console.log('📧 Contact ID for API:', contactData.id)
      setRecipientData({
        name: contactData.name || "Enter here",
        company: contactData.companyName || contactData.company_name || "Company Name",
        position: contactData.designation || "Position",
        email: contactData.email || "email@example.com",
        description: contactData.description || "I hope this email finds you well.",
        single: true,
      });
    }
  }, [contactData]);

  // Load actual contact data for recipient list
  useEffect(() => {
    if (allContactsData && Array.isArray(allContactsData)) {
      console.log('📋 Loading actual contact data for recipient list:', allContactsData)
      // Transform contact data to match the expected format for recipient list
      const transformedContacts = allContactsData.map(contact => ({
        id: contact.id,
        name: contact.name,
        designation: contact.designation,
        companyDetails: contact.companyName || "N/A",
        email: contact.email,
      }));
      setReciverDataList(transformedContacts);
      setFilteredData(transformedContacts);
    } else {
      // Fallback to sample data if no contacts provided
      console.log('📋 No contact data provided, using sample data')
      setReciverDataList([...sampleData]);
      setFilteredData([...sampleData]);
    }
  }, [allContactsData]);

  const [emailData, setEmailData] = useState({
    subject: "",
    content: "",


  });

  // State to store all generated emails and track which one is currently displayed
  const [generatedEmails, setGeneratedEmails] = useState([]);
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);

  const [isReciverList, setIsReciverList] = useState(false);
  const [ReciverDataList, setReciverDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("sent");
  const [currentMode, setCurrentMode] = useState("Single");

  const handleRecipientChange = (field, value) => {
    setRecipientData({
      ...recipientData,
      [field]: value,
    });
  };

  // Function to handle clicking on a recipient to view their email
  const handleRecipientEmailView = (recipientEmail) => {
    if (generatedEmails.length === 0) return;

    // Find the email that matches this recipient
    const emailIndex = generatedEmails.findIndex(email => email.recipient === recipientEmail);

    if (emailIndex !== -1) {
      setCurrentEmailIndex(emailIndex);
      const selectedEmail = generatedEmails[emailIndex];

      setEmailData({
        subject: selectedEmail.subject || emailData.subject,
        content: selectedEmail.email_body || ""
      });

      console.log(`📧 Switched to email for recipient: ${recipientEmail}`);
      console.log(`📧 Email index: ${emailIndex}`);
    }
  };

  // Function to handle sending email
  const handleSendEmail = async () => {
    try {
      // Validate email content
      if (!emailData.content.trim()) {
        toast.error("Please generate email content before sending");
        return;
      }

      if (!emailData.subject.trim()) {
        toast.error("Please enter a subject before sending");
        return;
      }

      // Determine recipients based on current mode and context
      let recipientsList = [];

      if (currentMode === "Multiple" && generatedEmails.length > 0) {
        // For multiple mode: send to all recipients who have generated emails
        recipientsList = generatedEmails.map(email => email.recipient);
      } else if (currentMode === "Single" && contactData && contactData.email) {
        // For single mode: send to the current contact
        recipientsList = [contactData.email];
      } else if (generatedEmails.length > 0 && generatedEmails[currentEmailIndex]) {
        // Fallback: send to the currently viewed email's recipient
        recipientsList = [generatedEmails[currentEmailIndex].recipient];
      } else {
        toast.error("No recipients found. Please select recipients and generate emails first.");
        return;
      }

      // Prepare the email data according to API format
      // API expects an array of objects, each containing subject, message, and recipients_list with single recipient
      const emailPayload = recipientsList.map(recipient => ({
        subject: emailData.subject,
        message: emailData.content,
        recipients_list: [recipient] // Each object has a single recipient in array
      }));

      console.log("📧 Sending email with payload:", emailPayload);
      console.log("📧 Payload structure - Array of objects:", emailPayload.length, "emails");

      const response = await sendEmail(emailPayload).unwrap();
      console.log("✅ Email sent successfully:", response);

      toast.success(`Email sent successfully to ${recipientsList.length} recipient${recipientsList.length !== 1 ? 's' : ''}!`);

      // Optional: Close the email popup after successful send
      setTimeout(() => {
        setIdToShowEmailSingle("");
        setIsEmailShown(false);
      }, 2000);

    } catch (error) {
      console.error("❌ Failed to send email:", error);
      toast.error(`Failed to send email: ${error.data?.detail || error.message || 'Unknown error'}`);
    }
  };

  const generateEmail = async (tone = "Formal", mailLength = "Short") => {
    try {
      // Get selected recipients for Multiple mode
      const selectedRecipients = ReciverDataList.filter(item => selectedRows.includes(item.id));

      // Validation: Check if Multiple mode has selected recipients
      if (currentMode === "Multiple" && selectedRecipients.length === 0) {
        toast.error("Please select at least one recipient from the recipient list.");
        return;
      }

      console.log("🔄 Generating email with data:", {
        description: recipientData.description,
        tone,
        mail_length: mailLength,
        subject: emailData.subject,
        mode: currentMode,
        selectedRecipients: selectedRecipients.length
      });

      const templateData = {
        description: recipientData.description || "Generate a professional email",
        tone: tone,
        mail_length: mailLength,
        subject: emailData.subject || "",
        recipients: []
      };

      // Add recipients field based on mode
      if (currentMode === "Multiple" && selectedRecipients.length > 0) {
        // For Multiple mode: use selected recipients' IDs
        templateData.recipients = selectedRecipients.map(recipient => {
          const id = parseInt(recipient.id);
          console.log(`📧 Adding recipient ID: ${id} (${recipient.name})`);
          return id;
        });
      } else if (currentMode === "Single" && contactData && contactData.id) {
        // For Single mode: use the current contact's ID
        const contactId = parseInt(contactData.id);
        console.log(`📧 Using single contact ID: ${contactId} (${contactData.name})`);
        templateData.recipients = [contactId];
      } else {
        console.log("⚠️ No valid recipients found for email generation");
        // If no recipients, still send empty array as per API requirement
        templateData.recipients = [];
      }

      console.log("📧 Final template data being sent:", templateData);
      console.log("📧 Subject being sent to API:", templateData.subject);

      const response = await generateEmailTemplate(templateData).unwrap();
      console.log("✅ Email template generated:", response);

      // Handle the new API response structure
      let generatedContent = "";
      let generatedSubject = emailData.subject;

      if (response.emails && Array.isArray(response.emails) && response.emails.length > 0) {
        // New API structure: store all emails and display the first one
        setGeneratedEmails(response.emails);
        setCurrentEmailIndex(0);

        const firstEmail = response.emails[0];
        generatedContent = firstEmail.email_body || "";
        generatedSubject = firstEmail.subject || emailData.subject;
        console.log("📧 Extracted email content from new API structure");
        console.log("📧 Email body:", generatedContent.substring(0, 100) + "...");
        console.log("📧 Subject:", generatedSubject);
        console.log(`📧 Stored ${response.emails.length} emails for navigation`);

        if (response.emails.length > 1) {
          console.log(`📧 Generated ${response.emails.length} emails, showing the first one`);
          toast.success(`Generated ${response.emails.length} emails successfully! Click on recipients to view their emails.`);
        } else {
          toast.success("Email generated successfully!");
        }
      } else {
        // Fallback to old structure if needed
        setGeneratedEmails([]);
        setCurrentEmailIndex(0);
        generatedContent = response.template_string || response.email || response.content || response.template || "";
        console.log("📧 Using fallback content extraction");
        console.log("📧 Available response keys:", Object.keys(response));
        toast.success("Email generated successfully!");
      }

      setEmailData({
        subject: generatedSubject,
        content: generatedContent
      });
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
        await handleSendEmail();
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
        // Regenerate email with current settings
        await generateEmail("Formal", "Short");
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

  // Custom back handler to preserve Multiple mode when returning from recipient list
  const handleBackFromRecipientList = () => {
    setIsReciverList(false);
    // If there are selected recipients, ensure we're in Multiple mode
    if (selectedRows.length > 0) {
      setCurrentMode("Multiple");
    }
  };

  const handleView = (id) => {
    setIdToShowEmailSingle(id);
    setIsEmailShown(true);
    setIsReciverList(false);
    const selectedRecipient = ReciverDataList.find((item) => item.id === id);
    if (selectedRecipient) {
      setRecipientData({
        ...recipientData,
        name: selectedRecipient.name,
        company: selectedRecipient.companyDetails,
        position: selectedRecipient.designation,
        email: selectedRecipient.email,
        description: "I hope this email finds you well.",
        single: true,
      });
    }
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
            selectedRecipients={ReciverDataList.filter(item => selectedRows.includes(item.id))}
            onRemoveRecipient={(id) => {
              setSelectedRows(prev => prev.filter(rowId => rowId !== id));
            }}
            currentMode={currentMode}
            setCurrentMode={setCurrentMode}
            isGeneratingEmail={isGeneratingEmail}
            hasSelectedRecipients={selectedRows.length > 0}
            onRecipientEmailView={handleRecipientEmailView}
            generatedEmails={generatedEmails}
            currentEmailIndex={currentEmailIndex}
          />
          <EmailPreview
            setIsEmailShown={setIsEmailShown}
            emailData={emailData}
            onAction={handleEmailAction}
            setEmailData={setEmailData}
            isSendingEmail={isSendingEmail}
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
          goBack={handleBackFromRecipientList}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import RecipientForm from "./ReciverInfo";
import EmailPreview from "./EmailPreview";
import toast, { Toaster } from "react-hot-toast";

export default function EmailGenerator({
  setIsEmailShown,
  setIdToShowEmailSingle,
  handleDelete,
  idToShowEmailSingle,
}) {
  const [recipientData, setRecipientData] = useState({
    name: "Enter here",
    company: "Technova Solutions",
    position: "Chief Technology Officer",
    email: "Johon. SMith @Technova.com",
    description: "I hope this email finds you well. My name i",
    single: true,
  });

  const [emailData, setEmailData] = useState({
    subject: "Partnership Opportunity with Demo ai",
    content: `Dear John Smith,

I hope this email finds you well. My name is Alex Johnson, and I'm the Business Development Manager at OpenSeason.ai.

I recently came across TechNova Solutions's innovative work in cloud solutions and was particularly impressed by your recent project launch. Given your role as Chief Technology Officer, I believe you might be interested in exploring how our AI-powered business intelligence platform could complement your existing tech stack.

I hope this email finds you well. My name is Alex Johnson, and I'm the Business Development Manager at OpenSeason.ai.

I recently came across TechNova Solutions's innovative work in cloud solutions and was particularly impressed by your recent project launch. Given your role as Chief Technology Officer, I believe you I recently came across TechNova Solutions's innovative work in cloud solutions and was particularly impressed by your recent project launch. Given your role as Chief Technology Officer, I believe yourecently came across TechNova Solutions's innovative work in cloud solutions hief Technology Officer, I believe yourecently came across TechNova Solutions's innovative work in cloud solutions`,
  });

  const handleRecipientChange = (field, value) => {
    setRecipientData({
      ...recipientData,
      [field]: value,
    });
  };

  const generateEmail = () => {
    console.log("Generating email with recipient data:", recipientData);
    // You can add a real API call or logic here
  };

  const handleEmailAction = async (action) => {
    switch (action) {
      case "copy":
        // console.log("Copy action triggered");
        navigator.clipboard.writeText(emailData.content);
        toast.success("copied ");
        break;
      case "draft":
        // console.log("Draft action triggered");
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
        console.log("Delete action triggered");
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

  return (
    <div className="flex h-[80vh] w-[60%] bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-lg absolute bottom-0 right-5">
      <Toaster />
      <RecipientForm
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
    </div>
  );
}

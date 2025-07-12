"use client";

import { useState } from "react";
import { Settings, ChevronDown, ChevronRight } from "lucide-react";
import { FaPlus } from "react-icons/fa";

export default function RecipientForm({
  recipientData,
  onInputChange,
  onGenerateEmail,
  setIsReciverList,
  selectedRecipients = [],
  onRemoveRecipient,
  currentMode = "Single",
  setCurrentMode,
  isGeneratingEmail = false,
  hasSelectedRecipients = false,
  onRecipientEmailView,
  generatedEmails = [],
  currentEmailIndex = 0,
}) {
  const [tone, setTone] = useState("Formal");
  const [length, setLength] = useState("Medium");

  return (
    <div className="w-[35%] p-4 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-800">
          Recipient Information
        </h2>
        <div className="relative">
          <select
            value={currentMode}
            onChange={(e) => setCurrentMode && setCurrentMode(e.target.value)}
            className="text-xs text-gray-600 border border-gray-300 rounded p-1"
          >
            <option value="Single">Single</option>
            <option value="Multiple">Multiple</option>
          </select>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {currentMode == "Single" && (
            <>
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={recipientData.name}
                  placeholder="Enter here"
                  onChange={(e) => onInputChange("name", e.target.value)}
                  className="w-full p-1.5 border border-gray-300 rounded text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  value={recipientData.company}
                  placeholder="Enter here"
                  onChange={(e) => onInputChange("company", e.target.value)}
                  className="w-full p-1.5 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                />
              </div>
              <div>
                <label
                  htmlFor="position"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  placeholder="Enter here"
                  value={recipientData.position}
                  onChange={(e) => onInputChange("position", e.target.value)}
                  className="w-full p-1.5 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                />
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              {currentMode == "Single" ? "Email" : "Emails"}
            </label>
            {currentMode == "Single" ? (
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                value={recipientData.email}
                onChange={(e) => onInputChange("email", e.target.value)}
                className="w-full p-1.5 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
              />
            ) : (
              <div>
                <div
                  onClick={() => {
                    setIsReciverList((prev) => !prev);
                  }}
                  className="flex items-center gap-3 text-[#4F46E5] cursor-pointer mb-3"
                >
                  <span>Recipient List </span>
                  <FaPlus />
                </div>

                {/* Selected Recipients Display */}
                {selectedRecipients && selectedRecipients.length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-col">
                        <div className="text-xs font-medium text-gray-700">
                          Selected Recipients ({selectedRecipients.length})
                        </div>
                        {generatedEmails.length > 0 && (
                          <div className="text-xs text-green-600 font-medium">
                            {generatedEmails.length} email{generatedEmails.length !== 1 ? 's' : ''} generated • Click to view
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          selectedRecipients.forEach(recipient => {
                            onRemoveRecipient && onRemoveRecipient(recipient.id);
                          });
                        }}
                        className="text-xs text-red-500 hover:text-red-700 underline"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="max-h-32 overflow-y-auto space-y-2">
                      {selectedRecipients.map((recipient, index) => {
                        // Check if this recipient has a generated email and if it's currently selected
                        const hasGeneratedEmail = generatedEmails.some(email => email.recipient === recipient.email);
                        const isCurrentlyViewed = generatedEmails.length > 0 &&
                          generatedEmails[currentEmailIndex]?.recipient === recipient.email;

                        return (
                          <div
                            key={recipient.id}
                            className={`flex items-center justify-between p-2 rounded-md border transition-all cursor-pointer ${
                              isCurrentlyViewed
                                ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-300'
                                : hasGeneratedEmail
                                  ? 'bg-green-50 border-green-200 hover:bg-green-100'
                                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                            onClick={() => hasGeneratedEmail && onRecipientEmailView && onRecipientEmailView(recipient.email)}
                            title={hasGeneratedEmail ? "Click to view this recipient's email" : "Email not generated yet"}
                          >
                            <div className="flex-1 min-w-0">
                              <div className={`text-xs font-medium truncate flex items-center ${
                                isCurrentlyViewed ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {recipient.name}
                                {isCurrentlyViewed && (
                                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Viewing
                                  </span>
                                )}
                                {hasGeneratedEmail && !isCurrentlyViewed && (
                                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Ready
                                  </span>
                                )}
                              </div>
                              <div className={`text-xs truncate ${
                                isCurrentlyViewed ? 'text-blue-700' : 'text-gray-500'
                              }`}>
                                {recipient.email}
                              </div>
                              <div className={`text-xs truncate ${
                                isCurrentlyViewed ? 'text-blue-600' : 'text-gray-400'
                              }`}>
                                {recipient.designation} • {recipient.companyDetails}
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the email view
                                onRemoveRecipient && onRemoveRecipient(recipient.id);
                              }}
                              className="ml-2 p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Remove recipient"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* No Recipients Selected Message */}
                {(!selectedRecipients || selectedRecipients.length === 0) && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="text-xs text-blue-700">
                      <div className="font-medium mb-1">No recipients selected</div>
                      <div className="text-blue-600">
                        Click "Recipient List" above to select email recipients for bulk sending.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={recipientData.description}
              onChange={(e) => onInputChange("description", e.target.value)}
              rows={2}
              className="w-full p-1.5 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs resize-none"
            />
          </div>

          <div className="pt-2">
            <div className="flex items-center mb-2">
              <Settings className="h-3 w-3 text-gray-600 mr-1" />
              <span className="font-medium text-gray-800 text-xs">
                Email Settings
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1">
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="p-1.5 border border-gray-200 rounded text-xs text-gray-700"
              >
                <option value="Formal">Formal</option>
                <option value="Friendly">Friendly</option>
                <option value="Persuasive">Persuasive</option>
              </select>

              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="p-1.5 border border-gray-200 rounded text-xs text-gray-700"
              >
                <option value="Short">Short</option>
                <option value="Medium">Medium</option>
                <option value="Long">Long</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-2 leading-tight">
            Our AI generates unique emails based on your inputs. Each generation
            may produce different results.
          </div>

          <button
            onClick={() => onGenerateEmail(tone, length)}
            disabled={isGeneratingEmail || (currentMode === "Multiple" && !hasSelectedRecipients)}
            className={`w-full py-2 rounded-md flex items-center justify-center transition-colors text-xs font-medium ${
              isGeneratingEmail || (currentMode === "Multiple" && !hasSelectedRecipients)
                ? 'bg-indigo-400 text-white cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isGeneratingEmail ? (
              <>
                <svg
                  className="w-3 h-3 mr-1 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    className="opacity-75"
                  />
                </svg>
                Generating Email...
              </>
            ) : currentMode === "Multiple" && !hasSelectedRecipients ? (
              <>
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Select Recipients
              </>
            ) : (
              <>
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4V20M12 4L6 10M12 4L18 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Generate Email
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

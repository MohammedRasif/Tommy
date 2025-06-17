"use client";

import { Minus, X, Copy, FileText, Send, Trash, RefreshCw } from "lucide-react";
import { BsTrash3 } from "react-icons/bs";

export default function EmailPreview({
  emailData,
  onAction,
  setEmailData,
  setIsEmailShown,
  setIdToShowEmailSingle,
}) {
  return (
    <div className="w-[65%] bg-white flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-base font-semibold text-gray-800">
          Generated Email
        </h2>
        <div className="flex items-center space-x-1">
          {/* <button className="p-1 text-gray-500 hover:text-gray-700 hover:cursor-pointer">
            <Minus className="h-5 w-5" />
          </button> */}
          <button
            className="p-1 text-gray-500 hover:cursor-pointer hover:text-red-500"
            onClick={() => {
              setIsEmailShown(false);
              setIdToShowEmailSingle("");
            }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Subject */}
      <div className="px-3 py-2 border-b border-gray-100 flex-shrink-0">
        <div className="text-xs text-gray-500 mb-1">Subject</div>
        <input
          type="text"
          value={emailData.subject}
          onChange={(e) =>
            setEmailData((prev) => ({
              ...prev,
              subject: e.target.value,
            }))
          }
          className="w-full text-[#272C36] font-medium text-sm bg-transparent border-none outline-none"
        />
      </div>

      {/* Email Content - Scrollable */}
      <div className="flex-1 p-3 overflow-hidden">
        <div className="h-full border border-gray-200 rounded-md p-3 bg-gray-50 text-[#272C36]">
          <textarea
            value={emailData.content}
            onChange={(e) =>
              setEmailData((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
            className="w-full h-full bg-gray-50 text-gray-800 text-sm leading-relaxed resize-none outline-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-gray-200 p-3 flex items-center justify-between flex-shrink-0">
        <div className="flex space-x-1">
          <button
            onClick={() => onAction("copy")}
            className="flex items-center px-2 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm hover:cursor-pointer"
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy
          </button>

          <button
            onClick={() => onAction("draft")}
            className="flex items-center px-2 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm hover:cursor-pointer"
          >
            <FileText className="h-3 w-3 mr-1" />
            Draft
          </button>

          <button
            onClick={() => onAction("send")}
            className="flex items-center px-2 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm hover:cursor-pointer"
          >
            <Send className="h-3 w-3 mr-1" />
            Send
          </button>

          <button
            onClick={() => onAction("delete")}
            className="flex items-center px-2 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm hover:cursor-pointer"
          >
            <BsTrash3 className="h-3 w-3 mr-1 text-red-500" />
            Delete
          </button>
        </div>

        <button
          onClick={() => onAction("regenerate")}
          className="flex items-center px-2 py-1 border border-indigo-300 text-indigo-600 rounded-md hover:bg-indigo-50 text-sm hover:cursor-pointer"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Regenerate
        </button>
      </div>
    </div>
  );
}

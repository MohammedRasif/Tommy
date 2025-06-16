"use client";

import { Settings, ChevronRight } from "lucide-react";

export default function RecipientForm({
  recipientData,
  onInputChange,
  onGenerateEmail,
}) {
  return (
    <div className="w-[30%] p-4 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-800">
          Recipient Information
        </h2>
        <div className="relative">
          <button className="flex items-center text-gray-600 text-xs">
            Single
            <ChevronRight className="h-3 w-3 ml-1" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-3">
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
              value={recipientData.position}
              onChange={(e) => onInputChange("position", e.target.value)}
              className="w-full p-1.5 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={recipientData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              className="w-full p-1.5 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            />
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
              <button className="flex items-center justify-between p-1.5 border border-gray-200 rounded text-xs">
                <span className="text-gray-700">Tone</span>
                <ChevronRight className="h-2 w-2 text-gray-500" />
              </button>
              <button className="flex items-center justify-between p-1.5 border border-gray-200 rounded text-xs">
                <span className="text-gray-700">Length</span>
                <ChevronRight className="h-2 w-2 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-2 leading-tight">
            Our AI generates unique emails based on your inputs. Each generation
            may produce different results.
          </div>

          <button
            onClick={onGenerateEmail}
            className="w-full py-2 bg-indigo-600 text-white rounded-md flex items-center justify-center hover:bg-indigo-700 transition-colors text-xs font-medium"
          >
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
          </button>
        </div>
      </div>
    </div>
  );
}

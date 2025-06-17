"use client";

import { useState } from "react";
import { Settings, ChevronDown, ChevronRight } from "lucide-react";
import { FaPlus } from "react-icons/fa";

export default function RecipientForm({
  recipientData,
  onInputChange,
  onGenerateEmail,
  setIsReciverList,
}) {
  const [mode, setMode] = useState("Single");
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
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="text-xs text-gray-600 border border-gray-300 rounded p-1"
          >
            <option value="Single">Single</option>
            <option value="Multiple">Multiple</option>
          </select>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {mode == "Single" && (
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
              {mode == "single" ? "Email" : "Emails"}
            </label>
            {mode == "Single" ? (
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                value={recipientData.email}
                onChange={(e) => onInputChange("email", e.target.value)}
                className="w-full p-1.5 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
              />
            ) : (
              <div
                onClick={() => {
                  setIsReciverList((prev) => !prev);
                }}
                className="flex items-center  gap-3 text-[#4F46E5] cursor-pointer"
              >
                <span>Recipient List </span>
                <FaPlus />
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

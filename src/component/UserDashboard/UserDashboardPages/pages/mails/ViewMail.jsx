import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";

export default function ViewMail({ setIsViewOpen }) {
  return (
    <div className="fixed inset-0 bg-[#ffffff73] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              variant="ghost"
              size="sm"
              onClick={() => setIsViewOpen(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">Sent Mail</span>
            </div>
          </div>
        </div>

        {/* Email Details */}
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-sm text-gray-500 w-16 flex-shrink-0">
                From
              </span>
              <span className="text-sm text-gray-900">
                sajibathamed@gmail.com
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-sm text-gray-500 w-16 flex-shrink-0">
                To
              </span>
              <span className="text-sm text-gray-900">
                Rakibrahamed@gmail.com
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-sm text-gray-500 w-16 flex-shrink-0">
                Subject
              </span>
              <span className="text-sm text-gray-900">
                Partnership Opportunity with Demo.ai
              </span>
            </div>
          </div>

          {/* Email Body */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <div className="text-sm text-gray-800 leading-relaxed space-y-4">
                <p>Dear John Smith,</p>

                <p>
                  I hope this email finds you well. My name is Alex Johnson, and
                  I'm the Business Development Manager at OpenSeason.ai.
                </p>

                <p>
                  I recently came across TechNova Solutions's innovative work in
                  cloud solutions and was particularly impressed by your recent
                  project launch. Given your role as Chief Technology Officer, I
                  believe you might be interested in exploring how our
                  AI-powered business intelligence platform could complement
                  your existing tech stack.
                </p>

                <p>
                  I hope this email finds you well. My name is Alex Johnson, and
                  I'm the Business Development Manager at OpenSeason.ai.
                </p>

                <p>
                  I recently came across TechNova Solutions's innovative work in
                  cloud solutions and was particularly impressed by your recent
                  project launch. Given your role as Chief Technology Officer, I
                  believe you recently came across TechNova Solutions's
                  innovative work in cloud solutions and was particularly
                  impressed by your recent project launch. Given your role as
                  Chief Technology Officer, I believe you recently came across
                  TechNova Solutions's innovative work in cloud solutions and
                  Technology Officer, I believe you recently came across
                  TechNova Solutions's innovative work in cloud solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

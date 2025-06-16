"use client"

import { useState } from "react"

const MemberShip = () => {
  const [currentPlan, setCurrentPlan] = useState("Free")

  const membershipInfo = {
    startDate: "12 July, 2025",
    currentPlan: "Free",
    endDate: "12 July, 2025",
  }

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$5.99",
      period: "/Month",
      isRecommended: false,
      features: [
        "All freemium features",
        "Unlimited AI Recommendations (advanced ingredient & compatibility filters)",
        "Advanced Routine Builder (unlimited daily/weekly/monthly routines, smart sequencing, reminders)",
        "Hair Health Dashboard (track length, breakage, elasticity, scalp health, photo progress)",
        "Additional analysis tests",
        "Ads free",
      ],
    },
    {
      id: "standard",
      name: "Standard",
      price: "$5.99",
      period: "/Month",
      isRecommended: true,
      features: [
        "All freemium features",
        "Unlimited AI Recommendations (advanced ingredient & compatibility filters)",
        "Advanced Routine Builder (unlimited daily/weekly/monthly routines, smart sequencing, reminders)",
        "Hair Health Dashboard (track length, breakage, elasticity, scalp health, photo progress)",
        "Additional analysis tests",
        "Ads free",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$5.99",
      period: "/Month",
      isRecommended: false,
      features: [
        "All freemium features",
        "Unlimited AI Recommendations (advanced ingredient & compatibility filters)",
        "Advanced Routine Builder (unlimited daily/weekly/monthly routines, smart sequencing, reminders)",
        "Hair Health Dashboard (track length, breakage, elasticity, scalp health, photo progress)",
        "Additional analysis tests",
        "Ads free",
      ],
    },
  ]

  const handlePlanSelect = (planId) => {
    console.log(`Selected plan: ${planId}`)
    // Handle plan selection logic here
  }

  return (
    <div className="py-8">
      <div className=" mx-auto ">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-gray-700 mb-8">{"Let's have a look to all packages"}</h1>

          {/* Current Membership Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Date of Starting</h3>
                <p className="text-gray-800">{membershipInfo.startDate}</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Membership (Current)</h3>
                <p className="text-gray-800">{membershipInfo.currentPlan}</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Date of end</h3>
                <p className="text-gray-800">{membershipInfo.endDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl ">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg p-6 ${
                plan.isRecommended ? "border border-gray-200 shadow-sm" : "border border-gray-200 shadow-sm"
              } transition-all duration-200 hover:shadow-md`}
            >
              {/* Plan Header */}
              <div className="text-center mb-6">
                <h2
                  className={`text-2xl font-semibold mb-4 ${
                    plan.name === "Free"
                      ? "text-[#4F46E5]"
                      : plan.name === "Standard"
                        ? "text-[#4F46E5]"
                        : "text-[#4F46E5]"
                  }`}
                >
                  {plan.name}
                </h2>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Features</h3>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-[#4F46E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="ml-3 text-sm text-gray-600 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buy Button */}
              <button
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors cursor-pointer ${
                  plan.isRecommended
                    ? "bg-[#4F46E5] text-white hover:bg-blue-700"
                    : "bg-[#4F46E5] text-white hover:bg-blue-700"
                }`}
              >
                Buy now
              </button>
            </div>
          ))}
        </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">All plans include a 30-day money-back guarantee. Cancel anytime.</p>
        </div>
      </div>
    </div>
  )
}

export default MemberShip

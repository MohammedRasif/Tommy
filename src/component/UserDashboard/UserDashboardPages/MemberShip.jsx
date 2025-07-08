"use client"

import { useState, useEffect } from "react"
import { useGetSubscriptionPlansQuery, useSubscribeToplanMutation } from "../../../Redux/feature/ApiSlice"

const MemberShip = () => {
  // Fetch subscription plans from API
  const { data: plansData, error, isLoading } = useGetSubscriptionPlansQuery()

  // Subscription mutation
  const [subscribeToplan, { isLoading: isSubscribing }] = useSubscribeToplanMutation()

  // State for showing success/cancel messages
  const [showMessage, setShowMessage] = useState(null)

  // Check URL parameters for success/cancel status
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('success') === 'true') {
      setShowMessage({ type: 'success', text: 'Subscription successful! Welcome to your new plan.' })
    } else if (urlParams.get('cancelled') === 'true') {
      setShowMessage({ type: 'error', text: 'Subscription cancelled. You can try again anytime.' })
    }

    // Clear URL parameters after showing message
    if (urlParams.get('success') || urlParams.get('cancelled')) {
      const newUrl = window.location.pathname
      window.history.replaceState({}, document.title, newUrl)
    }
  }, [])

  // Default features for display (since API doesn't include features)
  // const defaultFeatures = [
  //   "All freemium features",
  //   "Unlimited AI Recommendations (advanced ingredient & compatibility filters)",
  //   "Advanced Routine Builder (unlimited daily/weekly/monthly routines, smart sequencing, reminders)",
  //   "Hair Health Dashboard (track length, breakage, elasticity, scalp health, photo progress)",
  //   "Additional analysis tests",
  //   "Ads free",
  // ]

  // Transform API data to match component structure
  const plans = plansData ? plansData.map((plan, index) => ({
    id: plan.id,
    name: plan.name,
    price: `$${plan.plan_price}`,
    // period: "/Month",
    isRecommended: index === 1, // Make second plan recommended
    // features: defaultFeatures,
    bulkEmailCredit: plan.bulk_email_credit,
    searchCredit: plan.search_credit,
    emailGenerationCredit: plan.email_generation_credit,
    stripePriceId: plan.stripe_price_id,
    isFree: parseFloat(plan.plan_price) === 0 || plan.name.toLowerCase().includes('free')
  })) : []

  const handlePlanSelect = async (planId) => {
    const selectedPlan = plans.find(plan => plan.id === planId)
    console.log(`Selected plan:`, selectedPlan)

    // Don't process free plans
    if (selectedPlan?.isFree) {
      console.log('Free plan selected, no action needed')
      return
    }

    try {
      // Prepare subscription data
      const subscriptionData = {
        plan: planId,
        success_url: `${window.location.origin}/dashboard/membership?success=true`,
        cancel_url: `${window.location.origin}/dashboard/membership?cancelled=true`
      }

      console.log('Subscribing with data:', subscriptionData)

      // Call the subscription API
      const response = await subscribeToplan(subscriptionData).unwrap()

      console.log('Subscription response:', response)

      // Always redirect to the response URL (Stripe checkout or payment page)
      if (response.subscription_link) {
        console.log('Redirecting to subscription link:', response.subscription_link)
        window.location.href = response.subscription_link
      } else if (response.checkout_url) {
        window.location.href = response.checkout_url
      } else if (response.url) {
        window.location.href = response.url
      } else if (response.redirect_url) {
        window.location.href = response.redirect_url
      } else {
        // If no redirect URL is provided, show success message
        console.warn('No redirect URL provided in response:', response)
        alert('Subscription initiated successfully!')
      }

    } catch (error) {
      console.error('Subscription failed:', error)
      alert('Failed to start subscription. Please try again.')
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="py-8">
        <div className="mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium text-gray-700 mb-8">{"Let's have a look to all packages"}</h1>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F46E5]"></div>
              <span className="ml-3 text-gray-600">Loading subscription plans...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="py-8">
        <div className="mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium text-gray-700 mb-8">{"Let's have a look to all packages"}</h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="text-red-600 mb-2">
                <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-red-800 mb-2">Failed to load subscription plans</h3>
              <p className="text-red-600">Please try refreshing the page or contact support if the problem persists.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className=" mx-auto ">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-gray-700 mb-8">{"Let's have a look to all packages"}</h1>

          {/* Success/Cancel Message */}
          {showMessage && (
            <div className={`mb-6 p-4 rounded-lg ${
              showMessage.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <div className="flex items-center justify-center">
                {showMessage.type === 'success' ? (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className="font-medium">{showMessage.text}</span>
                <button
                  onClick={() => setShowMessage(null)}
                  className="ml-4 text-sm underline hover:no-underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Current Membership Info */}
          {/* <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
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
          </div> */}
        </div>

        {/* Pricing Cards */}
        <div className="flex items-center justify-center ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mt-25 ">
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

              {/* Credits Information */}
              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Plan Credits</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bulk Email Credits:</span>
                    <span className="font-medium text-gray-800">
                      {plan.bulkEmailCredit >= 0 ? plan.bulkEmailCredit.toLocaleString() : 'Unlimited'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Search Credits:</span>
                    <span className="font-medium text-gray-800">
                      {plan.searchCredit >= 0 ? plan.searchCredit.toLocaleString() : 'Unlimited'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email Generation Credits:</span>
                    <span className="font-medium text-gray-800">
                      {plan.emailGenerationCredit >= 0 ? plan.emailGenerationCredit.toLocaleString() : 'Unlimited'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              {/* <div className="mb-8">
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
              </div> */}

              {/* Buy Button */}
              <button
                onClick={() => !plan.isFree && handlePlanSelect(plan.id)}
                disabled={isSubscribing || plan.isFree}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                  plan.isFree
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : isSubscribing
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : plan.isRecommended
                        ? "bg-[#4F46E5] text-white hover:bg-blue-700 cursor-pointer"
                        : "bg-[#4F46E5] text-white hover:bg-blue-700 cursor-pointer"
                }`}
              >
                {plan.isFree ? (
                  "Current Plan"
                ) : isSubscribing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Buy now"
                )}
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

import { Check } from "lucide-react";

const Package = () => {
  const packages = [
    {
      name: "Basic",
      price: "$5.99/Month",
      features: [
        "All freemium features",
        "Unlimited AI recommendations",
        "Advanced Routine Builder",
        "Hair-Health Dashboard",
        "Additional analysis tests",
        "Ads free",
      ],
    },
    {
      name: "Standard",
      price: "$9.99/Month",
      features: [
        "All Basic features",
        "Priority customer support",
        "Advanced analytics",
        "Custom routine templates",
        "Expert consultations (2/month)",
        "Premium ingredient database",
      ],
    },
    {
      name: "Premium",
      price: "$14.99/Month",
      features: [
        "All Standard features",
        "Unlimited expert consultations",
        "Personalized hair coach",
        "Advanced photo analysis",
        "Custom product recommendations",
        "Priority feature access",
      ],
    },
  ];

  return (
    <div id="pricing" className="bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Find Your Appropriate Package Here
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Let's have a look at all packages
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 mb-2 sm:mb-3">
                  {pkg.name}
                </h2>
                <div className="mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
                    {pkg.price.split("/")[0]}
                  </span>
                  <span className="text-sm sm:text-base text-gray-600">
                    /{pkg.price.split("/")[1]}
                  </span>
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                  Features
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 sm:gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <span className="text-xs sm:text-sm lg:text-sm text-gray-600 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="mt-auto w-full bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-700 transition-colors duration-200">
                Buy now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Package;
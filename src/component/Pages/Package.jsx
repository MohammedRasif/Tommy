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
        "Hair-Health Dashboard ",
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
    <div id="pricing" className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Your Appropriate Package Here</h1>
          <p className="text-lg text-gray-600">Let's have a look to all packages</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-purple-600 mb-3">{pkg.name}</h2>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-800">{pkg.price.split("/")[0]}</span>
                  <span className="text-gray-600">/{pkg.price.split("/")[1]}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Features</h3>
                <ul className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <Check className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="mt-auto w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
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
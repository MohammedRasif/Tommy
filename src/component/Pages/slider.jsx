"use client"

import { useState } from "react"

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = [
    {
      id: 1,
      text: "Slate empowers you to discover the exact number of days you must work to achieve your financial aspirations with clear, actionable insights provided daily.",
      name: "John Smith",
      title: "Financial Advisor",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
      rating: 4,
    },
    {
      id: 2,
      text: "With Slate, you can track precisely how many additional days of work are required to successfully attain your personal financial objectives and dreams.",
      name: "Veres Panna",
      title: "Spa Manager",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg",
      rating: 4,
    },
    {
      id: 3,
      text: "With Slate, you can track precisely how many additional days of work are required to successfully attain your personal financial objectives and dreams.",
      name: "Pásztor Kira",
      title: "Nail Technician",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529170/samples/people/bicycle.jpg",
      rating: 4,
    },
    {
      id: 4,
      text: "Using Slate, you’ll understand how many more days you need to dedicate to work to secure your financial future with confidence and precision.",
      name: "Varga Dóra",
      title: "Massage Therapist",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/smiling-man.jpg",
      rating: 4,
    },
    {
      id: 5,
      text: "Slate assists you in determining the number of workdays left to meet your financial targets, providing straightforward insights for effective planning and progress.",
      name: "Sarah Johnson",
      title: "Business Analyst",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529168/samples/people/kitchen-bar.jpg",
      rating: 5,
    },
    {
      id: 6,
      text: "Slate reveals the exact count of days you still need to work to accomplish your financial ambitions, delivering clear guidance and strategic support.",
      name: "Mike Wilson",
      title: "Project Manager",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-escalator.jpg",
      rating: 4,
    },
    {
      id: 7,
      text: "Through Slate, you’ll see how many extra days of effort are necessary to reach your financial goals, with tools designed for clear tracking.",
      name: "Emily Davis",
      title: "Marketing Director",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-street.jpg",
      rating: 5,
    },
    {
      id: 8,
      text: "Slate helps you pinpoint the remaining days of work required to achieve your financial dreams, offering intuitive insights to fuel your success journey.",
      name: "David Brown",
      title: "Sales Manager",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/cld-sample.jpg",
      rating: 4,
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      // Adjust max index based on screen size
      const maxIndex = window.innerWidth < 640 ? reviews.length - 1 : window.innerWidth < 1024 ? reviews.length - 2 : reviews.length - 4
      return prevIndex >= maxIndex ? 0 : prevIndex + 1
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      // Adjust max index based on screen size
      const maxIndex = window.innerWidth < 640 ? reviews.length - 1 : window.innerWidth < 1024 ? reviews.length - 2 : reviews.length - 4
      return prevIndex === 0 ? maxIndex : prevIndex - 1
    })
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-lg sm:text-xl lg:text-2xl ${index < rating ? "text-yellow-400" : "text-gray-300"}`}>
        ★
      </span>
    ))
  }

  return (
    <div id="reviews" className="bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Our Users Reviews
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Have a look what our clients opinion
          </p>
        </div>

        {/* Reviews Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-[500ms] ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (window.innerWidth < 640 ? 100 : window.innerWidth < 1024 ? 50 : 25)}%)`,
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-2 sm:px-3"
              >
                <div className="bg-white rounded-lg p-4 sm:p-5 lg:p-6 shadow-lg border border-gray-200 h-72 sm:h-76 lg:h-80 flex flex-col justify-between">
                  {/* Stars */}
                  <div className="flex justify-center">{renderStars(review.rating)}</div>

                  {/* Review Text */}
                  <div className="flex-grow pt-4 sm:pt-6 lg:pt-8">
                    <p className="text-gray-600 text-start leading-relaxed text-xs sm:text-sm lg:text-[15px] font-medium">
                      {review.text}
                    </p>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center justify-start gap-2 sm:gap-3 mt-3 sm:mt-4">
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-[14px] lg:text-[15px]">
                        {review.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs lg:text-xs text-gray-500">
                        {review.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={prevSlide}
              className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gray-700 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
              aria-label="Previous review"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gray-700 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
              aria-label="Next review"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider
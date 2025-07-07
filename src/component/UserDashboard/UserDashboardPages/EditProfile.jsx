
import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { IoArrowBack } from "react-icons/io5"
import { useUpdateProfileMutation, useGetProfileQuery } from '../../../Redux/feature/ApiSlice'

function EditProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phonePersonal: "",
    describeYourself: "",
    profession: "",
    education: "",
    gender: "",
    age: "",
    language: "",
    picture: null,
    houseNo: "",
    roadNo: "",
    townCity: "",
    postalCode: "",
    country: "",
    phoneHome: "",
    // Company Profile fields
    companyName: "",
    companyLocation: "",
    companyWebsite: "",
    companyEmail: "",
    annualIncome: "",
    companyContactNumber: "",
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [manualProfileData, setManualProfileData] = useState(null)
  const navigate = useNavigate()
  const [updateProfile, { isLoading, isSuccess, isError, error }] = useUpdateProfileMutation()
  const { data: profileData, isLoading: isLoadingProfile, error: profileError } = useGetProfileQuery()

  // Manual fetch as fallback
  const fetchProfileManually = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      console.log('❌ No token available for manual fetch')
      return
    }

    try {
      console.log('🔄 Attempting manual profile fetch...')
      const response = await fetch('https://multiply-mint-ghost.ngrok-free.app/accounts/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log('✅ Manual fetch successful:', data)
        setManualProfileData(data)
      } else {
        console.log('❌ Manual fetch failed:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('❌ Manual fetch error:', error)
    }
  }

  // Try manual fetch if RTK Query fails
  useEffect(() => {
    if (profileError) {
      console.log('🔄 RTK Query failed, trying manual fetch...')
      fetchProfileManually()
    }
  }, [profileError])

  // Also try manual fetch on component mount if no data after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!profileData && !isLoadingProfile && !manualProfileData) {
        console.log('🔄 No data after 2 seconds, trying manual fetch...')
        fetchProfileManually()
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [profileData, isLoadingProfile, manualProfileData])

  // Function to populate form data
  const populateFormData = (data) => {
    if (!data) return

    console.log('📋 Populating form with data:', data)
    const newFormData = {
      firstName: data.first_name || "",
      lastName: data.last_name || "",
      phonePersonal: data.phone || "",
      describeYourself: "",
      profession: data.designation || "",
      education: "",
      gender: data.gender || "",
      age: data.age ? data.age.toString() : "",
      language: "",
      picture: null,
      houseNo: data.address?.house_number || "",
      roadNo: data.address?.road_number || "",
      townCity: data.address?.area || "",
      postalCode: data.address?.postal_code || "",
      country: data.address?.country || "",
      phoneHome: "",
      // Company Profile fields
      companyName: data.company_profile?.name || "",
      companyLocation: data.company_profile?.location || "",
      companyWebsite: data.company_profile?.website || "",
      companyEmail: data.company_profile?.email || "",
      annualIncome: data.company_profile?.annual_income || "",
      companyContactNumber: data.company_profile?.contact_number || "",
    }

    console.log('📝 Setting form data to:', newFormData)
    setFormData(newFormData)

    // Set image preview if profile image exists
    if (data.profile_image) {
      setImagePreview(data.profile_image)
    }
  }

  // Populate form when RTK Query data is available
  useEffect(() => {
    if (profileData) {
      console.log('📋 Using RTK Query data')
      populateFormData(profileData)
    }
  }, [profileData])

  // Populate form when manual fetch data is available
  useEffect(() => {
    if (manualProfileData && !profileData) {
      console.log('📋 Using Manual Fetch data')
      populateFormData(manualProfileData)
    }
  }, [manualProfileData, profileData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, picture: file })

      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }




  const handleSubmit = async (e) => {
    e.preventDefault()

    // Use FormData for file uploads
    const formDataToSend = new FormData()

    // Add basic fields
    if (formData.firstName) formDataToSend.append('first_name', formData.firstName)
    if (formData.lastName) formDataToSend.append('last_name', formData.lastName)

    // Add optional fields only if they have values
    if (formData.phonePersonal) formDataToSend.append('phone', formData.phonePersonal)
    if (formData.profession) formDataToSend.append('designation', formData.profession)
    if (formData.age) formDataToSend.append('age', parseInt(formData.age))
    if (formData.gender) {
      
      const validGenders = ['Male', 'Female', 'Other']
      const normalizedGender = formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1).toLowerCase()
      if (validGenders.includes(normalizedGender)) {
        formDataToSend.append('gender', normalizedGender)
      } else {
        console.warn('Invalid gender value:', formData.gender, 'Using Male as default')
        formDataToSend.append('gender', 'Male')
      }
    }

    
    if (formData.picture) {
      console.log('📸 Adding image file to FormData:', formData.picture.name)
      formDataToSend.append('profile_image', formData.picture)
    }

    if (formData.houseNo) formDataToSend.append('address.house_number', formData.houseNo)
    if (formData.roadNo) formDataToSend.append('address.road_number', formData.roadNo)
    if (formData.townCity) {
      formDataToSend.append('address.area', formData.townCity)
      formDataToSend.append('address.city_or_state', formData.townCity)
    }
    if (formData.country) formDataToSend.append('address.country', formData.country)
    if (formData.postalCode) formDataToSend.append('address.postal_code', formData.postalCode)

    // Add company profile fields to FormData
    if (formData.companyName) formDataToSend.append('company_profile.name', formData.companyName.trim())
    if (formData.companyLocation) formDataToSend.append('company_profile.location', formData.companyLocation.trim())
    if (formData.companyWebsite) formDataToSend.append('company_profile.website', formData.companyWebsite.trim())
    if (formData.companyEmail) formDataToSend.append('company_profile.email', formData.companyEmail.trim())
    if (formData.annualIncome) formDataToSend.append('company_profile.annual_income', formData.annualIncome.trim())
    if (formData.companyContactNumber) formDataToSend.append('company_profile.contact_number', formData.companyContactNumber.trim())

    console.log('📝 Sending FormData with fields:')
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value)
    }

    try {
      await updateProfile(formDataToSend).unwrap()

      // Navigate back to profile page to see updated data
      navigate('/dashboard/profile')
    } catch (error) {
      console.error('❌ Full error object:', error)
      console.error('❌ Error data:', error.data)

      if (error.status === 401) {
        alert('Authentication failed. Please log in again.')
      } else if (error.status === 400) {
        alert(`Bad request: ${error.data?.detail || JSON.stringify(error.data) || 'Please check your data and try again.'}`)
      } else {
        alert('Failed to update profile. Please try again.')
      }
    }
  }
 

  // Show loading while fetching profile data
  if (isLoadingProfile) {
    return (
      <div className="p-3 sm:p-4 lg:p-4 font-semibold">
        <div className="text-center py-8">
          <p>Loading profile data...</p>
        </div>
      </div>
    )
  }

  // If profile fetch failed, show form anyway (for new profiles)
  if (profileError && profileError.status !== 404) {
    console.log('⚠️ Profile fetch error (non-404):', profileError)
  }

  return (
    <div className="p-3 sm:p-4 lg:p-4 font-semibold">
      <div className="mb-3 sm:mb-4 lg:mb-5">
        <NavLink
          to="/dashboard/profile"
          className="inline-flex items-center px-2 sm:px-3 lg:px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm sm:text-base lg:text-base"
        >
          <IoArrowBack className="h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5 mr-1 sm:mr-2 lg:mr-2 text-gray-700" />
          Back
        </NavLink>
      </div>

      <h1 className="text-xl sm:text-2xl lg:text-3xl pb-3 sm:pb-4 lg:pb-5">
        Welcome, <span className="font-normal">Edit Profile Details</span>
      </h1>




      {/* Personal Information Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mb-4">
          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">
              Phone number (personal)
            </label>
            <input
              type="tel"
              name="phonePersonal"
              value={formData.phonePersonal}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">
              Describe yourself in short
            </label>
            <input
              type="text"
              name="describeYourself"
              value={formData.describeYourself}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Profession</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>

          {/*  and Age - Side by side on larger screens */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-3">
              <div>
                <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter here"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Language</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">
              Upload picture
            </label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-1 h-[42px] border border-gray-200 rounded-sm bg-white">
                <label className="inline-block px-2 sm:px-3 lg:px-4 py-1 bg-gray-100 border rounded cursor-pointer text-xs sm:text-sm lg:text-sm">
                  Choose file
                  <input
                    type="file"
                    name="picture"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="text-gray-500 text-xs sm:text-sm lg:text-sm truncate">
                  {formData.picture ? formData.picture.name : "No file selected"}
                </span>
              </div>
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded border"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

      {/* Address Section */}
      <div className="mt-6 sm:mt-7 lg:mt-8 mb-3 sm:mb-4 lg:mb-5">
        <h3 className="text-lg sm:text-xl lg:text-[24px] font-semibold text-gray-700 mb-3 sm:mb-4 lg:mb-4">Address</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-4">
          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">House No.</label>
            <input
              type="text"
              name="houseNo"
              value={formData.houseNo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Road No</label>
            <input
              type="text"
              name="roadNo"
              value={formData.roadNo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Town/city</label>
            <input
              type="text"
              name="townCity"
              value={formData.townCity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">
              Postal code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">
              Phone number (Home)
            </label>
            <input
              type="tel"
              name="phoneHome"
              value={formData.phoneHome}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter here"
            />
          </div>
        </div>
      </div>

      
      <div className="mb-6 sm:mb-8 lg:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-gray-800">Company Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mb-4">
          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Company Location</label>
            <input
              type="text"
              name="companyLocation"
              value={formData.companyLocation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company location"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Company Website</label>
            <input
              type="url"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Company Email</label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="company@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Annual Income</label>
            <input
              type="text"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter annual income"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm sm:text-base lg:text-base mb-1">Company Contact Number</label>
            <input
              type="tel"
              name="companyContactNumber"
              value={formData.companyContactNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-100 rounded bg-white text-sm sm:text-base lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company phone"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 sm:mt-8 lg:mt-8">
        <button 
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full sm:w-auto lg:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 sm:px-8 lg:px-8 rounded-md transition-colors text-sm sm:text-base lg:text-base"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
        {isSuccess && <p className="text-green-600 mt-2">Profile updated successfully!</p>}
        {isError && <p className="text-red-600 mt-2">Failed to update profile: {error?.data?.message || error?.message || 'Unknown error'}</p>}
      </div>
    </div>
  )
}

export default EditProfile

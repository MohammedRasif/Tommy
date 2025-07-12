import { FaEdit } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import google  from '../../../image/google.png';
import { useGoogleConnectMutation } from '../../../Redux/feature/ApiSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Profile() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [googleConnect, { isLoading: isConnecting }] = useGoogleConnectMutation();

    // Simple fetch function that actually works
    const fetchProfileData = async () => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            setError({ message: 'No authentication token found. Please log in again.' });
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);



            const response = await fetch('https://multiply-mint-ghost.ngrok-free.app/accounts/profile/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                   "ngrok-skip-browser-warning":"true"
                },
                
            
            });



            if (response.ok) {
                // First get the response as text to check if it's HTML
                const responseText = await response.text();

                // Check if response is HTML (ngrok warning page)
                if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
                    setError({
                        message: 'Please refresh the page or try again.',
                        status: 200,
                        type: 'NGROK_WARNING'
                    });
                    return;
                }

                // Try to parse as JSON
                try {
                    const data = JSON.parse(responseText);
                    console.log('✅ Profile data received:', data);
                    console.log('🏢 Company profile data:', data.company_profile);
                    setUserData(data);
                } catch {
                    setError({
                        message: 'Unable to load profile data.',
                        status: 200,
                        type: 'PARSE_ERROR'
                    });
                }
            } else if (response.status === 404) {
                console.log('📭 Profile not found (404)');
                setError({
                    message: 'No profile found. Create your profile by clicking Edit Profile.',
                    status: 404
                });
            } else if (response.status === 401) {
                console.log('🔐 Authentication failed (401)');
                setError({
                    message: 'Authentication failed. Please log in again.',
                    status: 401
                });
            } else {
                const errorData = await response.text();
                console.log('❌ HTTP Error:', response.status, errorData);
                setError({
                    message: `Failed to load profile (${response.status})`,
                    status: response.status,
                    details: errorData
                });
            }
        } catch (err) {
            console.error('❌ Network/Fetch error:', err);
            console.error('❌ Error type:', err.name);
            console.error('❌ Error message:', err.message);

            // More specific error handling
            if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
                setError({
                    message: 'Cannot connect to server. This might be a CORS issue or the server is down.',
                    details: `${err.name}: ${err.message}`,
                    type: 'NETWORK_ERROR'
                });
            } else {
                setError({
                    message: 'Network error. Please check your connection.',
                    details: `${err.name}: ${err.message}`,
                    type: 'UNKNOWN_ERROR'
                });
            }
        } finally {
            setIsLoading(false);
        }
    };



    // Load profile data when component mounts
    useEffect(() => {
        fetchProfileData();

        // Check for OAuth callback parameters
        const urlParams = new URLSearchParams(window.location.search);
        const oauthStatus = urlParams.get('oauth');

        if (oauthStatus === 'success') {
            toast.success('Google account connected successfully!');
            // Clean up URL parameters
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if (oauthStatus === 'cancelled') {
            toast.info('Google connection was cancelled.');
            // Clean up URL parameters
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    // Handle Google Connect
    const handleGoogleConnect = async () => {
        try {
            console.log("Initiating Google OAuth connection...");

            
            const currentUrl = window.location.origin;
            const successUrl = `${currentUrl}/oauth-callback?status=success`;
            const cancelUrl = `${currentUrl}/oauth-callback?status=cancelled`;

            const response = await googleConnect({
                success_url: successUrl,
                cancel_url: cancelUrl,
                frontend_success_uri: successUrl,
                frontend_cancel_url: cancelUrl
            }).unwrap();

            console.log("Google Connect API response:", response);
            console.log("Response keys:", Object.keys(response));

            // Check for different possible response formats
            let redirectUrl = null;

            if (response.link) {
                redirectUrl = response.link;
                console.log("Found link:", redirectUrl);
            } else if (response.authorization_url) {
                redirectUrl = response.authorization_url;
                console.log("Found authorization_url:", redirectUrl);
            } else if (response.redirect_url) {
                redirectUrl = response.redirect_url;
                console.log("Found redirect_url:", redirectUrl);
            } else if (response.url) {
                redirectUrl = response.url;
                console.log("Found url:", redirectUrl);
            } else if (response.auth_url) {
                redirectUrl = response.auth_url;
                console.log("Found auth_url:", redirectUrl);
            } else {
                console.log("No redirect URL found in response:", response);
            }

            if (redirectUrl) {
                try {
                    // Debug: Log the full URL to check parameters
                    console.log("Full OAuth URL:", redirectUrl);
                    const urlObj = new URL(redirectUrl);
                    console.log("URL parameters:", urlObj.searchParams.toString());

                    toast.success("Redirecting to Google for authentication...");

                    // Try different redirect methods
                    console.log("Attempting redirect to:", redirectUrl);

                    // Method 1: Direct assignment
                    window.location.href = redirectUrl;

                    // Fallback method if the above doesn't work
                    setTimeout(() => {
                        console.log("Fallback redirect attempt");
                        window.open(redirectUrl, '_self');
                    }, 1000);

                } catch (error) {
                    console.error("Error processing redirect URL:", error);
                    toast.error("Invalid redirect URL received");
                }
            } else {
                console.log("No redirect URL found, showing success message");
                toast.success(response.message || "Google connection initiated successfully!");
            }

            
        } catch (error) {
            console.error("Google Connect error:", error);
            const errorMessage =
                error?.data?.message ||
                error?.message ||
                "Failed to connect to Google. Please try again.";
            toast.error(errorMessage);
        }
    };



    // Show loading state but still show edit button
    if (isLoading) {
        return (
            <div className="mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Profile Details</h2>
                    <NavLink to="/dashboard/edit_profile">
                        <button className="hover:underline border rounded-sm px-4 sm:px-2 py-1 flex items-center cursor-pointer">
                            <FaEdit className="mr-2" /> Edit Profile
                        </button>
                    </NavLink>
                </div>
                <div className="text-center py-8">Loading profile data...</div>
            </div>
        );
    }

    // Show error but still allow editing
    if (error) {
        const isProfileNotFound = error.status === 404;
        const isNgrokWarning = error.type === 'NGROK_WARNING';

        let bgColor, title, message;

        if (isProfileNotFound) {
            bgColor = "bg-blue-100 border-blue-400 text-blue-700";
            title = "No Profile Found";
            message = "You haven't created a profile yet. Click 'Edit Profile' above to create one!";
        } else if (isNgrokWarning) {
            bgColor = "bg-yellow-100 border-yellow-400 text-yellow-700";
            title = "ngrok Warning Page Detected";
            message = "The server is returning the ngrok warning page instead of your data.";
        } else {
            bgColor = "bg-red-100 border-red-400 text-red-700";
            title = "Error Loading Profile";
            message = error.message;
        }

        return (
            <div className="mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Profile Details</h2>
                    <NavLink to="/dashboard/edit_profile">
                        <button className="hover:underline border rounded-sm px-4 sm:px-2 py-1 flex items-center cursor-pointer">
                            <FaEdit className="mr-2" /> Edit Profile
                        </button>
                    </NavLink>
                </div>
                <div className={`${bgColor} px-4 py-3 rounded mb-4`}>
                    <p className="font-bold">{title}</p>
                    <p className="text-sm">{message}</p>

                    <div className="mt-3">
                        <NavLink to="/dashboard/edit_profile">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                {isProfileNotFound ? 'Create Profile' : 'Edit Profile'}
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }

    // Show no data but still allow editing
    if (!userData) {
        return (
            <div className="mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Profile Details</h2>
                    <NavLink to="/dashboard/edit_profile">
                        <button className="hover:underline border rounded-sm px-4 sm:px-2 py-1 flex items-center cursor-pointer">
                            <FaEdit className="mr-2" /> Edit Profile
                        </button>
                    </NavLink>
                </div>
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
                    <p className="font-bold">No profile data available</p>
                    <p className="text-sm">Click Edit Profile above to create your profile.</p>
                </div>
            </div>
        );
    }

    const personalInfo = [
        { label: "First Name", value: userData.first_name || "N/A" },
        { label: "Last Name", value: userData.last_name || "N/A" },
        { label: "Age", value: userData.age || "N/A" },
        { label: "Gender", value: userData.gender || "N/A" },
        { label: "Phone", value: userData.phone || "N/A" },
        { label: "Designation", value: userData.designation || "N/A" }
    ];

    const address = [
        { label: "House No.", value: userData.address?.house_number || "N/A" },
        { label: "Road No.", value: userData.address?.road_number || "N/A" },
        { label: "Area", value: userData.address?.area || "N/A" },
        { label: "City/State", value: userData.address?.city_or_state || "N/A" },
        { label: "Country", value: userData.address?.country || "N/A" },
        { label: "Post Code", value: userData.address?.postal_code || "N/A" }
    ];

    return (
        <div className="mx-auto p-4">
            {/* Header Section */}
            <div className="flex  items-center justify-center py-2 space-y-2 sm:space-y-0 mb-2">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Profile Details</h2>
                <div className="flex items-center justify-between sm:justify-end space-x-2 bg-white ml-2">
                    <NavLink to="/dashboard/edit_profile">
                        <button className=" hover:underline border  rounded-sm px-4 sm:px-2 py-1 flex items-center cursor-pointer">
                            <FaEdit className="mr-2" /> Edit Profile
                        </button>
                    </NavLink>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start mb-6 bg-white p-4 sm:p-5 rounded-md">
             
                <div className="w-full sm:w-1/4 flex flex-col items-center sm:items-start mb-4 sm:mb-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-full overflow-hidden mb-2  ">
                        <img
                            src={userData.profile_image || "https://res.cloudinary.com/dpi0t9wfn/image/upload/v1741443124/samples/smile.jpg"}
                            className="w-full h-full object-cover"
                            alt="Company profile"
                        />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-500">Company Information</h3>
                </div>

                <div className="w-full sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-4 pl-0 sm:pl-6">
                    <div>
                        <p className="text-sm text-gray-500">Company Name</p>
                        <p className="text-base text-gray-800">{userData.company_profile?.name || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <p className="text-base text-gray-800">{userData.company_profile?.website || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-base text-gray-800">{userData.company_profile?.location || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-base text-gray-800">{userData.company_profile?.email || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Annual Income</p>
                        <p className="text-base text-gray-800">{userData.company_profile?.annual_income || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Contact number</p>
                        <p className="text-base text-gray-800">{userData.company_profile?.contact_number || "N/A"}</p>
                    </div>
                </div>
            </div>

            {/* Personal Information Section */}
            <div className="mb-6 bg-white p-4 sm:p-5 rounded-md">
                <h3 className="text-xl sm:text-[24px] font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {personalInfo.map((item, index) => (
                        <div key={index}>
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <p className="text-md font-medium text-gray-800">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Address Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  {/* Address Card */}
  <div className="bg-white p-4 sm:p-5 rounded-md shadow-sm col-span-2">
    <h3 className="text-xl sm:text-[24px] font-semibold text-gray-800 mb-4">Address</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {address.map((item, index) => (
        <div key={index} className="flex flex-col">
          <p className="text-sm text-gray-500">{item.label}</p>
          <p className="text-md font-medium text-gray-800">{item.value}</p>
        </div>
      ))}
    </div>
  </div>

  {/* OAuth Mail Connect Card */}
  <div className="bg-white p-4 sm:p-5 rounded-md shadow-sm">
    <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-4">OAuth mail connect</h3>
    <div className="space-y-3">
      {/* Google Connect */}
      <div className="flex items-center justify-between border border-gray-200 rounded-full px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-1.5 rounded-full">
            <img src={google} alt="Google" className="w-4 h-4" />
          </div>
          <p className="text-sm font-medium text-gray-700">Google</p>
        </div>
        <button
          onClick={handleGoogleConnect}
          disabled={isConnecting}
          className="text-sm text-indigo-600 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? 'Connecting...' : 'Connect'}
        </button>
      </div>

      {/* Microsoft Connect */}
      <div className="flex items-center justify-between border border-gray-200 rounded-full px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 p-1.5 rounded-full">
            <img src="/microsoft" alt="Microsoft" className="w-4 h-4" />
          </div>
          <p className="text-sm font-medium text-gray-700">Microsoft</p>
        </div>
        <a href="#" className="text-sm text-indigo-600 font-semibold hover:underline">
          Connect
        </a>
      </div>
    </div>
  </div>
</div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
        </div>
    );
}

export default Profile;

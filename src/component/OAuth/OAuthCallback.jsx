"use client";

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        console.log('🔄 Processing OAuth callback...');
        
        // Get all URL parameters
        const state = searchParams.get('state');
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        const status = searchParams.get('status'); // For direct status from our app

        console.log('OAuth callback parameters:', {
          state,
          code: code ? 'present' : 'missing',
          error,
          errorDescription,
          status
        });

        // Handle direct status parameters (when redirected from our backend)
        if (status) {
          console.log('📋 OAuth status received:', status);

          // Check if status contains token data (successful OAuth)
          if (status.includes('access_token') || status.includes('success')) {
            console.log('✅ OAuth success - tokens received in status');
            setStatus('success');
            toast.success('Google account connected successfully!');

            setTimeout(() => {
              navigate('/dashboard/profile?oauth=success');
            }, 2000);
            return;
          }

          // Check for simple success status
          if (status === 'success') {
            console.log('✅ OAuth simple success status received');
            setStatus('success');
            toast.success('Google account connected successfully!');

            setTimeout(() => {
              navigate('/dashboard/profile?oauth=success');
            }, 200000);
            return;
          }

          // Handle error/cancelled status
          if (status === 'cancelled' || status === 'error') {
            console.log('❌ OAuth cancelled/error status received');
            setStatus('error');
            toast.error('Google connection was cancelled or failed');

            setTimeout(() => {
              navigate('/dashboard/profile?oauth=cancelled');
            }, 300000);
            return;
          }
        }

        // Check for OAuth errors
        if (error) {
          console.error('❌ OAuth error:', error, errorDescription);
          setStatus('error');
          toast.error(`OAuth error: ${errorDescription || error}`);
          
          // Redirect to profile with error status after delay
          setTimeout(() => {
            navigate('/dashboard/profile?oauth=error');
          }, 300000);
          return;
        }

        // Check if we have the required parameters
        if (!state && !code) {
          console.error('❌ Missing OAuth parameters');
          setStatus('error');
          toast.error('Invalid OAuth callback - missing parameters');
          
          setTimeout(() => {
            navigate('/dashboard/profile?oauth=error');
          }, 300000);
          return;
        }

        // If we have a state parameter, decode it to get user info
        if (state) {
          try {
            // Decode the JWT state parameter
            const payload = JSON.parse(atob(state.split('.')[1]));
            console.log('📋 Decoded state payload:', payload);
            
            // Check if the state is valid and not expired
            const currentTime = Math.floor(Date.now() / 1000);
            if (payload.exp && payload.exp < currentTime) {
              console.error('❌ OAuth state expired');
              setStatus('error');
              toast.error('OAuth session expired. Please try again.');
              
              setTimeout(() => {
                navigate('/dashboard/profile?oauth=expired');
              }, 300000);
              return;
            }
          } catch (decodeError) {
            console.error('❌ Failed to decode state parameter:', decodeError);
          }
        }

        // Check if we have the required parameters for a successful OAuth flow
        if (code && state) {
          console.log('✅ OAuth callback successful - code and state present');
          setStatus('success');
          toast.success('Google account connected successfully!');

          // Redirect to profile with success status
          setTimeout(() => {
            navigate('/dashboard/profile?oauth=success');
          }, 2000);
          return;
        }

        // If we don't have the expected parameters, treat as error
        console.error('❌ Missing required OAuth parameters');
        setStatus('error');
        toast.error('OAuth callback incomplete - missing required parameters');

        setTimeout(() => {
          navigate('/dashboard/profile?oauth=error');
        }, 3000);

      } catch (error) {
        console.error('❌ OAuth callback processing error:', error);
        setStatus('error');
        toast.error('Failed to process OAuth callback');
        
        setTimeout(() => {
          navigate('/dashboard/profile?oauth=error');
        }, 3000);
      } finally {
        setIsProcessing(false);
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing OAuth Callback</h2>
            <p className="text-gray-600">Please wait while we connect your Google account...</p>
          </>
        ) : status === 'success' ? (
          <>
            <div className="rounded-full h-12 w-12 bg-green-100 mx-auto mb-4 flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-900 mb-2">Success!</h2>
            <p className="text-gray-600">Your Google account has been connected successfully. Redirecting...</p>
          </>
        ) : (
          <>
            <div className="rounded-full h-12 w-12 bg-red-100 mx-auto mb-4 flex items-center justify-center">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-900 mb-2">Connection Failed</h2>
            <p className="text-gray-600">There was an error connecting your Google account. Redirecting...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;

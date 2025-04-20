'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLoader } from '@/context/LoaderContext'
import { toast } from 'react-hot-toast'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { FaGoogle, FaSpinner } from 'react-icons/fa'

export default function AuthCallbackPage() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const { showLoader, hideLoader } = useLoader()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        showLoader()
        
        // Get the session from the URL hash
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        
        if (session) {
          toast.success('Successfully authenticated with Google')
          router.push('/test') // Redirect to your app's main page after login
        } else {
          toast.error('Authentication failed')
          router.push('/login')
        }
      } catch (error: any) {
        console.error('Auth callback error:', error)
        toast.error(error.message || 'Authentication failed')
        router.push('/login')
      } finally {
        hideLoader()
      }
    }

    handleAuthCallback()
  }, [router, showLoader, hideLoader, supabase])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-xl p-8">
        <div className="flex flex-col items-center justify-center">
          {/* Google Icon Container */}
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
            <FaGoogle className="text-2xl text-yellow-600" />
          </div>

          {/* Title and Description */}
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
            Authenticating
          </h2>
          <p className="text-center text-sm text-gray-600 mb-8">
            Please wait while we complete your Google sign-in...
          </p>

          {/* Loading Indicators */}
          <div className="w-full space-y-6">
            {/* Spinner */}
            <div className="flex justify-center">
              <FaSpinner className="animate-spin text-4xl text-yellow-600" />
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="h-1 rounded-full bg-yellow-600 transition-all duration-1000"
                style={{
                  width: '100%',
                  animation: 'pulse 1.5s infinite'
                }}
              />
            </div>

            {/* Loading Steps */}
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-yellow-600 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-yellow-600 animate-bounce delay-100" />
              <div className="w-2 h-2 rounded-full bg-yellow-600 animate-bounce delay-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useLoader } from '@/context/LoaderContext'

// List of routes that require authentication
const PROTECTED_ROUTES = ['/test', '/dashboard', '/profile']

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { showLoader, hideLoader } = useLoader()

  useEffect(() => {
    if (loading) {
      showLoader()
    } else {
      hideLoader()
      // Only redirect to login if the current route requires authentication
      if (!user && PROTECTED_ROUTES.includes(pathname)) {
        router.push('/')
      }
    }
  }, [user, loading, router, pathname, showLoader, hideLoader])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-600"></div>
      </div>
    )
  }

  // If it's a protected route and user is not authenticated, return null
  if (PROTECTED_ROUTES.includes(pathname) && !user) {
    return null
  }

  // Allow rendering for non-protected routes or authenticated users
  return <>{children}</>
}


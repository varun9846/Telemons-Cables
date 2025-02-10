'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useLoader } from '@/context/LoaderContext'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { showLoader, hideLoader } = useLoader()

  useEffect(() => {
    if (loading) {
      showLoader()
    } else {
      hideLoader()
      if (!user) {
        router.push('/login')
      }
    }
  }, [user, loading, router])

  if (loading || !user) {
    return null
  }

  return <>{children}</>
}

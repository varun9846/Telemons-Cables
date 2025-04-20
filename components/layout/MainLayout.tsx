'use client'
import React from 'react'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { useLoader } from '@/context/LoaderContext'
import { useAuth } from '@/context/AuthContext'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/utils/constants'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { loading } = useAuth()
  const { showLoader, hideLoader } = useLoader()
  const pathname = usePathname()

  // Don't show navbar on auth pages
  const isAuthPage = [ROUTES.LOGIN, ROUTES.SIGNUP].includes(pathname)

  React.useEffect(() => {
    if (loading) {
      showLoader()
    } else {
      hideLoader()
    }
  }, [loading, showLoader, hideLoader])

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  )
}

'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaSearch, FaUser, FaBars } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { useLoader } from '@/context/LoaderContext'
import { useAuth } from '@/context/AuthContext'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import LogoutButton from '../auth/LogoutButton'

export const Navbar = () => {
  const router = useRouter()
  const { user } = useAuth()
  const supabase = useSupabaseClient()
  const isAuthenticated = !!user
  const { showLoader, hideLoader } = useLoader()
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      showLoader()
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Logged out successfully')
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      hideLoader()
    }
  }

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src="/telemons.jpg" alt="Telemons Cable" className="h-8 w-auto" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-yellow-600 focus:outline-none"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-600 hover:text-yellow-600 font-medium transition-colors">
              Products
            </Link>
            <Link href="/markets" className="text-gray-600 hover:text-yellow-600 font-medium transition-colors">
              Markets
            </Link>
            <Link href="/solutions" className="text-gray-600 hover:text-yellow-600 font-medium transition-colors">
              Solutions
            </Link>
            <Link href="/resources" className="text-gray-600 hover:text-yellow-600 font-medium transition-colors">
              Resources
            </Link>
          </div>

          {/* Search and Auth */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <LogoutButton />
              ) : (
                <div className="flex space-x-3">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 text-sm font-medium text-yellow-600 border border-yellow-600 rounded-md hover:bg-yellow-50 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} pb-4`}>
          <div className="flex flex-col space-y-3">
            <Link href="/products" className="text-gray-600 hover:text-yellow-600 py-2">Products</Link>
            <Link href="/markets" className="text-gray-600 hover:text-yellow-600 py-2">Markets</Link>
            <Link href="/solutions" className="text-gray-600 hover:text-yellow-600 py-2">Solutions</Link>
            <Link href="/resources" className="text-gray-600 hover:text-yellow-600 py-2">Resources</Link>
            
            {/* Mobile Search */}
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Mobile Auth Buttons */}
            {!isAuthenticated && (
              <div className="flex flex-col space-y-2 mt-2">
                <Link
                  href="/login"
                  className="w-full text-center px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="w-full text-center px-4 py-2 text-sm font-medium text-yellow-600 border border-yellow-600 rounded-md hover:bg-yellow-50"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

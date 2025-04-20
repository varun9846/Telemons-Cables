'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { FaSearch, FaUser } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { useLoader } from '@/context/LoaderContext'
import { useAuth } from '@/context/AuthContext'
import LogoutButton from '../auth/LogoutButton'
export const Navbar = () => {
  const router = useRouter()
  const { user } = useAuth()
  const isAuthenticated = !!user
  const { showLoader, hideLoader } = useLoader()
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = async () => {
    try {
      showLoader()
      await supabase.auth.signOut()
      toast.success('Logged out successfully')
      router.push('/')
    } catch (error) {
      toast.error('Error logging out')
    } finally {
      hideLoader()
    }
  }

  return (
    <div className="bg-white shadow-md">
      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <img src="/telemons.jpg" alt="Telemons Cable" className="w-30 h-10 mr-10" />
          {/* <Link href="/" className="text-2xl font-bold">
            Telemons Cable
          </Link> */}

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="hover:text-yellow-500">Products</Link>
            <Link href="/markets" className="hover:text-yellow-500">Markets</Link>
            <Link href="/solutions" className="hover:text-yellow-500">Solutions</Link>
            <Link href="/resources" className="hover:text-yellow-500">Resources</Link>
          </nav>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:border-yellow-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div>
                <LogoutButton />
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <Link href="/login" className="hover:text-yellow-500">Login</Link>
                  <Link href="/signup" className="hover:text-yellow-500">Sign Up</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

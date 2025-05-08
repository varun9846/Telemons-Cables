'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaSearch, FaUser, FaBars, FaChevronDown } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { useLoader } from '@/context/LoaderContext'
import { useAuth } from '@/context/AuthContext'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import LogoutButton from '../auth/LogoutButton'

// Product menu interface
interface ProductMenuItem {
  name: string;
  href: string;
  subItems?: ProductSubMenuItem[];
}

interface ProductSubMenuItem {
  name: string;
  href: string;
}

// Product menu data
const productMenuItems: ProductMenuItem[] = [
  { 
    name: 'Copper Systems', 
    href: '/products',
    subItems: [
      { name: 'Enterprise Data Center Copper Cable', href: '/products/data-center-copper-cable' }
    ]
  },
  {
    name: 'Connectors,Products & Enterprises',
    href: '/products/products-enterprises',
  }
  // { 
  //   name: 'Fiber Optic Systems', 
  //   href: '/products#fiber-optic-systems',
  //   subItems: [
  //     { name: 'Fiber Cables', href: '/products#fiber-cables' },
  //     { name: 'Fiber Connectors', href: '/products#fiber-connectors' },
  //     { name: 'Fiber Management', href: '/products#fiber-management' },
  //   ]
  // },
  // { 
  //   name: 'Grounding & Bonding', 
  //   href: '/products#grounding-bonding',
  //   subItems: [
  //     { name: 'Grounding Cables', href: '/products#grounding-cables' },
  //     { name: 'Bonding Components', href: '/products#bonding-components' },
  //     { name: 'Earthing Solutions', href: '/products#earthing-solutions' },
  //   ]
  // },
];

export const Navbar = () => {
  const router = useRouter()
  const { user } = useAuth()
  const supabase = useSupabaseClient()
  const isAuthenticated = !!user
  const { showLoader, hideLoader } = useLoader()
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // State for dropdown menus
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)
  
  // Refs for handling hover behavior
  const productsMenuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle mouse events for dropdown
  const handleProductsMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsProductsOpen(true)
  }

  const handleProductsMouseLeave = () => {
    // Add a small delay before closing the menu to allow movement to submenu
    timeoutRef.current = setTimeout(() => {
      if (!activeSubMenu) {
        setIsProductsOpen(false)
      }
    }, 100)
  }

  // Handle category hover
  const handleCategoryMouseEnter = (categoryName: string) => {
    setActiveSubMenu(categoryName)
  }

  const handleCategoryMouseLeave = () => {
    setActiveSubMenu(null)
  }

  // Handle menu close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (productsMenuRef.current && !productsMenuRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false)
        setActiveSubMenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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

  // Navigate to product category
  const navigateToCategory = (href: string) => {
    router.push(href)
    setIsProductsOpen(false)
    setActiveSubMenu(null)
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
            {/* Products Dropdown */}
            <div 
              ref={productsMenuRef}
              className="relative"
              onMouseEnter={handleProductsMouseEnter}
              onMouseLeave={handleProductsMouseLeave}
            >
              <button className="flex items-center text-gray-600 hover:text-yellow-600 font-medium transition-colors">
                Products
                <FaChevronDown className={`ml-1 h-3 w-3 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Main Dropdown Menu */}
              {isProductsOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 py-2">
                  {productMenuItems.map((item) => (
                    <div 
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => handleCategoryMouseEnter(item.name)}
                      onMouseLeave={handleCategoryMouseLeave}
                    >
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 flex justify-between items-center"
                        onClick={() => navigateToCategory(item.href)}
                      >
                        {item.name}
                        {item.subItems && <FaChevronDown className="h-3 w-3" />}
                      </button>
                      
                      {/* Submenu */}
                      {activeSubMenu === item.name && item.subItems && (
                        <div className="absolute left-full top-0 w-64 bg-white rounded-md shadow-lg z-50 py-2">
                          {item.subItems.map((subItem) => (
                            <button
                              key={subItem.name}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
                              onClick={() => navigateToCategory(subItem.href)}
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

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

        {/* Mobile Navigation Menu with Products Dropdown */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} pb-4`}>
          <div className="flex flex-col space-y-3">
            {/* Mobile Products Dropdown */}
            <div className="py-2">
              <button 
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center justify-between w-full text-gray-600 hover:text-yellow-600"
              >
                <span>Products</span>
                <FaChevronDown className={`h-3 w-3 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isProductsOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {productMenuItems.map((item) => (
                    <div key={item?.name} className="space-y-2">
                      <Link href={item?.href} className="block text-gray-600 hover:text-yellow-600 py-1">
                        {item?.name}
                      </Link>
                      {item?.subItems && (
                        <div className="pl-4 space-y-2">
                          {item?.subItems?.map((subItem) => (
                            <Link 
                              key={subItem?.name} 
                              href={subItem?.href}
                              className="block text-gray-500 hover:text-yellow-600 py-1 text-sm"
                            >
                              {subItem?.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
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

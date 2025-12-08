'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaSearch, FaUser, FaBars, FaChevronDown } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { useLoader } from '@/context/LoaderContext'
import { useAuth } from '@/context/AuthContext'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import LogoutButton from '../auth/LogoutButton'
import "../../styles/globals.css"

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

  { name: 'Enterprise Copper Cables', href: '/products/enterprise-copper-cables' },

  {
    name: 'Modules & Faceplates',
    href: '/products/modules-faceplates',
  },
  {
    name: 'Backboxes & Floorboxes',
    href: '/products/backboxes-floorboxes',
  },
  {
    name: 'Telephone Networking',
    href: '/products/telephone-networking',

  },
  {
    name: 'Keystone Jacks & Shutters VDS',
    href: '/products/keystones-jacks-shutters',

  },
  {
    name: 'Connectors,Products & Enterprises VDS',
    href: '/products/connectors-products-enterprises',

  },
  {
    name: 'Copper Patch Panels & Frames VDS',
    href: '/products/copper-patch-panels-frames',

  },

];

// Market menu interface
interface MarketMenuItem {
  name: string;
  href: string;
}
interface RacksAndCabinetsMenuItem {
  name: string;
  href: string;
}

const racksAndCabinetsMenuItems: RacksAndCabinetsMenuItem[] = [
  { name: 'Floor Standing Racks', href: '/racks-and-cabinets/floor-standing' },
  { name: 'Wall Frames', href: '/racks-and-cabinets/wall-frames' },
  { name: 'Open frame racks', href: '/racks-and-cabinets/open-racks' }
];
// Market menu data
const marketMenuItems: MarketMenuItem[] = [
  { name: 'Commercial Real Estate', href: '/markets/commercial-real-estate' },
  { name: 'Construction', href: '/markets/construction' },
  { name: 'Education', href: '/markets/education' },
  { name: 'Financial', href: '/markets/financial' },
  { name: 'Food & Beverage', href: '/markets/food-beverage' },
  { name: 'Government IT', href: '/markets/government-it' },
  { name: 'Healthcare', href: '/markets/healthcare' },
  { name: 'Oil & Gas', href: '/markets/oil-gas' },
  { name: 'Transportation', href: '/markets/transportation' },
  { name: 'Warehouse Automation', href: '/markets/warehouse-automation' }
];

// Fibre Networking menu interface
interface FibreNetworkingMenuItem {
  name: string;
  href: string;
}

const fibreNetworkingMenuItems: FibreNetworkingMenuItem[] = [
  { name: 'Fibre Cable', href: '/fibre-networking/fibre-cable' },
  { name: 'Fibre Patch Panels', href: '/fibre-networking/fibre-patch-panels' },
  { name: 'Fibre Patch Panel Cassettes', href: '/fibre-networking/fibre-patch-panel-cassettes' },
  { name: 'Fibre Breakout Boxes', href: '/fibre-networking/fibre-breakout-boxes' },
  { name: 'Fibre Patch Boxes', href: '/fibre-networking/fibre-patch-boxes' },
  { name: 'Fibre Connectors & Couplers', href: '/fibre-networking/fibre-connectors-couplers' },
  { name: 'Fibre Attenuators', href: '/fibre-networking/fibre-attenuators' },
  { name: 'Fibre Tools & Accessories', href: '/fibre-networking/fibre-tools-accessories' },
  // { name: 'Why Excel Fibre?', href: '/fibre-networking/why-excel-fibre' },
];

// Power & Data menu interface
interface PowerAndDataMenuItem {
  name: string;
  href: string;
}

const powerAndDataMenuItems: PowerAndDataMenuItem[] = [
  // { name: 'Why Excel PDUs?', href: '/power-and-data/why-excel-pdus' },
  { name: 'Power-PDUs', href: '/power-and-data/power-pdus' },
  { name: 'Power Cords & Extension Leads', href: '/power-and-data/power-cords-extension-leads' },
  { name: 'MPO Fibre Assemblies', href: '/power-and-data/mpo-fibre-assemblies' },
  { name: 'MPO Cassettes', href: '/power-and-data/mpo-cassettes' },
  { name: 'MPO Chassis', href: '/power-and-data/mpo-chassis' },
  { name: 'Fibre Duct', href: '/power-and-data/fibre-duct' },
  { name: 'Data Centre Racks', href: '/power-and-data/data-centre-racks' },
  // { name: 'Liquid Cooling', href: '/power-and-data/liquid-cooling' },
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
  const [isMarketsOpen, setIsMarketsOpen] = useState(false)
  const [isRacksAndCabinetsOpen, setIsRacksAndCabinetsOpen] = useState(false)
  const [isFibreNetworkingOpen, setIsFibreNetworkingOpen] = useState(false)
  const [isPowerAndDataOpen, setIsPowerAndDataOpen] = useState(false)
  // Refs for handling hover behavior
  const productsMenuRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const marketsMenuRef = useRef<HTMLDivElement>(null)
  const racksAndCabinetsMenuRef = useRef<HTMLDivElement>(null)
  const fibreNetworkingMenuRef = useRef<HTMLDivElement>(null)
  const powerAndDataMenuRef = useRef<HTMLDivElement>(null)
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

  // Handle mouse events for markets dropdown
  const handleMarketsMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsMarketsOpen(true)
  }

  const handleMarketsMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMarketsOpen(false)
    }, 100)
  }

  const handleRacksAndCabinetsMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsRacksAndCabinetsOpen(true)
  }

  const handleRacksAndCabinetsMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsRacksAndCabinetsOpen(false)
    }, 100)
  }

  const handleFibreNetworkingMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsFibreNetworkingOpen(true)
  }

  const handleFibreNetworkingMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsFibreNetworkingOpen(false)
    }, 100)
  }

  const handlePowerAndDataMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsPowerAndDataOpen(true)
  }

  const handlePowerAndDataMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsPowerAndDataOpen(false)
    }, 100)
  }

  // Handle menu close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (productsMenuRef.current && !productsMenuRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false)
        setActiveSubMenu(null)
      }
      if (powerAndDataMenuRef.current && !powerAndDataMenuRef.current.contains(event.target as Node)) {
        setIsPowerAndDataOpen(false)
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
    <nav className="bg-white shadow-xl fixed w-full top-0 z-50 border-b-2 border-telemons-blue-100">
      <div className="container mx-2 px-2">
        <div className='custom header-container'>
          <div className="flex justify-between items-center h-20 py-2">
            {/* Logo */}
            <div onClick={() => router.push('/')} className="flex-shrink-0 flex items-center pr-8 py-1">
              <Image
                src="/telemons.jpg"
                alt="Telemons Cable"
                width={210}
                height={110}
                className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
              />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-telemons-blue-primary hover:text-telemons-orange-primary focus:outline-none transition-colors duration-300"
              >
                <FaBars className="h-6 w-6" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">

              {/* Products Dropdown */}
              <div
                ref={productsMenuRef}
                className="relative"
                onMouseEnter={handleProductsMouseEnter}
                onMouseLeave={handleProductsMouseLeave}
              >
                <button className="flex items-center text-telemons-blue-primary hover:text-telemons-orange-primary font-semibold transition-colors duration-300">
                  Copper Systems
                  <FaChevronDown className={`ml-1 h-3 w-3 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Main Dropdown Menu */}
                {isProductsOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl z-50 py-2 border border-telemons-blue-100">
                    {productMenuItems.map((item) => (
                      <div
                        key={item.name}
                        className="relative"
                        onMouseEnter={() => handleCategoryMouseEnter(item.name)}
                        onMouseLeave={handleCategoryMouseLeave}
                      >
                        <button
                          className="w-full text-left px-4 py-3 text-sm text-telemons-blue-700 hover:bg-telemons-orange-50 hover:text-telemons-orange-primary flex justify-between items-center transition-all duration-300"
                          onClick={() => navigateToCategory(item.href)}
                        >
                          {item.name}
                          {item.subItems && <FaChevronDown className="h-3 w-3" />}
                        </button>

                        {/* Submenu */}
                        {activeSubMenu === item.name && item.subItems && (
                          <div className="absolute left-full top-0 w-64 bg-white rounded-xl shadow-2xl z-50 py-2 border border-telemons-blue-100">
                            {item.subItems.map((subItem) => (
                              <button
                                key={subItem.name}
                                className="w-full text-left px-4 py-3 text-sm text-telemons-blue-700 hover:bg-telemons-orange-50 hover:text-telemons-orange-primary transition-all duration-300"
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


              {/* Fibre Networking Dropdown */}
              <div
                ref={fibreNetworkingMenuRef}
                className="relative"
                onMouseEnter={handleFibreNetworkingMouseEnter}
                onMouseLeave={handleFibreNetworkingMouseLeave}
              >
                <button className="flex items-center text-telemons-blue-primary hover:text-telemons-orange-primary font-semibold transition-colors duration-300">
                  Fibre Networking
                  <FaChevronDown className={`ml-1 h-3 w-3 transition-transform duration-300 ${isFibreNetworkingOpen ? 'rotate-180' : ''}`} />
                </button>
                {isFibreNetworkingOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl z-50 py-2 border border-telemons-blue-100">
                    {fibreNetworkingMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-telemons-blue-700 hover:bg-telemons-orange-50 hover:text-telemons-orange-primary transition-all duration-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Power & Data Dropdown */}
              <div
                ref={powerAndDataMenuRef}
                className="relative"
                onMouseEnter={handlePowerAndDataMouseEnter}
                onMouseLeave={handlePowerAndDataMouseLeave}
              >
                <button className="flex items-center text-telemons-blue-primary hover:text-telemons-orange-primary font-semibold transition-colors duration-300">
                  Power & Data
                  <FaChevronDown className={`ml-1 h-3 w-3 transition-transform duration-300 ${isPowerAndDataOpen ? 'rotate-180' : ''}`} />
                </button>
                {isPowerAndDataOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl z-50 py-2 border border-telemons-blue-100">
                    {powerAndDataMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-telemons-blue-700 hover:bg-telemons-orange-50 hover:text-telemons-orange-primary transition-all duration-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>


              {/* Racks & Cabinets Dropdown */}
              <div className="relative"
                ref={racksAndCabinetsMenuRef}
                onMouseEnter={handleRacksAndCabinetsMouseEnter}
                onMouseLeave={handleRacksAndCabinetsMouseLeave}
              >
                <button className="flex items-center text-telemons-blue-primary hover:text-telemons-orange-primary font-semibold transition-colors duration-300">
                  Racks & Cabinets
                  <FaChevronDown className={`ml-1 h-3 w-3 transition-transform duration-300 ${isRacksAndCabinetsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isRacksAndCabinetsOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl z-50 py-2 border border-telemons-blue-100">
                    {racksAndCabinetsMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-telemons-blue-700 hover:bg-telemons-orange-50 hover:text-telemons-orange-primary transition-all duration-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Markets Dropdown */}
              <div
                ref={marketsMenuRef}
                className="relative"
                onMouseEnter={handleMarketsMouseEnter}
                onMouseLeave={handleMarketsMouseLeave}
              >
                <button className="flex items-center text-telemons-blue-primary hover:text-telemons-orange-primary font-semibold transition-colors duration-300">
                  Markets
                  <FaChevronDown className={`ml-1 h-3 w-3 transition-transform duration-300 ${isMarketsOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Markets Dropdown Menu */}
                {isMarketsOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl z-50 py-2 border border-telemons-blue-100">
                    {marketMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-telemons-blue-700 hover:bg-telemons-orange-50 hover:text-telemons-orange-primary transition-all duration-300"
                        onClick={() => setIsMarketsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about-us" className="text-telemons-blue-primary hover:text-telemons-orange-primary font-semibold transition-colors duration-300">About Us</Link>

            </div>

            {/* Search and Auth */}
            <div className="hidden md:flex items-center space-x-8 pl-8">
              {/* Search Bar */}
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 pl-10 pr-4 py-2 border-2 border-telemons-blue-200 rounded-full text-sm focus:outline-none focus:border-telemons-orange-primary focus:ring-2 focus:ring-telemons-orange-primary/20 shadow-sm transition-all duration-300"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-telemons-blue-400" />
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <LogoutButton />
                ) : (
                  <div className="flex space-x-3">
                    <Link
                      href="/login"
                      className="btn-primary"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="btn-outline-orange"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* =====================================================================================================================================================================================*/}

          {/* Mobile Navigation Menu with Products Dropdown */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} pb-4 bg-white border-t border-telemons-blue-100`}>
            <div className="flex flex-col space-y-3">

              {/* Mobile Products Dropdown */}
              <div className="py-2">
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="flex items-center justify-between w-full text-telemons-blue-primary hover:text-telemons-orange-primary transition-colors duration-300"
                >
                  <span>Copper Systems</span>
                  <FaChevronDown className={`h-3 w-3 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProductsOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {productMenuItems.map((item) => (
                      <div key={item?.name} className="space-y-2">
                        <Link href={item?.href} className="block text-telemons-blue-600 hover:text-telemons-orange-primary py-1 transition-colors duration-300">
                          {item?.name}
                        </Link>
                        {item?.subItems && (
                          <div className="pl-4 space-y-2">
                            {item?.subItems?.map((subItem) => (
                              <Link
                                key={subItem?.name}
                                href={subItem?.href}
                                className="block text-telemons-blue-500 hover:text-telemons-orange-primary py-1 text-sm transition-colors duration-300"
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



              {/* Mobile Fibre Networking Dropdown */}
              <div className="py-2">
                <button
                  onClick={() => setIsFibreNetworkingOpen(!isFibreNetworkingOpen)}
                  className="flex items-center justify-between w-full text-telemons-blue-primary hover:text-telemons-orange-primary transition-colors duration-300"
                >
                  <span>Fibre Networking</span>
                  <FaChevronDown className={`h-3 w-3 transition-transform duration-300 ${isFibreNetworkingOpen ? 'rotate-180' : ''}`} />
                </button>
                {isFibreNetworkingOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {fibreNetworkingMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block text-telemons-blue-600 hover:text-telemons-orange-primary py-1 transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Power & Data Dropdown */}
              <div className="py-2">
                <button
                  onClick={() => setIsPowerAndDataOpen(!isPowerAndDataOpen)}
                  className="flex items-center justify-between w-full text-telemons-blue-primary hover:text-telemons-orange-primary transition-colors duration-300"
                >
                  <span>Power & Data</span>
                  <FaChevronDown className={`h-3 w-3 transition-transform duration-300 ${isPowerAndDataOpen ? 'rotate-180' : ''}`} />
                </button>
                {isPowerAndDataOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {powerAndDataMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block text-telemons-blue-600 hover:text-telemons-orange-primary py-1 transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Racks & Cabinets Dropdown */}
              <div className="py-2">
                <button
                  onClick={() => setIsRacksAndCabinetsOpen(!isRacksAndCabinetsOpen)}
                  className="flex items-center justify-between w-full text-telemons-blue-primary hover:text-telemons-orange-primary transition-colors duration-300"
                >
                  <span>Racks & Cabinets</span>
                  <FaChevronDown className={`h-3 w-3 transition-transform duration-300 ${isRacksAndCabinetsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isRacksAndCabinetsOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {racksAndCabinetsMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block text-telemons-blue-600 hover:text-telemons-orange-primary py-1 transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>


              {/* Mobile Markets Dropdown */}
              <div className="py-2">
                <button
                  onClick={() => setIsMarketsOpen(!isMarketsOpen)}
                  className="flex items-center justify-between w-full text-telemons-blue-primary hover:text-telemons-orange-primary transition-colors duration-300"
                >
                  <span>Markets</span>
                  <FaChevronDown className={`h-3 w-3 transition-transform duration-300 ${isMarketsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMarketsOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {marketMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block text-telemons-blue-600 hover:text-telemons-orange-primary py-1 transition-colors duration-300"
                        onClick={() => {
                          setIsMarketsOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about-us" className="text-telemons-blue-primary hover:text-telemons-orange-primary font-semibold transition-colors duration-300">About Us</Link>

              {/* Mobile Search */}
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-telemons-blue-200 rounded-full text-sm focus:outline-none focus:border-telemons-orange-primary focus:ring-2 focus:ring-telemons-orange-primary/20 transition-all duration-300"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-telemons-blue-400" />
              </div>

              {/* Mobile Auth Buttons */}
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 mt-2">
                  <Link
                    href="/login"
                    className="w-full text-center px-4 py-3 text-sm font-semibold text-white bg-telemons-blue-primary hover:bg-telemons-blue-dark rounded-lg transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full text-center px-4 py-3 text-sm font-semibold text-telemons-orange-primary border-2 border-telemons-orange-primary rounded-lg hover:bg-telemons-orange-primary hover:text-white transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

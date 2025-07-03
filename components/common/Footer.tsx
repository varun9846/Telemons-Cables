'use client'
import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

interface FooterProps {
  className?: string
}

export const Footer = ({ className = '' }: FooterProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`bg-gradient-to-br from-telemons-blue-900 via-telemons-blue-800 to-telemons-blue-900 text-white py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-telemons-orange-primary">Telemons Cable</h3>
            <p className="text-telemons-blue-100 leading-relaxed">
              Leading provider of innovative cable solutions for industries worldwide.
            </p>
            <div className="mt-4">
              <div className="w-16 h-1 bg-telemons-orange-primary rounded-full"></div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-telemons-orange-primary">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-telemons-blue-100 hover:text-telemons-orange-primary transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-telemons-orange-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/markets" className="text-telemons-blue-100 hover:text-telemons-orange-primary transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-telemons-orange-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Markets
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-telemons-blue-100 hover:text-telemons-orange-primary transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-telemons-orange-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-telemons-blue-100 hover:text-telemons-orange-primary transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-telemons-orange-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-telemons-orange-primary">Contact Us</h3>
            <ul className="space-y-3 text-telemons-blue-100">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-telemons-orange-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>123 Cable Street</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-telemons-orange-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Tech City, TC 12345</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-telemons-orange-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Phone: (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-telemons-orange-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Email: info@telemons.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-telemons-orange-primary">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-telemons-blue-100 hover:text-telemons-orange-primary transition-all duration-300 transform hover:scale-110">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-telemons-blue-100 hover:text-telemons-orange-primary transition-all duration-300 transform hover:scale-110">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-telemons-blue-100 hover:text-telemons-orange-primary transition-all duration-300 transform hover:scale-110">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-telemons-blue-100 hover:text-telemons-orange-primary transition-all duration-300 transform hover:scale-110">
                <FaInstagram size={24} />
              </a>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-telemons-blue-100">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-telemons-blue-800 border border-telemons-blue-600 rounded-l-lg focus:outline-none focus:border-telemons-orange-primary text-white placeholder-telemons-blue-300"
                />
                <button className="px-4 py-2 bg-telemons-orange-primary hover:bg-telemons-orange-dark text-white text-sm font-semibold rounded-r-lg transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-telemons-blue-700 mt-8 pt-8 text-center">
          <p className="text-telemons-blue-200">&copy; {currentYear} Telemons Cable. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6 text-sm">
            <Link href="/privacy" className="text-telemons-blue-200 hover:text-telemons-orange-primary transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-telemons-blue-200 hover:text-telemons-orange-primary transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-telemons-blue-200 hover:text-telemons-orange-primary transition-colors duration-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 
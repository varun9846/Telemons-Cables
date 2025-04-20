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
    <footer className={`bg-gray-800 text-white py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Telemons Cable</h3>
            <p className="text-gray-300">
              Leading provider of innovative cable solutions for industries worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-yellow-500">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/markets" className="text-gray-300 hover:text-yellow-500">
                  Markets
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-gray-300 hover:text-yellow-500">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-yellow-500">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>123 Cable Street</li>
              <li>Tech City, TC 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@telemons.com</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-yellow-500">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-500">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-500">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-500">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} Telemons Cable. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 
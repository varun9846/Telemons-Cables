import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
const categories = [
  {
    title: 'Fibre Cable',
    description: 'High-performance fibre optic cables for reliable data transmission',
    href: '/fibre-networking/fibre-cable',
    image: '/images/power-data/Excel Enbeam OM4 Multimode Armoured CST Fibre Optic Cable Loose Tube 8 Core 50_125 LSOH Eca Blue.jpg'
  },
  {
    title: 'Fibre Patch Panels',
    description: 'Professional-grade patch panels for organized fibre management',
    href: '/fibre-networking/fibre-patch-panels',
    image: '/images/power-data/Excel Enbeam LGX 3U 14 Module Panel.jpg'
  },
  {
    title: 'Fibre Patch Panel Cassettes',
    description: 'Modular cassettes for flexible fibre patch panel configurations',
    href: '/fibre-networking/fibre-patch-panel-cassettes',
    image: '/images/power-data/Part Code_ 208-016-APC.jpg'
  },
  {
    title: 'Fibre Breakout Boxes',
    description: 'Secure breakout solutions for fibre cable management',
    href: '/fibre-networking/fibre-breakout-boxes',
    image: '/images/power-data/Part Code_ 202-120.jpg'
  },
  {
    title: 'Fibre Patch Boxes',
    description: 'Compact patch boxes for efficient fibre connections',
    href: '/fibre-networking/fibre-patch-boxes',
    image: '/images/power-data/Part Code_ 208-200.jpg'
  },
  {
    title: 'Fibre Connectors & Couplers',
    description: 'High-quality connectors and couplers for reliable fibre connections',
    href: '/fibre-networking/fibre-connectors-couplers',
    image: '/images/power-data/200-372-06.jpg'
  },
  {
    title: 'Fibre Attenuators',
    description: 'Precision attenuators for optimal signal management',
    href: '/fibre-networking/fibre-attenuators',
    image: '/images/power-data/208-570.jpg'
  },
  {
    title: 'Fibre Tools & Accessories',
    description: 'Essential tools and accessories for fibre installation and maintenance',
    href: '/fibre-networking/fibre-tools-accessories',
    image: '/images/power-data/202-080.jpg'
  }
];

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function FibreNetworkingPage() {
  try {
    // Ensure we're using a single connection
    if (!prisma) {
      throw new Error('Database connection not available');
    }

    // Perform any necessary database operations here
    // The connection will be automatically managed by Prisma

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        {/* Hero Section */}
        <div className="relative bg-blue-900 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/fibre-networking-hero.jpg"
              alt="Fibre Networking"
              fill
              className="object-contain opacity-20"
              priority
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fibre Networking Solutions
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl">
              High-performance fibre optic solutions for reliable and efficient data transmission.
              From cables to connectors, we provide comprehensive networking infrastructure.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    View Products
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error in FibreNetworkingPage:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600">{error instanceof Error ? error.message : 'An unexpected error occurred'}</p>
        </div>
      </div>
    );
  }
}

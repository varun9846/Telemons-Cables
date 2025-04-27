'use client'

import Image from 'next/image';
import { useState } from 'react';
import { FaNetworkWired, FaServer, FaTools, FaPowerOff } from 'react-icons/fa';
import { MdCable, MdStorage } from 'react-icons/md';
import { Footer } from '@/components/common/Footer';
import { Navbar } from '@/components/common/Navbar';

// Product category interface for type safety
interface ProductCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  image: string;
}

// Product categories data
const productCategories: ProductCategory[] = [
  {
    title: 'Structured Cabling Solutions',
    description: 'High-performance copper and fiber optic cabling solutions for optimal signal integrity and high-speed data transmission.',
    icon: <MdCable className="w-10 h-10 text-blue-600" />,
    features: [
      'Category 5e, 6, 6A, and 8 cables',
      'Patch panels and keystone jacks',
      'Single-mode and multi-mode fiber cables',
      'Patch cords and connectors',
    ],
    image: '/images/cabling.jpg',
  },
  {
    title: 'Data Center Infrastructure',
    description: 'Comprehensive data center solutions designed for efficiency and scalability.',
    icon: <FaServer className="w-10 h-10 text-green-600" />,
    features: [
      'Pre-terminated copper and fiber assemblies',
      'High-density patch panels',
      'MPO/MTP solutions',
      'Intelligent cable management',
    ],
    image: '/images/datacenter.jpg',
  },
  {
    title: 'Racks and Enclosures',
    description: 'Versatile rack solutions for diverse equipment configurations.',
    icon: <MdStorage className="w-10 h-10 text-purple-600" />,
    features: [
      'Free-standing and wall-mounted racks',
      'Robust construction',
      'Effective cable management',
      'Ventilation options',
    ],
    image: '/images/racks.jpg',
  },
  {
    title: 'Power Distribution Units',
    description: 'Reliable power distribution solutions with advanced monitoring capabilities.',
    icon: <FaPowerOff className="w-10 h-10 text-red-600" />,
    features: [
      'Intelligent and monitored units',
      'Energy efficiency',
      'Remote management',
      'Various configurations',
    ],
    image: '/images/pdu.jpg',
  },
  {
    title: 'Tools and Accessories',
    description: 'Comprehensive tools and accessories for installation and maintenance.',
    icon: <FaTools className="w-10 h-10 text-yellow-600" />,
    features: [
      'Punch-down tools',
      'Cable testers',
      'Labeling systems',
      'Faceplates and backboxes',
    ],
    image: '/images/tools.jpg',
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>(productCategories[0].title);
  
  // Find the active category object
  const activeCategoryObj = productCategories.find(cat => cat.title === activeCategory) || productCategories[0];

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-900 to-blue-600 text-white flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Explore Our <span className="text-blue-300">Networking Solutions</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover high-performance products designed for modern infrastructure.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Browse Products
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Our <span className="text-blue-600">Products</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 leading-relaxed">
            Comprehensive suite of networking and data communication solutions designed for the modern infrastructure.
          </p>
        </div>

        {/* Product Navigation */}
        <div className="flex overflow-x-auto space-x-2 pb-4 mb-16 scrollbar-thin scrollbar-thumb-gray-300">
          {productCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.title)}
              className={`flex items-center px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                activeCategory === category.title
                  ? 'bg-blue-100 text-blue-900 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label={`Select ${category.title}`}
            >
              <span className="mr-2">{category.icon}</span>
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Category Image */}
            <div className="md:w-1/2 relative aspect-[4/3] md:aspect-auto">
              <Image
                src={activeCategoryObj.image}
                alt={activeCategoryObj.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Category Details */}
            <div className="md:w-1/2 p-10">
              <div className="flex items-center mb-6">
                <div className="mr-4">{activeCategoryObj.icon}</div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {activeCategoryObj.title}
                </h2>
              </div>
              
              <p className="text-gray-600 mb-8 text-base md:text-lg leading-relaxed">
                {activeCategoryObj.description}
              </p>
              
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Key Features:</h3>
              <ul className="space-y-3">
                {activeCategoryObj.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-gray-700">
                    <svg
                      className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* <div className="mt-10">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-lg font-medium">
                  Request Quote
                </button>
              </div> */}
            </div>
          </div>
        </div>
        
        {/* All Products Section */}
        <div className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Browse All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {productCategories.map((category, index) => (
              <article
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-200 border border-transparent"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg md:text-xl font-bold text-white">{category.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 text-base leading-relaxed">{category.description}</p>
                  <button
                    onClick={() => setActiveCategory(category.title)}
                    className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      
      {/* Partner Brands Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Partner Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center">
            {['partner1.png', 'partner2.png', 'partner3.png', 'partner4.png'].map((logo, index) => (
              <div
                key={index}
                className="w-32 h-32 bg-white rounded-lg shadow flex items-center justify-center transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Image
                  src={`/images/partners/${logo}`}
                  alt={`Partner ${index + 1}`}
                  width={100}
                  height={100}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
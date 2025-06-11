import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

const heroImage = '/images/pdu.jpg';
const rackImage = '/images/racks.jpg';
const cableImage = '/images/power-data/Part Code_ 202-026.jpg';

const powerSolutions = [
  {
    title: 'Specialized Power Distribution Units (PDUs)',
    description:
      'Excel Networking offers a variety of PDUs, including horizontal and vertical models for 19-inch racks, constructed from durable aluminum with features like fully shrouded switches and LED power indicators. Input options include 16A, 32A, and 63A, with multiple socket types (BS1363, IEC C13/C19, Schuko).',
    image: heroImage,
    badge: 'Premium',
  },
  {
    title: 'Complementary Power Products',
    description:
      'Power cords and extension leads ensure secure and adaptable power connectivity, supporting the demanding needs of modern IT environments.',
    image: cableImage,
    badge: 'Essential',
  },
  {
    title: 'Sustainability & Support',
    description:
      'Products are designed to reduce environmental impact, supported by certifications like CIBSE TM65 for embodied carbon assessment. Excel provides pre-sales consultation, customized solutions, and a 25-year warranty for certified installations.',
    image: '/images/Tool.jpg',
    badge: '25-Year Warranty',
  },
];

const dataCenterCatalog = [
  {
    title: 'End-to-End Infrastructure Solutions',
    description:
      'Excel delivers scalable, high-speed, and secure connectivity through copper and fiber cabling systems, containment solutions, racks, and intelligent PDUs.',
    image: cableImage,
    icon: '🏗️',
  },
  {
    title: 'Advanced Data Center Products',
    description:
      'Pre-terminated mini-breakout cables (3.8mm diameter, MTP/MPO for 40G/100G Ethernet), singlemode fiber for high data rates and long distances, and the Environ rack series (SR, CL, OR) for durability and flexibility.',
    image: rackImage,
    icon: '⚡',
  },
  {
    title: 'Intelligent PDUs & Environmental Focus',
    description:
      'Intelligent PDUs offer real-time monitoring (temperature, humidity). Sustainability is emphasized with EPDs and plastic-free packaging. Excel provides global support, on-site training, and proof-of-concept services.',
    image: heroImage,
    icon: '🌱',
  },
];

export default function PowerAndDataPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white/20 rotate-45 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-lg animate-pulse delay-300"></div>
        </div>
        
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Power & Data Solutions"
            fill
            className="object-cover opacity-15 mix-blend-overlay"
            priority
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Industry Leading Solutions
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Power & Data Center
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 leading-relaxed mb-10">
              Delivering cutting-edge, sustainable, and scalable solutions for data center power and connectivity needs, catering to a global audience of IT professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Explore Solutions
              </button>
              <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                Get Consultation
              </button>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 text-slate-50">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* Enhanced Power Solutions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Power Solutions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
            Enterprise-grade power distribution solutions designed for mission-critical environments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {powerSolutions.map((item, index) => (
            <div 
              key={item.title} 
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold rounded-full shadow-lg">
                  {item.badge}
                </span>
              </div>
              
              <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-contain group-hover:scale-110 transition-transform duration-700 p-4" 
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                  {item.description}
                </p>
                
                <button className="self-start px-6 py-2 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 border border-blue-200 hover:border-blue-300">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Data Center Catalog Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Data Center Catalog
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
              Comprehensive infrastructure solutions for next-generation data centers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dataCenterCatalog.map((item, index) => (
              <div 
                key={item.title} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 border border-gray-100 relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Icon overlay */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                    {item.icon}
                  </div>
                </div>
                
                <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-contain group-hover:scale-110 transition-transform duration-700 p-4" 
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <button className="px-6 py-2 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-300 border border-indigo-200 hover:border-indigo-300">
                      Explore →
                    </button>
                    
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-indigo-200 rounded-full group-hover:bg-indigo-400 transition-colors duration-300"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Sustainability Section with advanced styling */}
      <section className="relative py-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-12 lg:p-16 border border-white/20">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
                🌍 Global Impact
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 bg-clip-text text-transparent">
                  Sustainability & Global Commitment
                </span>
              </h2>
              
              <div className="w-32 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-indigo-500 mx-auto rounded-full"></div>
            </div>
            
            {/* Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Excel Networking is committed to reducing environmental impact through sustainable product design, third-party certifications, and plastic-free packaging. With a global presence in over 70 countries and a significant share of the UK copper cabling market, Excel leads in innovative, reliable, and environmentally responsible infrastructure.
                </p>
                
                <p className="text-gray-700 text-lg leading-relaxed">
                  Specialist support includes on-site training, proof-of-concept services, and a 25-year warranty for certified installations, ensuring long-term operational efficiency and expert guidance for data center professionals.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm font-medium">70+ Countries</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-sm font-medium">25-Year Warranty</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    <span className="text-sm font-medium">CIBSE TM65 Certified</span>
                  </div>
                </div>
              </div>
              
              {/* Stats/Features */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                  <div className="text-3xl mb-2">🌱</div>
                  <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Plastic-Free Packaging</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">25</div>
                  <div className="text-sm text-gray-600">Year Warranty</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl border border-indigo-200">
                  <div className="text-3xl mb-2">🌍</div>
                  <div className="text-2xl font-bold text-indigo-600 mb-1">70+</div>
                  <div className="text-sm text-gray-600">Countries Served</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-100 rounded-2xl border border-purple-200">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Expert Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
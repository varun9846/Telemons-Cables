'use client'

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

const heroImage = '/images/power-data/Environ OR 52U 2-Post Open Rack 75mm Deep Profile to Profile.jpg';
const rackImage = '/images/power-data/546-42610-VDBN-BK.jpg';
const cableImage = '/images/power-data/460-100-IRS45.jpg';

const rackCategories = [
  {
    title: 'Equipment & Communications Racks (ER & CR Series)',
    description: 'Designed for everyday deployment across data, security, AV, and telecom sectors. They support up to 600 kg, offer modular customization, and come in assembled or flat-packed forms. Adjustable 19″ profiles, cable entry openings, vented roofs, lockable doors, and wheels or jacking feet enhance usability.',
    image: heroImage,
    badge: '25-Year Warranty',
  },
  {
    title: 'Server Racks (SR Series)',
    description: 'Heavy-duty racks that handle up to 1 500 kg, featuring mesh doors for improved cooling, split side panels, and multiple configurations. Accessories include RFID/Biometric locking systems. These are ideal for dense server setups and data centres.',
    image: rackImage,
    badge: 'Premium',
  },
  {
    title: 'Co‑Location Racks (CL Series)',
    description: 'Built from the ER chassis, these racks are optimized for shared-hosting facilities, offering 2 or 4 compartment layouts, secure locking, brush strip cable entries, removable sides, and simultaneous castor/jackfoot options.',
    image: cableImage,
    badge: 'Enterprise',
  },
];

const additionalRacks = [
  {
    title: 'Open-frame Racks (OR Series)',
    description: 'Ideal for high-density patching or compact server mounting, OR racks are durable aluminium frames with heavy-duty supports, bearing up to 1 500 kg. They include lockable doors and versatile cable management.',
    image: heroImage,
    icon: '🏗️',
  },
  {
    title: 'Wall Racks (WR Series)',
    description: 'Compact and tidy, designed for small-scale installations (LAN, AV, security). They support up to 63 kg, in various depths (390/500/600 mm), glass doors, adjustable mounting rails, and lockable panels.',
    image: '/images/power-data/Environ OR Conversion Kit to 4-Post 500mm to 800mm.jpg',
    icon: '⚡',
  },
  {
    title: 'Data Centre Racks (DCR Series)',
    description: 'Enhanced Environ racks with up to 1 500 kg capacity. Features high-ventilation mesh doors (80% airflow), airflow baffles, roof brush strip entry, side cable routing, and finger cable organisers.',
    image: cableImage,
    icon: '🌱',
  },
];

export default function RacksAndCabinetsPage() {
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
            alt="Racks & Cabinets Solutions"
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
              Racks & Cabinets
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 leading-relaxed mb-10">
              Discover our comprehensive range of high-quality racks and cabinets designed for optimal organization, durability, and performance in any environment.
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

      {/* Main Rack Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Rack Categories
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
            Enterprise-grade rack solutions designed for mission-critical environments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rackCategories.map((item, index) => (
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

      {/* Additional Racks Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Additional Rack Solutions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
              Specialized rack solutions for specific use cases and environments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalRacks.map((item, index) => (
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

      {/* Features Section */}
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
                🌟 Key Features
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 bg-clip-text text-transparent">
                  Why Choose Our Racks?
                </span>
              </h2>
              
              <div className="w-32 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-indigo-500 mx-auto rounded-full"></div>
            </div>
            
            {/* Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Our racks are designed with high durability and versatility, covering weight loads from 63 kg to 1 500 kg, fitting various environments from residential to data centres. Each rack family addresses specific scenarios—from everyday comms to secure multi-tenant colocation.
                </p>
                
                <p className="text-gray-700 text-lg leading-relaxed">
                  Smart cable & airflow management with integrated brush strips, vented panels, baffles, and cable trays ensure neat, efficient setups. All products come with a 25-year warranty if installed by an authorised Telemons-Cables partner.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm font-medium">25-Year Warranty</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-sm font-medium">Smart Management</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    <span className="text-sm font-medium">Secure Locking</span>
                  </div>
                </div>
              </div>
              
              {/* Stats/Features */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                  <div className="text-3xl mb-2">🏗️</div>
                  <div className="text-2xl font-bold text-green-600 mb-1">1,500kg</div>
                  <div className="text-sm text-gray-600">Max Load Capacity</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                  <div className="text-3xl mb-2">🔒</div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">25</div>
                  <div className="text-sm text-gray-600">Year Warranty</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl border border-indigo-200">
                  <div className="text-3xl mb-2">🌡️</div>
                  <div className="text-2xl font-bold text-indigo-600 mb-1">80%</div>
                  <div className="text-sm text-gray-600">Airflow Efficiency</div>
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
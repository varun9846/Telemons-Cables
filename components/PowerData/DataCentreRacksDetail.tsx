import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  FaArrowLeft, 
  FaCheck, 
  FaQuoteRight, 
  FaShieldAlt, 
  FaBolt, 
  FaLeaf,
  FaStar,
  FaCertificate,
  FaAward,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import { DataCentreRack } from '@/types/data-centre-racks';

interface DataCentreRacksDetailProps {
  product: DataCentreRack;
  onBack: () => void;
}

const DataCentreRacksDetail: React.FC<DataCentreRacksDetailProps> = ({ product, onBack }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40">
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Product Image */}
            <div className="relative">
              <div className="relative h-[512px] w-full max-w-lg mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 rounded-3xl transform rotate-3 scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-200/50 via-transparent to-purple-200/50 rounded-3xl transform -rotate-2 scale-103"></div>
                
                <div className="relative h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {product.indepthImage && (
          <Image
            src={product.indepthImage}
            alt={product.titleHead || 'Data Centre Rack'}
            fill
                      className={`object-cover transition-all duration-700 ${
                        imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                      }`}
                      sizes="(max-width: 768px) 100vw, 50vw"
            priority
                      onLoad={() => setImageLoaded(true)}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                      <FaStar className="text-xs" />
                      <span>Premium</span>
                    </div>
                  </div>
                </div>
        </div>
      </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Industrial Grade
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    In Stock
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {product.indepthTitle}
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {product.indepthDescription}
            </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{product.indepthPartCode}</div>
                  <div className="text-sm text-gray-500">Part Code</div>
                </div>
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-1">42U</div>
                  <div className="text-sm text-gray-500">Height</div>
                </div>
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
                  <div className="text-2xl font-bold text-purple-600 mb-1">600mm</div>
                  <div className="text-sm text-gray-500">Width</div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Request Quote
                </button>
                <button className="flex-1 bg-white text-gray-700 py-4 px-8 rounded-2xl font-bold text-lg border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300">
                  Download Specs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              <div className="flex space-x-1">
                {[
                  { id: 'overview', label: 'Overview', icon: FaQuoteRight },
                  { id: 'features', label: 'Features', icon: FaBolt },
                  { id: 'specs', label: 'Specifications', icon: FaCertificate }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <tab.icon className="text-sm" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-2 h-10 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
                      Product Overview
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                      {product.indepthDescription}
                    </p>
                    
                    {/* Key Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="group p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                        <FaShieldAlt className="text-3xl text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
                        <h4 className="font-bold text-gray-900 mb-2">Reliability</h4>
                        <p className="text-gray-600 text-sm">Engineered for consistent performance in demanding environments</p>
                      </div>
                      <div className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300">
                        <FaBolt className="text-3xl text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
                        <h4 className="font-bold text-gray-900 mb-2">Performance</h4>
                        <p className="text-gray-600 text-sm">Optimal rack management with efficient space utilization</p>
                      </div>
                      <div className="group p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                        <FaLeaf className="text-3xl text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
                        <h4 className="font-bold text-gray-900 mb-2">Sustainability</h4>
                        <p className="text-gray-600 text-sm">Eco-friendly materials and energy-efficient design</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && (
                <div className="animate-fade-in">
                  <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                      <div className="w-2 h-10 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full mr-4"></div>
                      Key Features
                    </h2>
                    
                    <div className="space-y-4">
                      {product.indepthKeyFeatures?.split('-').filter(Boolean).map((feature, idx) => (
                        <div 
                          key={idx}
                          className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                              <FaCheck className="text-white text-sm" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <span className="text-gray-800 font-semibold text-lg leading-relaxed block">
                              {feature.trim()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === 'specs' && (
                <div className="animate-fade-in">
                  <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                      <div className="w-2 h-10 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-4"></div>
                      Technical Specifications
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-100">
                          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <FaCertificate className="text-blue-600 mr-2" />
                            Product Details
                          </h4>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                              <span className="text-gray-600 font-medium">Part Code</span>
                              <span className="text-gray-900 font-bold">{product.indepthPartCode}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                              <span className="text-gray-600 font-medium">Model</span>
                              <span className="text-gray-900 text-sm ml-8 font-bold">{product.indepthTitle}</span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                              <span className="text-gray-600 font-medium">Type</span>
                              <span className="text-gray-900 font-bold">Data Centre Rack</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-gray-50 to-green-50 p-6 rounded-2xl border border-gray-100">
                          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <FaAward className="text-green-600 mr-2" />
                            Certifications
                          </h4>
                          <div className="space-y-3">
                            {['CE Certified', 'RoHS Compliant', 'ISO 9001 Standard', 'Safety Tested'].map((cert, idx) => (
                              <div key={idx} className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                                <span className="text-gray-700 font-medium">{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Contact Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl shadow-2xl overflow-hidden">
                  {/* Animated Background Elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16 animate-pulse" style={{animationDelay: '1s'}}></div>
                  
                  <div className="relative p-8">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                        <FaQuoteRight className="text-3xl text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        Ready to Order?
                      </h3>
                      <p className="text-blue-100 leading-relaxed">
                        Get instant quotes, technical support, and customized solutions from our expert team.
                      </p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {[
                        'Expert Technical Support',
                        'Competitive Bulk Pricing',
                        'Fast Delivery Options',
                        'Custom Rack Solutions'
                      ].map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-3 text-blue-100">
                          <FaCheck className="text-green-400 flex-shrink-0" />
                          <span className="font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <button className="group w-full bg-white text-blue-700 py-4 px-6 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        <span className="flex items-center justify-center space-x-2">
                          <FaEnvelope className="text-lg" />
                          <span>Get Quote Now</span>
                        </span>
                      </button>
                      
                      <button className="group w-full bg-blue-500/30 backdrop-blur-sm text-white py-4 px-6 rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-blue-500/50 transition-all duration-300">
                        <span className="flex items-center justify-center space-x-2">
                          <FaPhone className="text-lg" />
                          <span>Call Expert</span>
                        </span>
            </button>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/20 text-center">
                      <p className="text-blue-200 text-sm leading-relaxed">
                        <span className="block font-semibold text-white mb-1">🚀 Fast Response Guarantee</span>
                        Get your quote within 2 hours during business hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DataCentreRacksDetail; 
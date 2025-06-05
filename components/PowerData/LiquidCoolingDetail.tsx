import React from 'react';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import { LiquidCooling } from '@/types/liquid-cooling';

interface LiquidCoolingDetailProps {
  product: LiquidCooling;
  onBack: () => void;
}

const LiquidCoolingDetail: React.FC<LiquidCoolingDetailProps> = ({ product, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-8"
      >
        <FaArrowLeft />
        <span>Back to Products</span>
      </button>

      {/* Hero Section */}
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
        {product.indepthImage && (
          <Image
            src={product.indepthImage}
            alt={product.titleHead || 'Liquid Cooling System'}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold mb-4">{product.titleHead}</h1>
          <p className="text-lg max-w-2xl">{product.description}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column - Specifications */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Overview</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.indepthDescription}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="space-y-3 mb-8">
              {product.indepthKeyFeatures?.split(',').map((feature, idx) => (
                <li key={idx} className="flex items-start text-gray-700">
                  <svg
                    className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base">{feature.trim()}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
                <ul className="space-y-2">
                  <li><b>Part Code:</b> {product.indepthPartCode}</li>
                  <li><b>Title:</b> {product.indepthTitle}</li>
                  <li><b>Description:</b> {product.indepthDescription}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - CTA */}
        <div>
          {/* Contact Box */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">Interested in this product?</h3>
            <p className="mb-6">Contact our sales team for pricing, availability, and customized solutions.</p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="w-full bg-white text-blue-700 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidCoolingDetail; 
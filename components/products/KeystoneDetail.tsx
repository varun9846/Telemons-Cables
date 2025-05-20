import React from 'react';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

interface KeystoneDetailProps {
  product: {
    id: string;
    title: string;
    partNumber: string;
    description: string;
    image: string;
    specifications: {
      model: string;
      connectorType: string;
      shielded: string;
      category: string;
      requiresTerminationTool: string;
      suitableForRoundCable: string;
      performanceLevel: string;
      cableConstruction: string;
      conductorGauge: string;
      conductorType: string;
      overallLength: string;
      flammabilityRating: string;
      availableColors: string[];
    };
    features: string[];
    detailedDescription: string;
    additionalImages: string[];
  };
  onBack: () => void;
}

const KeystoneDetail: React.FC<KeystoneDetailProps> = ({ product, onBack }) => {
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
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
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
              {product.detailedDescription}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="space-y-3 mb-8">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-gray-700">
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

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Specifications</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value], idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-3">
                    <h4 className="font-medium text-gray-900">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                    <p className="text-gray-600 mt-1">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Additional Images & CTA */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Product Gallery</h3>
            <div className="space-y-4">
              {product.additionalImages?.map((img, idx) => (
                <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={img}
                    alt={`${product.title} - Image ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Box */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">Interested in this product?</h3>
            <p className="mb-6">Contact our sales team for pricing, availability, and customized solutions.</p>
            <button className="w-full bg-white text-blue-700 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeystoneDetail; 
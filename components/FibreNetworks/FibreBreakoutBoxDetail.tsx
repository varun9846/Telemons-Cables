import React from 'react';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import { FibreBreakoutBox } from '@/types/fibre-breakout-box';

interface FibreBreakoutBoxDetailProps {
  product: FibreBreakoutBox;
  onBack: () => void;
}

const FibreBreakoutBoxDetail: React.FC<FibreBreakoutBoxDetailProps> = ({ product, onBack }) => {
  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <FaArrowLeft />
        <span>Back to Products</span>
      </button>

      {/* Hero Section */}
      <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
        {product.image && (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.title}</h1>
          <p className="text-lg opacity-90">{product.partNumber}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Product Overview */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Overview</h2>
            <p className="text-gray-700 leading-relaxed">{product.detailedDescription}</p>
          </div>

          {/* Key Features */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
            <ul className="space-y-3">
              {product.specifications.map((spec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700">{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Images */}
          {product.additionalImages && product.additionalImages.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Images</h2>
              <div className="grid grid-cols-2 gap-4">
                {product.additionalImages.map((image, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Product Gallery */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Gallery</h2>
            <div className="space-y-4">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              {product.additionalImages && product.additionalImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {product.additionalImages.slice(0, 4).map((image, index) => (
                    <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${product.title} - Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contact Box */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Interested in this Product?</h2>
            <p className="text-gray-700 mb-6">
              Contact us for more information about {product.title} or to request a quote.
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FibreBreakoutBoxDetail; 
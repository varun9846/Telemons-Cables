'use client'

import React from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { OpenRack } from '@/types/open-rack';

interface OpenRackDetailProps {
  product: OpenRack;
  onBack: () => void;
}

const OpenRackDetail: React.FC<OpenRackDetailProps> = ({ product, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        <FaArrowLeft className="mr-2" />
        Back to Racks
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <Image
            src={product.image || '/images/placeholder.png'}
            alt={product.title || 'Open Rack'}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
          <div className="mb-6">
            <span className="text-sm text-gray-500">Part Number:</span>
            <span className="ml-2 text-gray-900 font-medium">{product.partNumber}</span>
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">{feature.trim()}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Interested in this product?</h3>
            <p className="text-gray-600 mb-6">
              Contact us for pricing, availability, and any other questions you may have.
            </p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenRackDetail; 
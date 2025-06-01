'use client'

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import FloorStandingRackDetail from './FloorStandingRackDetail';
import { FloorStandingRack } from '@/types/floor-standing-rack';

interface FloorStandingRacksProps {
  racks: FloorStandingRack[];
}

const FloorStandingRacks: React.FC<FloorStandingRacksProps> = ({ racks }) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [selectedProduct, setSelectedProduct] = useState<FloorStandingRack | null>(null);

  const toggleSpecifications = useCallback((id: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const handleViewDetails = useCallback((rack: FloorStandingRack) => {
    setSelectedProduct(rack);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  if (selectedProduct) {
    return (
      <FloorStandingRackDetail
        product={selectedProduct}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {racks.map((rack) => (
        <div
          key={rack.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-64 w-full">
            <Image
              src={rack.image || '/images/placeholder.png'}
              alt={rack.title || 'Floor Standing Rack'}
              fill
              className="object-cover"
              priority={false}
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{rack.title}</h3>
            <p className="text-gray-600 mb-4">{rack.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Part: {rack.partNumber}</span>
              <button
                onClick={() => toggleSpecifications(Number(rack.id))}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {expandedItems[rack.id] ? 'Hide Specs' : 'Quick Specs'}
              </button>
            </div>
            {expandedItems[rack.id] && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Key Features:</h4>
                <ul className="space-y-2">
                  {rack.specifications?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <FaCheck className="text-green-500 mr-2 flex-shrink-0" />
                      {feature.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={() => handleViewDetails(rack)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            >
              View Details
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloorStandingRacks; 
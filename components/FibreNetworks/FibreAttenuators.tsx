'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { FibreAttenuator } from '@/types/fibre-attenuator';
import FibreAttenuatorDetail from '@/components/FibreNetworks/FibreAttenuatorDetail';

interface FibreAttenuatorsProps {
  attenuators: FibreAttenuator[];
}

export default function FibreAttenuators({ attenuators }: FibreAttenuatorsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedAttenuator, setSelectedAttenuator] = useState<FibreAttenuator | null>(null);

  useEffect(() => {
    if (selectedAttenuator) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedAttenuator]);

  const toggleSpecifications = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleViewDetails = (attenuator: FibreAttenuator) => {
    setSelectedAttenuator(attenuator);
  };

  if (selectedAttenuator) {
    return (
      <FibreAttenuatorDetail
        product={selectedAttenuator}
        onBack={() => setSelectedAttenuator(null)}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {attenuators.map((attenuator, index) => (
        <div
          key={attenuator.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-48 w-full">
            <Image
              src={attenuator.image}
              alt={attenuator.title}
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {attenuator.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Part Number: {attenuator.partNumber}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-2">
              {attenuator.description}
            </p>
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => toggleSpecifications(index)}
                  className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900 hover:text-blue-600"
                >
                  <span>Specifications</span>
                  {expandedIndex === index ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </button>
                {expandedIndex === index && (
                  <div className="mt-2 space-y-2">
                    {attenuator.specifications.map((spec, i) => (
                      <p key={i} className="text-sm text-gray-600">
                        {spec}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => handleViewDetails(attenuator)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 
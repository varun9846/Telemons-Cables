import React, { useState, useEffect } from 'react';
import FibreCableDetail from './FibreCableDetail';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from 'next/image';
import { FibreCable } from '@/types/fibre-cable';

interface FibreCablesProps {
  cables: FibreCable[];
}

const FibreCables: React.FC<FibreCablesProps> = ({ cables }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<FibreCable | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProduct]);

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleViewDetails = (product: FibreCable) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return <FibreCableDetail product={selectedProduct} onBack={handleBack} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {cables.map((cable, idx) => (
        <div
          key={cable.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          {cable?.image && (
            <div className="relative h-48 w-full">
              <Image
                src={cable?.image}
                alt={cable.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{cable.title}</h3>
            <p className="text-gray-600 mb-2 text-sm">{cable.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Part: {cable.partNumber}</span>
            </div>
            <div className="mt-auto space-y-2">
              <button
                onClick={() => handleViewDetails(cable)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View Details
              </button>
              {/* <button
                onClick={() => handleToggle(idx)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Quick Specs {expandedIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
              </button> */}
            </div>
            {expandedIndex === idx && (
              <div className="mt-4 text-sm text-gray-700 animate-fade-in">
                <ul className="space-y-1">
                  {cable.specifications.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FibreCables; 
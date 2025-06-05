import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from 'next/image';
import PowerCordDetail from './PowerCordDetail';
import { PowerCord } from '@/types/power-cords';

interface PowerCordListProps {
  cords: PowerCord[];
}

const PowerCordList: React.FC<PowerCordListProps> = ({ cords }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<PowerCord | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProduct]);

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleViewDetails = (product: PowerCord) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return <PowerCordDetail product={selectedProduct} onBack={handleBack} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {cords.map((cord, idx) => (
        <div
          key={cord.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          {cord.indepthImage && (
            <div className="relative h-48 w-full">
              <Image
                src={cord.indepthImage}
                alt={cord.titleHead || 'Power Cord'}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{cord.titleHead}</h3>
            <p className="text-gray-600 mb-2 text-sm">{cord.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                Part: {cord.indepthPartCode}
              </span>
            </div>
            <div className="mt-auto space-y-2">
              <button
                onClick={() => handleViewDetails(cord)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View Details
              </button>
              <button
                onClick={() => handleToggle(idx)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Quick Specs {expandedIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
            {expandedIndex === idx && (
              <div className="mt-4 text-sm text-gray-700 animate-fade-in">
                <ul className="space-y-1">
                  <li><b>Title:</b> {cord.indepthTitle}</li>
                  <li><b>Part Code:</b> {cord.indepthPartCode}</li>
                  <li><b>Key Features:</b> {cord.indepthKeyFeatures}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PowerCordList; 
import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from 'next/image';
import EnterpriseCopperCableDetail from './EnterpriseCopperCableDetail';
import { EnterpriseCopperCable } from '@/types/enterprise-copper-cables';

interface EnterpriseCopperCablesProps {
  cables: EnterpriseCopperCable[];
}

const EnterpriseCopperCables: React.FC<EnterpriseCopperCablesProps> = ({ cables }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<EnterpriseCopperCable | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProduct]);

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleViewDetails = (product: EnterpriseCopperCable) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return <EnterpriseCopperCableDetail product={selectedProduct} onBack={handleBack} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {cables.map((cable, idx) => (
        <div
          key={cable.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-telemons-blue-100"
        >
          {cable?.image && (
            <div className="relative h-48 w-full">
              <Image
                src={cable?.image}
                alt={cable.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg md:text-xl font-bold text-telemons-blue-primary mb-2">{cable.title}</h3>
            <p className="text-gray-600 mb-2 text-sm">{cable.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-telemons-blue-50 text-telemons-blue-primary px-2 py-1 rounded text-xs font-medium">Part: {cable.partNumber}</span>
              {/* <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">{cable.specifications.performanceLevel}</span>
              <span className="bg-telemons-orange-50 text-telemons-orange-primary px-2 py-1 rounded text-xs font-medium">
                {cable.specifications.cableConstruction}
              </span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                {cable.specifications.conductorType}
              </span> */}
            </div>
            <div className="mt-auto space-y-2">
              <button
                onClick={() => handleViewDetails(cable)}
                className="w-full px-4 py-2 bg-telemons-blue-primary text-white rounded-lg hover:bg-telemons-blue-dark transition-colors font-medium"
              >
                View Details
              </button>
            </div>
            {expandedIndex === idx && (
              <div className="mt-4 text-sm text-gray-700 animate-fade-in">
                <ul className="space-y-1">
                  <li><b>Performance Level:</b> {cable.specifications.performanceLevel}</li>
                  <li><b>Cable Construction:</b> {cable.specifications.cableConstruction}</li>
                  <li><b>Conductor Gauge:</b> {cable.specifications.conductorGauge}</li>
                  <li><b>Conductor Type:</b> {cable.specifications.conductorType}</li>
                  <li><b>Overall Length:</b> {cable.specifications.overallLength}</li>
                  <li><b>Euro Class Flame Rating:</b> {cable.specifications.euroClassFlameRating}</li>
                  {cable.specifications.flammabilityRating && cable.specifications.flammabilityRating.length > 0 && (
                    <li><b>Flammability Rating:</b> {cable.specifications.flammabilityRating.join(', ')}</li>
                  )}
                  {cable.specifications.availableColors && cable.specifications.availableColors.length > 0 && (
                    <li><b>Available Colors:</b> {cable.specifications.availableColors.join(', ')}</li>
                  )}
                  {cable.specifications.numberOfPairs && cable.specifications.numberOfPairs.length > 0 && (
                    <li><b>Number of Pairs:</b> {cable.specifications.numberOfPairs.join(', ')}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnterpriseCopperCables; 
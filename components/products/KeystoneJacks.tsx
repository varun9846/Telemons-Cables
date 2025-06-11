import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from 'next/image';
import KeystoneDetail from './KeystoneDetail';
import { KeystoneJack } from '@/types/keystone';

interface KeystoneJacksProps {
  jacks: KeystoneJack[];
}

const KeystoneJacks: React.FC<KeystoneJacksProps> = ({ jacks }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<KeystoneJack | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProduct]);

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleViewDetails = (product: KeystoneJack) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return <KeystoneDetail product={selectedProduct} onBack={handleBack} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {jacks.map((jack, idx) => (
        <div
          key={jack.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          {jack?.image && (
            <div className="relative h-48 w-full">
              <Image
                src={jack?.image}
                alt={jack.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{jack.title}</h3>
            <p className="text-gray-600 mb-2 text-sm">{jack.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Part: {jack.partNumber}</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">{jack.specifications.category}</span>
              <span className={`${jack.specifications.shielded === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} px-2 py-1 rounded text-xs font-medium`}>
                {jack.specifications.shielded === 'Yes' ? 'Shielded' : 'Unshielded'}
              </span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                {jack.specifications.requiresTerminationTool === 'No' ? 'Tool-less' : 'Tool Required'}
              </span>
            </div>
            <div className="mt-auto space-y-2">
              <button
                onClick={() => handleViewDetails(jack)}
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
                  <li><b>Model:</b> {jack.specifications.model}</li>
                  <li><b>Connector Type:</b> {jack.specifications.connectorType}</li>
                  <li><b>Category:</b> {jack.specifications.category}</li>
                  <li><b>Shielded:</b> {jack.specifications.shielded}</li>
                  <li><b>Termination Tool Required:</b> {jack.specifications.requiresTerminationTool}</li>
                  <li><b>Suitable for Round Cable:</b> {jack.specifications.suitableForRoundCable}</li>
                  {jack.specifications.performanceLevel && (
                    <li><b>Performance Level:</b> {jack.specifications.performanceLevel}</li>
                  )}
                  {jack.specifications.cableConstruction && (
                    <li><b>Cable Construction:</b> {jack.specifications.cableConstruction}</li>
                  )}
                  {jack.specifications.conductorGauge && (
                    <li><b>Conductor Gauge:</b> {jack.specifications.conductorGauge}</li>
                  )}
                  {jack.specifications.conductorType && (
                    <li><b>Conductor Type:</b> {jack.specifications.conductorType}</li>
                  )}
                  {jack.specifications.overallLength && (
                    <li><b>Overall Length:</b> {jack.specifications.overallLength}</li>
                  )}
                  {jack.specifications.flammabilityRating && (
                    <li><b>Flammability Rating:</b> {jack.specifications.flammabilityRating}</li>
                  )}
                  {jack.specifications.availableColors && jack.specifications.availableColors.length > 0 && (
                    <li><b>Available Colors:</b> {jack.specifications.availableColors.join(', ')}</li>
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

export default KeystoneJacks; 
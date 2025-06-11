import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from 'next/image';
import { PowerPdu } from '@/types/power-pdu';
import PowerPduDetail from './PowerPduDetail';

interface PowerPduListProps {
  pdus: PowerPdu[];
}

const PowerPduList: React.FC<PowerPduListProps> = ({ pdus }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<PowerPdu | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProduct]);

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleViewDetails = (product: PowerPdu) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return <PowerPduDetail product={selectedProduct} onBack={handleBack} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {pdus.map((pdu, idx) => (
        <div
          key={pdu.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          {pdu.indepthImage && (
            <div className="relative h-48 w-full">
              <Image
                src={pdu.indepthImage}
                alt={pdu.titleHead || 'Power PDU'}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              {pdu.titleHead}
            </h3>
            <p className="text-gray-600 mb-2 text-sm">{pdu.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                Part: {pdu.indepthPartCode}
              </span>
            </div>
            <div className="mt-auto space-y-2">
              <button
                onClick={() => handleViewDetails(pdu)}
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
                  <li><b>Part Code:</b> {pdu.indepthPartCode}</li>
                  <li><b>Description:</b> {pdu.description}</li>
                  {pdu.indepthKeyFeatures && (
                    <li><b>Key Features:</b> {pdu.indepthKeyFeatures}</li>
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

export default PowerPduList; 
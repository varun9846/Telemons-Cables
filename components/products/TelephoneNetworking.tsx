import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from 'next/image';
import TelephoneNetworkingDetail from './TelephoneNetworkingDetail';
import type { TelephoneNetworking as ITelephoneNetworking } from '@/types/telephone-networking';

interface TelephoneNetworkingProps {
  items: ITelephoneNetworking[];
}

const TelephoneNetworking: React.FC<TelephoneNetworkingProps> = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ITelephoneNetworking | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProduct]);

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleViewDetails = (product: ITelephoneNetworking) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return <TelephoneNetworkingDetail product={selectedProduct} onBack={handleBack} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          {item?.image && (
            <div className="relative h-48 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="p-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-2 text-sm">{item.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Part: {item.partNumber}</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">{item.specifications.type}</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">{item.specifications.category}</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">{item.specifications.material}</span>
            </div>
            <div className="mt-auto space-y-2">
              <button
                onClick={() => handleViewDetails(item)}
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
                  <li><b>Model:</b> {item.specifications.model}</li>
                  <li><b>Type:</b> {item.specifications.type}</li>
                  <li><b>Category:</b> {item.specifications.category}</li>
                  <li><b>Material:</b> {item.specifications.material}</li>
                  <li><b>Mounting:</b> {item.specifications.mounting}</li>
                  <li><b>Suitable for Round Cable:</b> {item.specifications.suitableForRoundCable}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TelephoneNetworking; 
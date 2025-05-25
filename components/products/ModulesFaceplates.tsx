import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from 'next/image';
import ModuleFaceplateDetail from './ModuleFaceplateDetail';
import { ModuleFaceplate } from '@/types/module-faceplate';

interface ModulesFaceplatesProps {
  modules: ModuleFaceplate[];
}

const ModulesFaceplates: React.FC<ModulesFaceplatesProps> = ({ modules }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ModuleFaceplate | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProduct]);

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleViewDetails = (product: ModuleFaceplate) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return <ModuleFaceplateDetail product={selectedProduct} onBack={handleBack} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {modules.map((module, idx) => (
        <div
          key={module.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          {module?.image && (
            <div className="relative h-48 w-full">
              <Image
                src={module?.image}
                alt={module.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
            <p className="text-gray-600 mb-2 text-sm">{module.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Part: {module.partNumber}</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">{module.specifications.category}</span>
              <span className={`${module.specifications.shielded === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} px-2 py-1 rounded text-xs font-medium`}>
                {module.specifications.shielded === 'Yes' ? 'Shielded' : 'Unshielded'}
              </span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                {module.specifications.requiresTerminationTool === 'No' ? 'Tool-less' : 'Tool Required'}
              </span>
            </div>
            <div className="mt-auto space-y-2">
              <button
                onClick={() => handleViewDetails(module)}
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
                  <li><b>Model:</b> {module.specifications.model}</li>
                  <li><b>Connector Type:</b> {module.specifications.connectorType}</li>
                  <li><b>Category:</b> {module.specifications.category}</li>
                  <li><b>Shielded:</b> {module.specifications.shielded}</li>
                  <li><b>Termination Tool Required:</b> {module.specifications.requiresTerminationTool}</li>
                  <li><b>Suitable for Round Cable:</b> {module.specifications.suitableForRoundCable}</li>
                  {module.specifications.performanceLevel && (
                    <li><b>Performance Level:</b> {module.specifications.performanceLevel}</li>
                  )}
                  {module.specifications.cableConstruction && (
                    <li><b>Cable Construction:</b> {module.specifications.cableConstruction}</li>
                  )}
                  {module.specifications.conductorGauge && (
                    <li><b>Conductor Gauge:</b> {module.specifications.conductorGauge}</li>
                  )}
                  {module.specifications.conductorType && (
                    <li><b>Conductor Type:</b> {module.specifications.conductorType}</li>
                  )}
                  {module.specifications.overallLength && (
                    <li><b>Overall Length:</b> {module.specifications.overallLength}</li>
                  )}
                  {module.specifications.flammabilityRating && (
                    <li><b>Flammability Rating:</b> {module.specifications.flammabilityRating}</li>
                  )}
                  {module.specifications.availableColors && module.specifications.availableColors.length > 0 && (
                    <li><b>Available Colors:</b> {module.specifications.availableColors.join(', ')}</li>
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

export default ModulesFaceplates; 
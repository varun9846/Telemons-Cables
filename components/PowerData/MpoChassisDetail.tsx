import React from 'react';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';
import { MpoChassis } from '@/types/mpo-chassis';

interface MpoChassisDetailProps {
  product: MpoChassis;
  onBack: () => void;
}

const MpoChassisDetail: React.FC<MpoChassisDetailProps> = ({ product, onBack }) => {
  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <FaArrowLeft />
        <span>Back to List</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-64 md:h-96 w-full">
          {product.indepthImage && (
            <Image
              src={product.indepthImage}
              alt={product.titleHead || 'MPO Chassis'}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {product.titleHead}
          </h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
            <div className="prose max-w-none">
              <p>{product.indepthDescription}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Key Features</h2>
            <div className="prose max-w-none">
              <p>{product.indepthKeyFeatures}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Technical Details</h3>
                <ul className="space-y-2">
                  <li><b>Part Code:</b> {product.indepthPartCode}</li>
                  <li><b>Title:</b> {product.indepthTitle}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Interested in this Product?</h2>
            <p className="text-gray-600 mb-4">
              Contact us for more information about this MPO Chassis or to request a quote.
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MpoChassisDetail; 
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import type { TelephoneNetworking as ITelephoneNetworking } from '@/types/telephone-networking';

interface TelephoneNetworkingDetailProps {
  product: ITelephoneNetworking;
  onBack: () => void;
}

const TelephoneNetworkingDetail: React.FC<TelephoneNetworkingDetailProps> = ({ product, onBack }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <FaArrowLeft /> Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.image && (
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {product.additionalImages && product.additionalImages.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {product.additionalImages.map((img, idx) => (
                <div key={idx} className="relative h-20 w-full rounded-lg overflow-hidden">
                  <Image
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Specifications</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <dl className="grid grid-cols-1 gap-2">
                <div>
                  <dt className="font-medium text-gray-700">Part Number</dt>
                  <dd className="text-gray-600">{product.partNumber}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Model</dt>
                  <dd className="text-gray-600">{product.specifications.model}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Type</dt>
                  <dd className="text-gray-600">{product.specifications.type}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Category</dt>
                  <dd className="text-gray-600">{product.specifications.category}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Material</dt>
                  <dd className="text-gray-600">{product.specifications.material}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Mounting</dt>
                  <dd className="text-gray-600">{product.specifications.mounting}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Suitable for Round Cable</dt>
                  <dd className="text-gray-600">{product.specifications.suitableForRoundCable}</dd>
                </div>
              </dl>
            </div>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Key Features</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {product.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {product.detailedDescription && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Detailed Description</h2>
              <p className="text-gray-600">{product.detailedDescription}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TelephoneNetworkingDetail; 
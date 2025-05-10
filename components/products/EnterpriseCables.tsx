'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'

interface EnterpriseCable {
  id: string
  title: string
  partNumber: string
  description: string
  image: string
  specifications: {
    performanceLevel: string
    cableConstruction: string
    conductorGauge: string
    conductorType: string
    flammabilityRating?: string[]
    euroClassFlameRating?: string
    availableColors: string[]
    numberOfPairs?: string[]
    overallLength?: string
  }
  features: string[]
  detailedDescription: string
  additionalImages: string[]
}

interface EnterpriseCablesProps {
  cables: EnterpriseCable[]
}

const EnterpriseCables: React.FC<EnterpriseCablesProps> = ({ cables }) => {
  const [expandedCable, setExpandedCable] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedCable(expandedCable === id ? null : id)
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 tracking-tight text-center md:text-left">
        Enterprise Data Center Copper Cables
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cables.map((cable) => (
          <div
            key={cable.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            role="region"
            aria-labelledby={`cable-title-${cable.id}`}
          >
            {/* Cable Image */}
            <div className="relative h-56 w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <Image
                src={cable.image}
                alt={cable.title}
                fill
                className="object-contain p-6 transition-transform duration-500 hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={cables.indexOf(cable) < 3} // Prioritize first 3 images for LCP
                placeholder="blur"
                blurDataURL="/placeholder-image.png" // Optional: Add a low-res placeholder
              />
            </div>

            {/* Cable Content */}
            <div className="p-6">
              <h2 id={`cable-title-${cable.id}`} className="text-2xl font-bold text-gray-900 mb-3">
                {cable.title}
              </h2>
              <p className="text-sm text-gray-500 mb-3">Part Number: {cable.partNumber}</p>
              <p className="text-gray-600 text-base leading-relaxed mb-5">{cable.description}</p>

              {/* Specifications */}
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Specifications</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <span className="font-medium w-32">Performance:</span>
                    <span>{cable.specifications.performanceLevel}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium w-32">Construction:</span>
                    <span>{cable.specifications.cableConstruction}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-medium w-32">Conductor:</span>
                    <span>{cable.specifications.conductorGauge} {cable.specifications.conductorType}</span>
                  </li>
                  {cable.specifications.flammabilityRating && (
                    <li className="flex items-center">
                      <span className="font-medium w-32">Flammability:</span>
                      <span>{cable.specifications.flammabilityRating.join(', ')}</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Features */}
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  {cable.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaChevronRight className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expand Button */}
              <button
                onClick={() => toggleExpand(cable.id)}
                className="w-full flex items-center justify-between text-blue-600 hover:text-blue-800 font-semibold py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-expanded={expandedCable === cable.id}
                aria-controls={`expanded-content-${cable.id}`}
              >
                <span>{expandedCable === cable.id ? 'Hide Details' : 'View Details'}</span>
                <FaChevronDown
                  className={`transform transition-transform duration-300 text-blue-600 ${
                    expandedCable === cable.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Expanded Content */}
              {expandedCable === cable.id && (
                <div id={`expanded-content-${cable.id}`} className="mt-5 pt-5 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Detailed Specifications</h3>
                  <ul className="text-sm text-gray-600 space-y-2 mb-5">
                    {Object.entries(cable.specifications).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span>{Array.isArray(value) ? value.join(', ') : value}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mb-3">All Features</h3>
                  <ul className="text-sm text-gray-600 space-y-2 mb-5">
                    {cable.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FaChevronRight className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm text-gray-600 leading-relaxed">{cable.detailedDescription}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EnterpriseCables
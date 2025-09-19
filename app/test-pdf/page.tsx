/**
 * PDF Generation Test Page
 * Demonstrates PDF download functionality across different product types
 */

'use client';

import React, { useState } from 'react';
import { PDFDownloadButton } from '@/components/common/PDFDownloadButton';
import { PDFProductData } from '@/types/pdf-generation';

// Sample product data for testing
const sampleProducts: { [key: string]: PDFProductData } = {
  backbox: {
    id: 'test-backbox-1',
    title: 'Telemons Professional Backbox 35mm Deep',
    partNumber: 'TLM-BB-35-001',
    description: 'High-quality professional backbox designed for structured cabling installations. Features robust construction and easy installation.',
    image: '/images/Backbox-floorboxes/telemons-professional-backbox-35mm-deep.jpg',
    specifications: {
      depth: '35mm',
      material: 'Galvanized Steel',
      mounting: 'Wall Mount',
      type: 'Single Gang',
      model: 'BB-35-PRO',
      suitableForRoundCable: 'Yes'
    },
    features: [
      'Robust galvanized steel construction',
      'Easy wall mounting system',
      'Compatible with standard faceplates',
      'Suitable for round cable installations',
      'Professional grade finish',
      'Long-lasting durability'
    ],
    detailedDescription: 'This professional-grade backbox is engineered for demanding structured cabling environments. The 35mm depth provides ample space for cable management while maintaining a compact profile suitable for modern installations.'
  },
  
  fibreCable: {
    id: 'test-fibre-cable-1',
    title: 'Telemons OM3 Fibre Optic Patch Lead LC-LC Multimode 50/125 DX LS0H Aqua 5m',
    partNumber: 'TLM110-238F05212',
    description: 'This 5m OM3 multimode LC-LC patch lead with an aqua LS0H sheath is designed for high-speed network connectivity.',
    image: '/images/fibre-cables/om3-patch-lead.jpg',
    specifications: [
      'Connector Type: LC-LC',
      'Cable Type: OM3 Multimode',
      'Core/Cladding: 50/125µm',
      'Length: 5 meters',
      'Jacket: LS0H (Low Smoke Zero Halogen)',
      'Color: Aqua',
      'Duplex Configuration: Yes',
      'Polish: UPC (Ultra Physical Contact)'
    ],
    features: [
      'Low-loss ceramic connectors',
      'Bend-insensitive fibers',
      'Reliable performance in data centers',
      'Flexible polarity options',
      'Easy configuration',
      'High-speed data transmission capability'
    ],
    detailedDescription: 'Featuring low-loss ceramic connectors and bend-insensitive fibers, it ensures reliable performance in data centers with flexible polarity options for easy configuration.'
  },
  
  powerPdu: {
    id: 'test-power-pdu-1',
    title: 'Telemons 19" Rack Mount PDU 8-Way IEC C13 with C14 Input',
    partNumber: 'TLM-PDU-19-8C13',
    description: 'Professional 19-inch rack mount power distribution unit with 8 IEC C13 outlets and C14 input connection.',
    specifications: [
      'Outlets: 8x IEC C13',
      'Input: IEC C14',
      'Mounting: 19" Rack Mount',
      'Current Rating: 10A',
      'Voltage: 230V AC',
      'Frequency: 50/60Hz',
      'Material: Steel Construction',
      'Finish: Black Powder Coat'
    ],
    features: [
      'Professional 19" rack mounting',
      '8 individually switched outlets',
      'Robust steel construction',
      'LED power indicators',
      'Surge protection built-in',
      'Space-efficient design',
      'Easy installation',
      'Reliable power distribution'
    ],
    detailedDescription: 'This professional-grade PDU is designed for data center and server room applications, providing reliable power distribution with individual outlet control and monitoring capabilities.'
  }
};

export default function PDFTestPage() {
  const [selectedProduct, setSelectedProduct] = useState<string>('backbox');
  const [showProductData, setShowProductData] = useState<boolean>(false);

  const currentProduct = sampleProducts[selectedProduct];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-telemons-blue-50/30 to-telemons-orange-50/40 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-telemons-blue-primary mb-4">
            PDF Generation Test Suite
          </h1>
          <p className="text-xl text-gray-600">
            Test PDF download functionality across different product categories
          </p>
        </div>

        {/* Product Selector */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-telemons-blue-100">
          <h2 className="text-2xl font-bold text-telemons-blue-primary mb-6">
            Select Product Type
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(sampleProducts).map(([key, product]) => (
              <button
                key={key}
                onClick={() => setSelectedProduct(key)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                  selectedProduct === key
                    ? 'border-telemons-blue-primary bg-telemons-blue-50 text-telemons-blue-primary'
                    : 'border-gray-200 hover:border-telemons-blue-200 hover:bg-gray-50'
                }`}
              >
                <h3 className="font-bold text-lg mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.partNumber}</p>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowProductData(!showProductData)}
              className="px-4 py-2 bg-telemons-blue-100 text-telemons-blue-primary rounded-xl hover:bg-telemons-blue-200 transition-colors duration-300"
            >
              {showProductData ? 'Hide' : 'Show'} Product Data
            </button>
          </div>
        </div>

        {/* Product Data Display */}
        {showProductData && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-telemons-blue-100">
            <h3 className="text-xl font-bold text-telemons-blue-primary mb-4">
              Product Data Structure
            </h3>
            <pre className="bg-gray-100 p-4 rounded-xl overflow-auto text-sm">
              {JSON.stringify(currentProduct, null, 2)}
            </pre>
          </div>
        )}

        {/* PDF Generation Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-telemons-blue-100">
          <h2 className="text-2xl font-bold text-telemons-blue-primary mb-6">
            PDF Generation Test
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Product Preview */}
            <div className="space-y-6">
              <div className="border border-telemons-blue-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-telemons-blue-primary mb-4">
                  Selected Product
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Title:</h4>
                    <p className="text-gray-600">{currentProduct.title}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700">Part Number:</h4>
                    <p className="text-gray-600">{currentProduct.partNumber}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700">Description:</h4>
                    <p className="text-gray-600">{currentProduct.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700">Features:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {currentProduct.features?.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                      {currentProduct.features && currentProduct.features.length > 3 && (
                        <li className="text-gray-400">... and {currentProduct.features.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* PDF Generation Controls */}
            <div className="space-y-6">
              <div className="border border-telemons-orange-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-telemons-orange-primary mb-4">
                  PDF Generation Options
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Standard PDF</h4>
                    <PDFDownloadButton 
                      product={currentProduct}
                      variant="secondary"
                      className="w-full"
                      showError={true}
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Minimal PDF (No Images)</h4>
                    <PDFDownloadButton 
                      product={currentProduct}
                      variant="secondary"
                      className="w-full"
                      options={{
                        includeImages: false,
                        includeSpecifications: true,
                        includeFeatures: true
                      }}
                      showError={true}
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Features Only</h4>
                    <PDFDownloadButton 
                      product={currentProduct}
                      variant="secondary"
                      className="w-full"
                      options={{
                        includeImages: false,
                        includeSpecifications: false,
                        includeFeatures: true
                      }}
                      showError={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="mt-8 p-6 bg-telemons-blue-50 rounded-2xl border border-telemons-blue-200">
            <h3 className="text-lg font-bold text-telemons-blue-primary mb-3">
              Test Instructions
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>• Select different product types to test various data structures</p>
              <p>• Try different PDF generation options to see how they affect the output</p>
              <p>• Check that PDFs include proper branding, formatting, and product information</p>
              <p>• Verify that error handling works correctly for invalid data</p>
              <p>• Test on different devices and browsers for compatibility</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

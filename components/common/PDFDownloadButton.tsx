/**
 * Reusable PDF Download Button Component
 * Provides consistent PDF download functionality across all product detail pages
 */

import React from 'react';
import { FaDownload, FaSpinner } from 'react-icons/fa';
import { usePDFDownload } from '@/hooks/usePDFDownload';
import { convertToPDFData } from '@/lib/utils/pdfDataConverter';
import { PDFGenerationOptions } from '@/types/pdf-generation';

interface PDFDownloadButtonProps {
  product: any; // Accept any product type
  className?: string;
  options?: Partial<PDFGenerationOptions>;
  variant?: 'primary' | 'secondary';
  showError?: boolean;
}

/**
 * PDF Download Button Component
 * Handles PDF generation and download for any product type
 */
export function PDFDownloadButton({ 
  product, 
  className = "",
  options = {},
  variant = 'secondary',
  showError = true
}: PDFDownloadButtonProps) {
  const { isGenerating, error, downloadPDF, clearError } = usePDFDownload();

  /**
   * Handle PDF download click
   */
  const handleDownload = async () => {
    try {
      clearError();
      
      // Convert product to standard PDF format
      const pdfData = convertToPDFData(product);
      
      // Default options with overrides
      const finalOptions = {
        includeImages: true,
        includeSpecifications: true,
        includeFeatures: true,
        includeBranding: true,
        ...options
      };

      await downloadPDF(pdfData, finalOptions);
    } catch (err) {
      console.error('PDF download failed:', err);
    }
  };

  // Button styling based on variant
  const getButtonClasses = () => {
    const baseClasses = "flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
    
    if (variant === 'primary') {
      return `${baseClasses} bg-gradient-to-r from-telemons-blue-primary to-telemons-blue-dark text-white hover:from-telemons-blue-dark hover:to-telemons-blue-primary transform hover:scale-105 shadow-lg hover:shadow-xl`;
    }
    
    // Secondary variant (default)
    return `${baseClasses} bg-white text-gray-700 border-2 border-telemons-blue-200 hover:border-telemons-blue-primary hover:text-telemons-blue-primary`;
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`${getButtonClasses()} ${className}`}
        title="Download product specifications as PDF"
      >
        {isGenerating ? (
          <>
            <FaSpinner className="animate-spin" />
            <span>Generating PDF...</span>
          </>
        ) : (
          <>
            <FaDownload />
            <span>Download Specs</span>
          </>
        )}
      </button>

      {/* Error Display */}
      {showError && error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
            <span className="text-red-700 font-medium text-sm">PDF Generation Error</span>
          </div>
          <p className="text-red-600 text-xs mt-1">{error}</p>
          <button 
            onClick={clearError}
            className="mt-2 text-red-500 hover:text-red-700 text-xs font-medium"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

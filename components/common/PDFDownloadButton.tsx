/**
 * Enhanced Reusable PDF Download Button Component
 * Provides consistent PDF download functionality with improved UI/UX
 */

import React from 'react';
import { FaDownload, FaSpinner, FaFilePdf } from 'react-icons/fa';
import { usePDFDownload } from '@/hooks/usePDFDownload';
import { convertToPDFData } from '@/lib/utils/pdfDataConverter';
import { PDFGenerationOptions } from '@/types/pdf-generation';

interface PDFDownloadButtonProps {
  product: any;
  className?: string;
  options?: Partial<PDFGenerationOptions>;
  variant?: 'primary' | 'secondary' | 'elevated';
  showError?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Enhanced PDF Download Button Component
 * Handles PDF generation and download with modern styling
 */
export function PDFDownloadButton({ 
  product, 
  className = "",
  options = {},
  variant = 'elevated',
  showError = true,
  size = 'lg'
}: PDFDownloadButtonProps) {
  const { isGenerating, error, downloadPDF, clearError } = usePDFDownload();

  /**
   * Handle PDF download click
   */
  const handleDownload = async () => {
    try {
      clearError();
      
      const pdfData = convertToPDFData(product);
      
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

  // Size configurations
  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2.5",
    lg: "px-8 py-4 text-lg gap-3"
  };

  // Button styling based on variant
  const getButtonClasses = () => {
    const baseClasses = `
      inline-flex items-center justify-center font-semibold
      rounded-2xl transition-all duration-300 
      disabled:opacity-50 disabled:cursor-not-allowed
      relative overflow-hidden group
      ${sizeClasses[size]}
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-telemons-blue-300
    `;
    
    if (variant === 'primary') {
      return `${baseClasses} 
        bg-gradient-to-r from-telemons-blue-primary via-telemons-blue-600 to-telemons-orange-primary
        text-white shadow-[0_12px_35px_-12px_rgba(29,78,216,0.55)]
        hover:shadow-[0_16px_40px_-18px_rgba(249,115,22,0.55)]
        hover:from-telemons-blue-700 hover:via-telemons-blue-700 hover:to-telemons-orange-500
        transform hover:-translate-y-1 active:translate-y-0
        border border-telemons-blue-500`;
    }
    
    if (variant === 'elevated') {
      return `${baseClasses}
        bg-white/80 text-gray-800 
        shadow-[0_10px_30px_-15px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_40px_-18px_rgba(59,130,246,0.35)]
        border border-gray-200/80 hover:border-telemons-blue-200
        transform hover:-translate-y-1 active:translate-y-0
        backdrop-blur-md`;
    }
    
    // Secondary variant
    return `${baseClasses} 
      bg-telemons-blue-50 text-telemons-blue-primary 
      border border-telemons-blue-200/70 
      hover:bg-white hover:border-telemons-blue-300
      shadow-[0_6px_20px_-12px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_30px_-14px_rgba(37,99,235,0.35)]`;
  };

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`${getButtonClasses()} ${className}`}
        title="Download product specifications as PDF"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
        
        {/* Button content */}
        <div className="relative flex items-center gap-3">
          {isGenerating ? (
            <>
              <FaSpinner className="animate-spin text-xl" />
              <span className="font-semibold">Generating PDF...</span>
            </>
          ) : (
            <>
              <div className="relative">
                <FaFilePdf className="text-xl text-red-500 group-hover:scale-110 transition-transform duration-300" />
                <FaDownload className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full p-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
              </div>
              <span className="font-semibold whitespace-nowrap">Download PDF Specs</span>
            </>
          )}
        </div>
      </button>

      {/* Success indicator (optional - shows briefly after download) */}
      {!error && !isGenerating && (
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <FaFilePdf className="text-red-400" />
            Click to download product specifications
          </p>
        </div>
      )}

      {/* Enhanced Error Display */}
      {showError && error && (
        <div className="mt-4 p-4 bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 rounded-lg shadow-sm animate-shake">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-800 font-semibold text-sm">PDF Generation Failed</span>
              </div>
              <p className="text-red-700 text-sm leading-relaxed">{error}</p>
            </div>
            <button 
              onClick={clearError}
              className="ml-3 text-red-400 hover:text-red-600 transition-colors p-1 hover:bg-red-200 rounded"
              aria-label="Dismiss error"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
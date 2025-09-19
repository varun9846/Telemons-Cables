/**
 * Custom React Hook for PDF Download Functionality
 * Provides loading states, error handling, and download management
 */

import { useState, useCallback } from 'react';
import { pdfService } from '@/lib/services/pdfGenerationService';
import { PDFProductData, PDFGenerationOptions } from '@/types/pdf-generation';

interface UsePDFDownloadReturn {
  isGenerating: boolean;
  error: string | null;
  downloadPDF: (productData: PDFProductData, options?: Partial<PDFGenerationOptions>) => Promise<void>;
  clearError: () => void;
}

/**
 * Hook for managing PDF download functionality
 * @returns Object with download function, loading state, and error handling
 */
export function usePDFDownload(): UsePDFDownloadReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Download PDF for a product
   * @param productData - Product data to generate PDF for
   * @param options - PDF generation options
   */
  const downloadPDF = useCallback(async (
    productData: PDFProductData,
    options?: Partial<PDFGenerationOptions>
  ) => {
    try {
      setIsGenerating(true);
      setError(null);

      // Validate required product data
      if (!productData.title || !productData.description) {
        throw new Error('Product title and description are required for PDF generation');
      }

      // Generate PDF using the service
      const result = await pdfService.generateProductPDF(productData, options);

      if (!result.success || !result.blob || !result.fileName) {
        throw new Error(result.error || 'Failed to generate PDF');
      }

      // Trigger download
      pdfService.downloadPDF(result.blob, result.fileName);

      // Optional: Show success notification
      console.log(`PDF downloaded successfully: ${result.fileName}`);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('PDF Download Error:', err);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  /**
   * Clear any existing error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isGenerating,
    error,
    downloadPDF,
    clearError
  };
}

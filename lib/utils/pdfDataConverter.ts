/**
 * PDF Data Converter Utilities
 * Helper functions to convert different product types to PDFProductData format
 */

import { PDFProductData } from '@/types/pdf-generation';

/**
 * Convert any product object to PDFProductData format
 * Handles different product structures consistently
 */
export function convertToPDFData(product: any): PDFProductData {
  return {
    id: product.id?.toString() || '',
    title: product.title || product.titleHead || 'Untitled Product',
    partNumber: product.partNumber || product.indepthPartCode || undefined,
    description: product.description || 'No description available',
    image: product.image || product.indepthImage || undefined,
    specifications: product.specifications || {},
    features: product.features || [],
    detailedDescription: product.detailedDescription || product.indepthDescription || undefined,
    additionalImages: product.additionalImages || []
  };
}

/**
 * Convert Supabase database record to PDFProductData format
 * Handles the standardized database schema fields
 */
export function convertDatabaseRecordToPDFData(record: any): PDFProductData {
  // Extract features from indepthKeyFeatures if it's a string
  let features: string[] = [];
  if (record.indepthKeyFeatures) {
    if (typeof record.indepthKeyFeatures === 'string') {
      features = record.indepthKeyFeatures
        .split(/[\n,]/)
        .map((feature: string) => feature.trim())
        .filter((feature: string) => feature.length > 0);
    } else if (Array.isArray(record.indepthKeyFeatures)) {
      features = record.indepthKeyFeatures;
    }
  }

  return {
    id: record.id?.toString() || '',
    title: record.titleHead || record.title || 'Untitled Product',
    partNumber: record.indepthPartCode || record.partNumber || undefined,
    description: record.description || 'No description available',
    image: record.indepthImage || record.image || undefined,
    specifications: features.length > 0 ? features : {}, // Use features as specs if no explicit specs
    features: features,
    detailedDescription: record.indepthDescription || record.detailedDescription || undefined,
    additionalImages: record.indepthImage ? [record.indepthImage] : []
  };
}

/**
 * Validate PDFProductData before generation
 * Ensures minimum required data is present
 */
export function validatePDFData(data: PDFProductData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Product title is required');
  }

  if (!data.description || data.description.trim().length === 0) {
    errors.push('Product description is required');
  }

  if (!data.id || data.id.trim().length === 0) {
    errors.push('Product ID is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

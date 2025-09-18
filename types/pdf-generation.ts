/**
 * TypeScript interfaces for PDF generation functionality
 * Provides type safety for product data and PDF generation parameters
 */

// Base interface for all product types used in PDF generation
export interface PDFProductData {
  id: string;
  title: string;
  partNumber?: string;
  description: string;
  image?: string;
  specifications?: any; // Can be array or object depending on product type
  features?: string[];
  detailedDescription?: string;
  additionalImages?: string[];
}

// PDF generation options and configuration
export interface PDFGenerationOptions {
  includeImages?: boolean;
  includeSpecifications?: boolean;
  includeFeatures?: boolean;
  includeBranding?: boolean;
  pageFormat?: 'A4' | 'letter';
  orientation?: 'portrait' | 'landscape';
}

// PDF generation result interface
export interface PDFGenerationResult {
  success: boolean;
  fileName?: string;
  error?: string;
  blob?: Blob;
}

// Company branding information for PDF headers
export interface PDFBrandingInfo {
  companyName: string;
  logo?: string;
  website?: string;
  contactInfo?: string;
  address?: string;
}

// PDF section configuration
export interface PDFSectionConfig {
  header: boolean;
  productInfo: boolean;
  specifications: boolean;
  features: boolean;
  images: boolean;
  footer: boolean;
}

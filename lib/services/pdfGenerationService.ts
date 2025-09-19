/**
 * PDF Generation Service
 * A comprehensive, reusable service for generating product specification PDFs
 * Supports all product categories with consistent branding and layout
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  PDFProductData, 
  PDFGenerationOptions, 
  PDFGenerationResult, 
  PDFBrandingInfo 
} from '@/types/pdf-generation';

export class PDFGenerationService {
  private readonly defaultOptions: PDFGenerationOptions = {
    includeImages: true,
    includeSpecifications: true,
    includeFeatures: true,
    includeBranding: true,
    pageFormat: 'A4',
    orientation: 'portrait'
  };

  private readonly brandingInfo: PDFBrandingInfo = {
    companyName: 'Telemons',
    website: 'www.telemons.com',
    contactInfo: 'info@telemons.com',
    address: 'Professional Network Solutions Provider'
  };

  /**
   * Main method to generate PDF for any product type
   * @param productData - Product data to include in PDF
   * @param options - PDF generation options
   * @returns Promise<PDFGenerationResult>
   */
  public async generateProductPDF(
    productData: PDFProductData,
    options: Partial<PDFGenerationOptions> = {}
  ): Promise<PDFGenerationResult> {
    try {
      const finalOptions = { ...this.defaultOptions, ...options };
      const doc = new jsPDF({
        orientation: finalOptions.orientation,
        unit: 'mm',
        format: finalOptions.pageFormat
      });

      // Add branding header
      if (finalOptions.includeBranding) {
        this.addHeader(doc, productData);
      }

      // Add product information
      this.addProductInfo(doc, productData);

      // Add product image if available and requested
      if (finalOptions.includeImages && productData.image) {
        await this.addProductImage(doc, productData.image);
      }

      // Add specifications section
      if (finalOptions.includeSpecifications && productData.specifications) {
        this.addSpecifications(doc, productData);
      }

      // Add features section
      if (finalOptions.includeFeatures && productData.features) {
        this.addFeatures(doc, productData);
      }

      // Add footer
      this.addFooter(doc);

      // Generate blob and prepare result
      const pdfBlob = doc.output('blob');
      const fileName = `${this.sanitizeFileName(productData.title)}_specifications.pdf`;

      return {
        success: true,
        fileName,
        blob: pdfBlob
      };

    } catch (error) {
      console.error('PDF Generation Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Add company header with branding
   */
  private addHeader(doc: jsPDF, productData: PDFProductData): void {
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Company name and logo area
    doc.setFontSize(24);
    doc.setTextColor(41, 128, 185); // Telemons blue
    doc.text(this.brandingInfo.companyName, 20, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(this.brandingInfo.address, 20, 32);
    
    // Product title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('Product Specifications', 20, 45);
    
    // Add horizontal line
    doc.setDrawColor(41, 128, 185);
    doc.setLineWidth(0.5);
    doc.line(20, 50, pageWidth - 20, 50);
    
    // Set starting Y position for content
    this.currentY = 60;
  }

  private currentY = 60; // Track vertical position

  /**
   * Add main product information section
   */
  private addProductInfo(doc: jsPDF, productData: PDFProductData): void {
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Product title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(productData.title, 20, this.currentY);
    this.currentY += 10;
    
    // Part number if available
    if (productData.partNumber) {
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Part Number: ${productData.partNumber}`, 20, this.currentY);
      this.currentY += 8;
    }
    
    // Product description
    if (productData.description) {
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      const splitDescription = doc.splitTextToSize(productData.description, pageWidth - 40);
      doc.text(splitDescription, 20, this.currentY);
      this.currentY += splitDescription.length * 5 + 10;
    }
    
    // Detailed description if different from main description
    if (productData.detailedDescription && 
        productData.detailedDescription !== productData.description) {
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      const splitDetailed = doc.splitTextToSize(productData.detailedDescription, pageWidth - 40);
      doc.text(splitDetailed, 20, this.currentY);
      this.currentY += splitDetailed.length * 5 + 15;
    }
  }

  /**
   * Add product image to PDF
   */
  private async addProductImage(doc: jsPDF, imageUrl: string): Promise<void> {
    try {
      // Create a temporary image element
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl.startsWith('http') ? imageUrl : `${window.location.origin}${imageUrl}`;
      });
      
      // Create canvas and draw image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const maxWidth = 120;
        const maxHeight = 80;
        let { width, height } = img;
        
        // Calculate scaled dimensions
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 and add to PDF
        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        doc.addImage(imgData, 'JPEG', 20, this.currentY, width, height);
        this.currentY += height + 15;
      }
    } catch (error) {
      console.warn('Failed to load product image:', error);
      // Continue without image
    }
  }

  /**
   * Add specifications section
   */
  private addSpecifications(doc: jsPDF, productData: PDFProductData): void {
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Check if we need a new page
    if (this.currentY > 250) {
      doc.addPage();
      this.currentY = 20;
    }
    
    // Section title
    doc.setFontSize(14);
    doc.setTextColor(41, 128, 185);
    doc.text('Technical Specifications', 20, this.currentY);
    this.currentY += 10;
    
    // Handle different specification formats
    if (Array.isArray(productData.specifications)) {
      // Array format
      productData.specifications.forEach((spec: string) => {
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const splitSpec = doc.splitTextToSize(`• ${spec}`, pageWidth - 40);
        doc.text(splitSpec, 25, this.currentY);
        this.currentY += splitSpec.length * 4 + 2;
      });
    } else if (typeof productData.specifications === 'object') {
      // Object format
      Object.entries(productData.specifications).forEach(([key, value]) => {
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`${key}:`, 25, this.currentY);
        doc.setTextColor(60, 60, 60);
        const valueText = Array.isArray(value) ? value.join(', ') : String(value);
        const splitValue = doc.splitTextToSize(valueText, pageWidth - 80);
        doc.text(splitValue, 70, this.currentY);
        this.currentY += Math.max(splitValue.length * 4, 6);
      });
    }
    
    this.currentY += 10;
  }

  /**
   * Add features section
   */
  private addFeatures(doc: jsPDF, productData: PDFProductData): void {
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Check if we need a new page
    if (this.currentY > 250) {
      doc.addPage();
      this.currentY = 20;
    }
    
    // Section title
    doc.setFontSize(14);
    doc.setTextColor(41, 128, 185);
    doc.text('Key Features', 20, this.currentY);
    this.currentY += 10;
    
    // Add features
    productData.features!.forEach((feature: string) => {
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const splitFeature = doc.splitTextToSize(`• ${feature}`, pageWidth - 40);
      doc.text(splitFeature, 25, this.currentY);
      this.currentY += splitFeature.length * 4 + 2;
    });
    
    this.currentY += 10;
  }

  /**
   * Add footer with company information
   */
  private addFooter(doc: jsPDF): void {
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add horizontal line
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(20, pageHeight - 25, pageWidth - 20, pageHeight - 25);
    
    // Company information
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(this.brandingInfo.companyName, 20, pageHeight - 18);
    doc.text(this.brandingInfo.website, 20, pageHeight - 13);
    doc.text(this.brandingInfo.contactInfo, 20, pageHeight - 8);
    
    // Generation timestamp
    const timestamp = new Date().toLocaleDateString();
    doc.text(`Generated: ${timestamp}`, pageWidth - 60, pageHeight - 8);
  }

  /**
   * Sanitize filename for safe file download
   */
  private sanitizeFileName(fileName: string): string {
    return fileName
      .replace(/[^a-z0-9]/gi, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '')
      .toLowerCase();
  }

  /**
   * Trigger file download in browser
   */
  public downloadPDF(blob: Blob, fileName: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}

// Export singleton instance
export const pdfService = new PDFGenerationService();

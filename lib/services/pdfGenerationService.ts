/**
 * Enhanced PDF Generation Service
 * Technical specification sheet design inspired by industry standards
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

  // Professional color palette - refined to match technical spec sheets
  private readonly colors = {
    primary: { r: 0, g: 84, b: 159 },          // Deep professional blue
    accent: { r: 0, g: 119, b: 200 },          // Brighter blue for highlights
    headerBg: { r: 41, g: 128, b: 185 },       // Header background
    lightGray: { r: 242, g: 242, b: 242 },     // Light background
    mediumGray: { r: 217, g: 217, b: 217 },    // Borders
    darkGray: { r: 89, g: 89, b: 89 },         // Dark text
    text: { r: 33, g: 33, b: 33 },             // Primary text
    textLight: { r: 102, g: 102, b: 102 },     // Secondary text
    white: { r: 255, g: 255, b: 255 }
  };

  private currentY = 60;
  private pageHeight = 297;
  private pageWidth = 210;
  private margin = 15;
  private contentWidth = 180;

  /**
   * Main method to generate PDF for any product type
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

      this.pageHeight = doc.internal.pageSize.getHeight();
      this.pageWidth = doc.internal.pageSize.getWidth();
      this.contentWidth = this.pageWidth - (2 * this.margin);

      // Add header with company branding
      if (finalOptions.includeBranding) {
        this.addTechnicalHeader(doc, productData);
      }

      // Add product title and part number prominently
      this.addProductHeader(doc, productData);

      // Add product image (smaller, positioned strategically)
      if (finalOptions.includeImages && productData.image) {
        await this.addCompactProductImage(doc, productData.image);
      }

      // Add product classification section
      this.addProductClassification(doc, productData);

      // Add general specifications
      if (productData.description || productData.detailedDescription) {
        this.addGeneralSpecifications(doc, productData);
      }

      // Add technical specifications table
      if (finalOptions.includeSpecifications && productData.specifications) {
        this.addTechnicalSpecifications(doc, productData);
      }

      // Add features section
      if (finalOptions.includeFeatures && productData.features) {
        this.addFeaturesSection(doc, productData);
      }

      // Add footer with copyright and contact info
      this.addTechnicalFooter(doc);

      // Generate blob and prepare result
      const pdfBlob = doc.output('blob');
      const fileName = `${this.sanitizeFileName(productData.title)}_datasheet.pdf`;

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
   * Add technical header similar to CommScope style
   */
  private addTechnicalHeader(doc: jsPDF, productData: PDFProductData): void {
    // Top border line
    doc.setDrawColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b);
    doc.setLineWidth(2);
    doc.line(0, 8, this.pageWidth, 8);

    // Company name - large and bold
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b);
    doc.text(this.brandingInfo.companyName, this.margin, 20);
    
    // Tagline - smaller
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(this.colors.textLight.r, this.colors.textLight.g, this.colors.textLight.b);
    doc.text(this.brandingInfo.address, this.margin, 26);
    
    // Separator line
    doc.setDrawColor(this.colors.mediumGray.r, this.colors.mediumGray.g, this.colors.mediumGray.b);
    doc.setLineWidth(0.5);
    doc.line(this.margin, 30, this.pageWidth - this.margin, 30);
    
    this.currentY = 38;
  }

  /**
   * Add product header with part number
   */
  private addProductHeader(doc: jsPDF, productData: PDFProductData): void {
    // Part number - prominent at top
    if (productData.partNumber) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
      doc.text(productData.partNumber, this.margin, this.currentY);
      this.currentY += 10;
    }

    // Product title - bold and clear
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
    const titleLines = doc.splitTextToSize(productData.title, this.contentWidth);
    doc.text(titleLines, this.margin, this.currentY);
    
    this.currentY += (titleLines.length * 6) + 8;
  }

  /**
   * Add compact product image (smaller size with enhanced quality)
   */
  private async addCompactProductImage(doc: jsPDF, imageUrl: string): Promise<void> {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Define target size for better quality
        const targetWidth = 50;  // mm in PDF
        const targetHeight = 50; // mm in PDF
        const dpi = 300; // High resolution for print quality
        const mmToPixels = dpi / 25.4; // Convert mm to pixels at 300 DPI
        
        // Calculate canvas size at high resolution
        const canvasWidth = Math.round(targetWidth * mmToPixels);
        const canvasHeight = Math.round(targetHeight * mmToPixels);
        
        // Calculate scaling to fit image within bounds while maintaining aspect ratio
        const imgAspect = img.width / img.height;
        let drawWidth = canvasWidth;
        let drawHeight = canvasHeight;
        
        if (imgAspect > 1) {
          // Wider image
          drawHeight = drawWidth / imgAspect;
        } else {
          // Taller image
          drawWidth = drawHeight * imgAspect;
        }
        
        // Center the image on canvas
        const offsetX = (canvasWidth - drawWidth) / 2;
        const offsetY = (canvasHeight - drawHeight) / 2;
        
        // Set canvas to high resolution
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Fill background with white
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        // Draw image at high resolution
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        
        this.checkPageBreak(doc, targetHeight + 15);
        
        // Center the image on the page
        const imgX = (this.pageWidth - targetWidth) / 2;
        
        // Add white background box with shadow effect
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(imgX - 3, this.currentY - 3, targetWidth + 6, targetHeight + 6, 1, 1, 'F');
        
        // Add subtle border
        doc.setDrawColor(this.colors.mediumGray.r, this.colors.mediumGray.g, this.colors.mediumGray.b);
        doc.setLineWidth(0.3);
        doc.roundedRect(imgX - 3, this.currentY - 3, targetWidth + 6, targetHeight + 6, 1, 1, 'S');
        
        // Convert to high-quality JPEG
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        doc.addImage(imgData, 'JPEG', imgX, this.currentY, targetWidth, targetHeight);
        
        this.currentY += targetHeight + 15;
      }
    } catch (error) {
      console.warn('Failed to load product image:', error);
      // Add placeholder text if image fails
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(this.colors.textLight.r, this.colors.textLight.g, this.colors.textLight.b);
      doc.text('[Product Image Not Available]', this.pageWidth / 2, this.currentY, { align: 'center' });
      this.currentY += 10;
    }
  }

  /**
   * Add product classification section
   */
  private addProductClassification(doc: jsPDF, productData: PDFProductData): void {
    this.checkPageBreak(doc, 30);
    
    // Section header with background
    doc.setFillColor(this.colors.lightGray.r, this.colors.lightGray.g, this.colors.lightGray.b);
    doc.rect(this.margin, this.currentY - 2, this.contentWidth, 8, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
    doc.text('Product Classification', this.margin + 2, this.currentY + 3);
    
    this.currentY += 12;
    
    // Classification items in two columns
    const items = [
      { label: 'Product Type', value: 'Twisted Pair Cable' },
      { label: 'Product Brand', value: productData.title || 'Standard' },
      { label: 'Portfolio', value: 'SYSTIMAX®' }
    ];
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(this.colors.darkGray.r, this.colors.darkGray.g, this.colors.darkGray.b);
    
    items.forEach(item => {
      doc.text(item.label, this.margin, this.currentY);
      doc.setFont('helvetica', 'normal');
      doc.text(item.value, this.margin + 45, this.currentY);
      doc.setFont('helvetica', 'bold');
      this.currentY += 5;
    });
    
    this.currentY += 8;
  }

  /**
   * Add general specifications section
   */
  private addGeneralSpecifications(doc: jsPDF, productData: PDFProductData): void {
    this.checkPageBreak(doc, 30);
    
    // Section header
    doc.setFillColor(this.colors.lightGray.r, this.colors.lightGray.g, this.colors.lightGray.b);
    doc.rect(this.margin, this.currentY - 2, this.contentWidth, 8, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
    doc.text('General Specifications', this.margin + 2, this.currentY + 3);
    
    this.currentY += 12;
    
    // Description
    const description = productData.detailedDescription || productData.description || '';
    if (description) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
      const descLines = doc.splitTextToSize(description, this.contentWidth - 4);
      doc.text(descLines, this.margin, this.currentY);
      this.currentY += descLines.length * 4.5 + 8;
    }
  }

  /**
   * Add technical specifications in table format
   */
  private addTechnicalSpecifications(doc: jsPDF, productData: PDFProductData): void {
    this.checkPageBreak(doc, 40);
    
    // Section header
    doc.setFillColor(this.colors.lightGray.r, this.colors.lightGray.g, this.colors.lightGray.b);
    doc.rect(this.margin, this.currentY - 2, this.contentWidth, 8, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
    doc.text('Technical Specifications', this.margin + 2, this.currentY + 3);
    
    this.currentY += 12;
    
    const labelWidth = 80;
    const valueX = this.margin + labelWidth;
    
    if (Array.isArray(productData.specifications)) {
      // Array format
      productData.specifications.forEach((spec: string) => {
        this.checkPageBreak(doc, 10);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
        
        // Draw separator line
        doc.setDrawColor(this.colors.lightGray.r, this.colors.lightGray.g, this.colors.lightGray.b);
        doc.setLineWidth(0.2);
        doc.line(this.margin, this.currentY + 3, this.pageWidth - this.margin, this.currentY + 3);
        
        const specLines = doc.splitTextToSize(spec, this.contentWidth - 4);
        doc.text(specLines, this.margin + 2, this.currentY);
        this.currentY += Math.max(specLines.length * 4.5, 6);
      });
    } else if (typeof productData.specifications === 'object') {
      // Object format - two-column table
      Object.entries(productData.specifications).forEach(([key, value]) => {
        this.checkPageBreak(doc, 10);
        
        // Separator line
        doc.setDrawColor(this.colors.lightGray.r, this.colors.lightGray.g, this.colors.lightGray.b);
        doc.setLineWidth(0.2);
        doc.line(this.margin, this.currentY + 3, this.pageWidth - this.margin, this.currentY + 3);
        
        // Label (left column)
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(this.colors.darkGray.r, this.colors.darkGray.g, this.colors.darkGray.b);
        const keyLines = doc.splitTextToSize(key, labelWidth - 4);
        doc.text(keyLines, this.margin + 2, this.currentY);
        
        // Value (right column)
        doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
        const valueText = Array.isArray(value) ? value.join(', ') : String(value);
        const valueLines = doc.splitTextToSize(valueText, this.contentWidth - labelWidth - 4);
        doc.text(valueLines, valueX + 2, this.currentY);
        
        this.currentY += Math.max(keyLines.length * 4.5, valueLines.length * 4.5, 6);
      });
    }
    
    // Final bottom border
    doc.setDrawColor(this.colors.lightGray.r, this.colors.lightGray.g, this.colors.lightGray.b);
    doc.setLineWidth(0.2);
    doc.line(this.margin, this.currentY + 2, this.pageWidth - this.margin, this.currentY + 2);
    
    this.currentY += 10;
  }

  /**
   * Add features section
   */
  private addFeaturesSection(doc: jsPDF, productData: PDFProductData): void {
    this.checkPageBreak(doc, 40);
    
    // Section header
    doc.setFillColor(this.colors.lightGray.r, this.colors.lightGray.g, this.colors.lightGray.b);
    doc.rect(this.margin, this.currentY - 2, this.contentWidth, 8, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
    doc.text('Key Features & Benefits', this.margin + 2, this.currentY + 3);
    
    this.currentY += 12;
    
    productData.features!.forEach((feature: string) => {
      this.checkPageBreak(doc, 8);
      
      // Simple bullet point
      doc.setFillColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b);
      doc.circle(this.margin + 2, this.currentY - 1.5, 0.8, 'F');
      
      // Feature text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
      const featureLines = doc.splitTextToSize(feature, this.contentWidth - 8);
      doc.text(featureLines, this.margin + 6, this.currentY);
      
      this.currentY += Math.max(featureLines.length * 4.5, 6);
    });
    
    this.currentY += 8;
  }

  /**
   * Add technical footer with copyright and page info
   */
  private addTechnicalFooter(doc: jsPDF): void {
    const footerY = this.pageHeight - 25;
    
    // Top border line
    doc.setDrawColor(this.colors.mediumGray.r, this.colors.mediumGray.g, this.colors.mediumGray.b);
    doc.setLineWidth(0.5);
    doc.line(this.margin, footerY, this.pageWidth - this.margin, footerY);
    
    // Copyright notice
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(this.colors.textLight.r, this.colors.textLight.g, this.colors.textLight.b);
    const year = new Date().getFullYear();
    const copyrightText = `©${year} ${this.brandingInfo.companyName}. All rights reserved. All trademarks identified by ® or ™ are registered trademarks.`;
    const copyrightLines = doc.splitTextToSize(copyrightText, this.contentWidth);
    doc.text(copyrightLines, this.margin, footerY + 4);
    
    // Contact info
    doc.text(`${this.brandingInfo.website} | ${this.brandingInfo.contactInfo}`, this.margin, footerY + 10);
    
    // Generation date and page number
    const timestamp = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    doc.setFont('helvetica', 'italic');
    doc.text(`Revised: ${timestamp}`, this.pageWidth - this.margin - 35, footerY + 10);
    
    // Page number
    doc.setFont('helvetica', 'normal');
    const pageText = `Page 1 of 1`;
    doc.text(pageText, this.pageWidth - this.margin - 15, footerY + 4);
    
    // Bottom border line
    doc.setDrawColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b);
    doc.setLineWidth(2);
    doc.line(0, this.pageHeight - 8, this.pageWidth, this.pageHeight - 8);
  }

  /**
   * Check if we need a page break
   */
  private checkPageBreak(doc: jsPDF, spaceNeeded: number): void {
    if (this.currentY + spaceNeeded > this.pageHeight - 35) {
      doc.addPage();
      this.currentY = this.margin + 10;
    }
  }

  /**
   * Sanitize filename
   */
  private sanitizeFileName(fileName: string): string {
    return fileName
      .replace(/[^a-z0-9]/gi, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '')
      .toLowerCase();
  }

  /**
   * Trigger file download
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
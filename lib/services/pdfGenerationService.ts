/**
 * Enhanced PDF Generation Service
 * Professional-grade PDF generation with modern design and layout
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

  // Professional color palette
  private readonly colors = {
    primary: { r: 41, g: 128, b: 185 },      // Telemons blue
    primaryDark: { r: 31, g: 97, b: 141 },   // Darker blue
    lightBlue: { r: 230, g: 242, b: 250 },   // Light blue background
    text: { r: 44, g: 62, b: 80 },           // Dark text
    textLight: { r: 108, g: 117, b: 125 },   // Light gray text
    border: { r: 220, g: 220, b: 220 },      // Border gray
    white: { r: 255, g: 255, b: 255 }
  };

  private currentY = 60;
  private pageHeight = 297;
  private pageWidth = 210;
  private margin = 20;

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

      // Add modern header with branding
      if (finalOptions.includeBranding) {
        this.addModernHeader(doc, productData);
      }

      // Add product title section with styled background
      this.addProductTitleSection(doc, productData);

      // Add product image if available
      if (finalOptions.includeImages && productData.image) {
        await this.addStyledProductImage(doc, productData.image);
      }

      // Add product description with better formatting
      if (productData.description || productData.detailedDescription) {
        this.addDescriptionSection(doc, productData);
      }

      // Add specifications with modern table design
      if (finalOptions.includeSpecifications && productData.specifications) {
        this.addModernSpecifications(doc, productData);
      }

      // Add features with styled bullets
      if (finalOptions.includeFeatures && productData.features) {
        this.addStyledFeatures(doc, productData);
      }

      // Add professional footer
      this.addModernFooter(doc);

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
   * Add modern header with blue accent bar
   */
  private addModernHeader(doc: jsPDF, productData: PDFProductData): void {
    // Blue accent bar at top
    doc.setFillColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b);
    doc.rect(0, 0, this.pageWidth, 8, 'F');

    // Company name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b);
    doc.text(this.brandingInfo.companyName, this.margin, 22);
    
    // Tagline
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(this.colors.textLight.r, this.colors.textLight.g, this.colors.textLight.b);
    doc.text(this.brandingInfo.address, this.margin, 29);
    
    // "Product Specifications" badge
    const badgeX = this.pageWidth - this.margin - 70;
    doc.setFillColor(this.colors.lightBlue.r, this.colors.lightBlue.g, this.colors.lightBlue.b);
    doc.roundedRect(badgeX, 14, 70, 12, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b);
    doc.text('SPECIFICATIONS', badgeX + 5, 21.5);
    
    // Horizontal line separator
    doc.setDrawColor(this.colors.border.r, this.colors.border.g, this.colors.border.b);
    doc.setLineWidth(0.3);
    doc.line(this.margin, 36, this.pageWidth - this.margin, 36);
    
    this.currentY = 45;
  }

  /**
   * Add product title section with background
   */
  private addProductTitleSection(doc: jsPDF, productData: PDFProductData): void {
    // Light blue background box
    doc.setFillColor(this.colors.lightBlue.r, this.colors.lightBlue.g, this.colors.lightBlue.b);
    doc.roundedRect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 20, 3, 3, 'F');
    
    // Product title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
    const titleLines = doc.splitTextToSize(productData.title, this.pageWidth - 2 * this.margin - 10);
    doc.text(titleLines, this.margin + 5, this.currentY + 8);
    
    // Part number if available
    if (productData.partNumber) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(this.colors.textLight.r, this.colors.textLight.g, this.colors.textLight.b);
      doc.text(`Part No: ${productData.partNumber}`, this.margin + 5, this.currentY + 16);
    }
    
    this.currentY += 28;
  }

  /**
   * Add description section with proper formatting
   */
  private addDescriptionSection(doc: jsPDF, productData: PDFProductData): void {
    this.checkPageBreak(doc, 40);
    
    // Section header with icon-like element
    doc.setFillColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b);
    doc.circle(this.margin + 2, this.currentY + 1.5, 1.5, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
    doc.text('Product Overview', this.margin + 6, this.currentY + 3);
    
    this.currentY += 10;
    
    // Description text
    const description = productData.detailedDescription || productData.description || '';
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
    const descLines = doc.splitTextToSize(description, this.pageWidth - 2 * this.margin);
    doc.text(descLines, this.margin, this.currentY);
    
    this.currentY += descLines.length * 5 + 12;
  }

  /**
   * Add styled product image with border
   */
  private async addStyledProductImage(doc: jsPDF, imageUrl: string): Promise<void> {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl.startsWith('http') ? imageUrl : `${window.location.origin}${imageUrl}`;
      });
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const maxWidth = 140;
        const maxHeight = 100;
        let { width, height } = img;
        
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
        
        this.checkPageBreak(doc, height + 20);
        
        // Center the image
        const imgX = (this.pageWidth - width) / 2;
        
        // White background for image
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(imgX - 5, this.currentY - 5, width + 10, height + 10, 2, 2, 'F');
        
        // Border around image
        doc.setDrawColor(this.colors.border.r, this.colors.border.g, this.colors.border.b);
        doc.setLineWidth(0.5);
        doc.roundedRect(imgX - 5, this.currentY - 5, width + 10, height + 10, 2, 2, 'S');
        
        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        doc.addImage(imgData, 'JPEG', imgX, this.currentY, width, height);
        
        this.currentY += height + 20;
      }
    } catch (error) {
      console.warn('Failed to load product image:', error);
    }
  }

  /**
   * Add specifications with modern table design
   */
  private addModernSpecifications(doc: jsPDF, productData: PDFProductData): void {
    this.checkPageBreak(doc, 50);
    
    // Section header
    doc.setFillColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b);
    doc.circle(this.margin + 2, this.currentY + 1.5, 1.5, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
    doc.text('Technical Specifications', this.margin + 6, this.currentY + 3);
    
    this.currentY += 10;
    
    const tableWidth = this.pageWidth - 2 * this.margin;
    const col1Width = tableWidth * 0.4;
    const col2Width = tableWidth * 0.6;
    
    if (Array.isArray(productData.specifications)) {
      // Array format - styled list
      productData.specifications.forEach((spec: string, index: number) => {
        this.checkPageBreak(doc, 12);
        
        // Alternating row background
        if (index % 2 === 0) {
          doc.setFillColor(250, 250, 250);
          doc.rect(this.margin, this.currentY - 4, tableWidth, 8, 'F');
        }
        
        // Bullet point
        doc.setFillColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b);
        doc.circle(this.margin + 3, this.currentY - 1, 1, 'F');
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
        const specLines = doc.splitTextToSize(spec, tableWidth - 15);
        doc.text(specLines, this.margin + 7, this.currentY);
        
        this.currentY += Math.max(specLines.length * 5, 8);
      });
    } else if (typeof productData.specifications === 'object') {
      // Object format - two-column table
      Object.entries(productData.specifications).forEach(([key, value], index) => {
        this.checkPageBreak(doc, 12);
        
        // Alternating row background
        if (index % 2 === 0) {
          doc.setFillColor(250, 250, 250);
          doc.rect(this.margin, this.currentY - 4, tableWidth, 8, 'F');
        }
        
        // Key (label)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
        const keyLines = doc.splitTextToSize(key, col1Width - 5);
        doc.text(keyLines, this.margin + 2, this.currentY);
        
        // Value
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
        const valueText = Array.isArray(value) ? value.join(', ') : String(value);
        const valueLines = doc.splitTextToSize(valueText, col2Width - 5);
        doc.text(valueLines, this.margin + col1Width + 2, this.currentY);
        
        this.currentY += Math.max(keyLines.length * 5, valueLines.length * 5, 8);
      });
    }
    
    this.currentY += 10;
  }

  /**
   * Add features with styled bullet points
   */
  private addStyledFeatures(doc: jsPDF, productData: PDFProductData): void {
    this.checkPageBreak(doc, 50);
    
    // Section header
    doc.setFillColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b);
    doc.circle(this.margin + 2, this.currentY + 1.5, 1.5, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
    doc.text('Key Features', this.margin + 6, this.currentY + 3);
    
    this.currentY += 10;
    
    productData.features!.forEach((feature: string, index: number) => {
      this.checkPageBreak(doc, 12);
      
      // Feature box with light background
      const boxWidth = this.pageWidth - 2 * this.margin;
      doc.setFillColor(this.colors.lightBlue.r, this.colors.lightBlue.g, this.colors.lightBlue.b);
      doc.roundedRect(this.margin, this.currentY - 3, boxWidth, 10, 2, 2, 'F');
      
      // Check mark icon
      doc.setFillColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b);
      doc.circle(this.margin + 4, this.currentY + 1, 1.5, 'F');
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.5);
      doc.line(this.margin + 3, this.currentY + 1, this.margin + 3.7, this.currentY + 1.8);
      doc.line(this.margin + 3.7, this.currentY + 1.8, this.margin + 5.5, this.currentY - 0.5);
      
      // Feature text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
      const featureLines = doc.splitTextToSize(feature, boxWidth - 20);
      doc.text(featureLines, this.margin + 10, this.currentY + 2);
      
      this.currentY += 13;
    });
    
    this.currentY += 5;
  }

  /**
   * Add modern footer
   */
  private addModernFooter(doc: jsPDF): void {
    const footerY = this.pageHeight - 20;
    
    // Blue accent bar
    doc.setFillColor(this.colors.primary.r, this.colors.primary.g, this.colors.primary.b);
    doc.rect(0, this.pageHeight - 8, this.pageWidth, 8, 'F');
    
    // Footer separator line
    doc.setDrawColor(this.colors.border.r, this.colors.border.g, this.colors.border.b);
    doc.setLineWidth(0.3);
    doc.line(this.margin, footerY, this.pageWidth - this.margin, footerY);
    
    // Company info
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(this.colors.text.r, this.colors.text.g, this.colors.text.b);
    doc.text(this.brandingInfo.companyName, this.margin, footerY + 6);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(this.colors.textLight.r, this.colors.textLight.g, this.colors.textLight.b);
    doc.text(this.brandingInfo.website, this.margin, footerY + 10);
    doc.text(this.brandingInfo.contactInfo, this.margin, footerY + 14);
    
    // Generation date
    const timestamp = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.text(`Generated: ${timestamp}`, this.pageWidth - this.margin - 40, footerY + 10, { align: 'right' });
  }

  /**
   * Check if we need a page break
   */
  private checkPageBreak(doc: jsPDF, spaceNeeded: number): void {
    if (this.currentY + spaceNeeded > this.pageHeight - 30) {
      doc.addPage();
      this.currentY = this.margin;
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
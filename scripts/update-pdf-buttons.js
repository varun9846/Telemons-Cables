/**
 * Batch Update Script for PDF Download Buttons
 * Automatically updates all product detail components to use the PDFDownloadButton
 */

const fs = require('fs');
const path = require('path');

// List of component files to update
const componentFiles = [
  // FibreNetworks components
  'components/FibreNetworks/FibrePatchPanelDetail.tsx',
  'components/FibreNetworks/FibreCableDetail.tsx',
  'components/FibreNetworks/FibreToolsAccessoriesDetail.tsx',
  'components/FibreNetworks/FibrePatchBoxDetail.tsx',
  'components/FibreNetworks/FibreBreakoutBoxDetail.tsx',
  'components/FibreNetworks/FibrePatchPanelCassetteDetail.tsx',
  'components/FibreNetworks/FibreAttenuatorDetail.tsx',
  'components/FibreNetworks/FibreConnectorCouplerDetail.tsx',
  
  // PowerData components
  'components/PowerData/DataCentreRacksDetail.tsx',
  'components/PowerData/FibreDuctDetail.tsx',
  'components/PowerData/PowerPduDetail.tsx',
  'components/PowerData/MpoCassetteDetail.tsx',
  'components/PowerData/MpoFibreAssemblyDetail.tsx',
  'components/PowerData/MpoChassisDetail.tsx',
  'components/PowerData/LiquidCoolingDetail.tsx',
  
  // Products components
  'components/products/KeystoneDetail.tsx',
  'components/products/ModuleFaceplateDetail.tsx',
  'components/products/EnterpriseCopperCableDetail.tsx',
  
  // RacksCabinets components
  'components/RacksCabinets/OpenRackDetail.tsx',
  'components/RacksCabinets/FloorStandingRackDetail.tsx',
  'components/RacksCabinets/WallRackDetail.tsx'
];

/**
 * Add import for PDFDownloadButton
 */
function addPDFDownloadImport(content) {
  // Check if import already exists
  if (content.includes("from '@/components/common/PDFDownloadButton'")) {
    return content;
  }

  // Find the last import statement
  const importRegex = /import\s+.*?from\s+['"][^'"]+['"];?\s*\n/g;
  const imports = content.match(importRegex);
  
  if (imports && imports.length > 0) {
    const lastImport = imports[imports.length - 1];
    const lastImportIndex = content.lastIndexOf(lastImport);
    const insertIndex = lastImportIndex + lastImport.length;
    
    const newImport = "import { PDFDownloadButton } from '@/components/common/PDFDownloadButton';\n";
    return content.slice(0, insertIndex) + newImport + content.slice(insertIndex);
  }
  
  return content;
}

/**
 * Replace the Download Specs button with PDFDownloadButton component
 */
function replacePDFButton(content) {
  // Pattern to match the existing Download Specs button
  const buttonPattern = /<button\s+className="[^"]*Download Specs[^"]*"[^>]*>\s*Download Specs\s*<\/button>/gs;
  
  // More comprehensive pattern for the CTA section
  const ctaSectionPattern = /{\/\* CTA Section \*\/}\s*<div className="flex flex-col sm:flex-row gap-4">\s*<button[^>]*Request Quote[^>]*>[^<]*Request Quote[^<]*<\/button>\s*<button[^>]*Download Specs[^>]*>[^<]*Download Specs[^<]*<\/button>\s*<\/div>/gs;
  
  // Replace with PDFDownloadButton
  const replacement = `{/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-telemons-blue-primary to-telemons-blue-dark text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-telemons-blue-dark hover:to-telemons-blue-primary transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Request Quote
                </button>
                <PDFDownloadButton 
                  product={product}
                  className="flex-1"
                  variant="secondary"
                  showError={true}
                />
              </div>`;

  // Try to replace the full CTA section first
  if (ctaSectionPattern.test(content)) {
    return content.replace(ctaSectionPattern, replacement);
  }
  
  // Fallback to just replacing the button
  return content.replace(buttonPattern, `<PDFDownloadButton 
                  product={product}
                  className="flex-1"
                  variant="secondary"
                  showError={true}
                />`);
}

/**
 * Process a single component file
 */
function updateComponent(filePath) {
  try {
    console.log(`Processing ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  File not found: ${filePath}`);
      return false;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already updated
    if (content.includes('PDFDownloadButton')) {
      console.log(`  ✅ Already updated: ${filePath}`);
      return true;
    }
    
    // Add import
    content = addPDFDownloadImport(content);
    
    // Replace button
    content = replacePDFButton(content);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ Updated: ${filePath}`);
    return true;
    
  } catch (error) {
    console.error(`  ❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting PDF button update process...\n');
  
  let successful = 0;
  let failed = 0;
  
  for (const filePath of componentFiles) {
    if (updateComponent(filePath)) {
      successful++;
    } else {
      failed++;
    }
  }
  
  console.log('\n📊 Update Summary:');
  console.log(`✅ Successfully updated: ${successful} files`);
  console.log(`❌ Failed to update: ${failed} files`);
  console.log(`📁 Total files processed: ${componentFiles.length}`);
  
  if (failed === 0) {
    console.log('\n🎉 All components updated successfully!');
  } else {
    console.log('\n⚠️  Some files failed to update. Please check them manually.');
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  updateComponent,
  addPDFDownloadImport,
  replacePDFButton
};

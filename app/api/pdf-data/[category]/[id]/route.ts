/**
 * PDF Data API Route
 * Provides a unified endpoint to fetch product data for PDF generation
 * Supports all product categories with consistent data format
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { convertDatabaseRecordToPDFData } from '@/lib/utils/pdfDataConverter';

/**
 * GET /api/pdf-data/[category]/[id]
 * Fetches product data for PDF generation from any category
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { category: string; id: string } }
) {
  try {
    const { category, id } = params;

    if (!category || !id) {
      return NextResponse.json(
        { error: 'Category and ID are required' },
        { status: 400 }
      );
    }

    // Map category names to Prisma model names
    const categoryModelMap: { [key: string]: string } = {
      'backboxes': 'structuredBackboxes',
      'modules-faceplates': 'structuredModules',
      'telephone-networking': 'structuredTelephonenetworking',
      'floor-standing-racks': 'structuredFloorStandingRacks',
      'wall-racks': 'structuredWallRacks',
      'open-racks': 'structuredOpenRacks',
      'enterprise-copper-cables': 'structuredCopperCables',
      'fibre-cables': 'structuredFibreCable',
      'fibre-patch-panels': 'structuredFibrePatchPanels',
      'fibre-patch-panel-cassettes': 'structuredFibreCassetes',
      'fibre-patch-boxes': 'structuredFibrePatchBoxes',
      'fibre-breakout-boxes': 'structuredBreakoutBoxes',
      'fibre-connectors-couplers': 'structuredFibreConnectorsCouplers',
      'fibre-attenuators': 'structuredFibreAttenuators',
      'fibre-tools-accessories': 'structuredFibreToolsAccessories',
      'power-pdus': 'structuredPowerPdu',
      'power-cords-extension-leads': 'structuredPowerCords',
      'mpo-fibre-assemblies': 'structuredDataMpoFibreAssemblies',
      'mpo-cassettes': 'structuredDataMpoCassettes',
      'mpo-chassis': 'structuredDataMpoChassis',
      'fibre-duct': 'structuredDataFibreDuct',
      'data-centre-racks': 'structuredDataCentreRacks',
      'liquid-cooling': 'structuredDataLiquidCooling'
    };

    const modelName = categoryModelMap[category];
    
    if (!modelName) {
      return NextResponse.json(
        { error: `Unsupported category: ${category}` },
        { status: 400 }
      );
    }

    // Get the Prisma model dynamically
    const model = (prisma as any)[modelName];
    
    if (!model) {
      return NextResponse.json(
        { error: `Model not found for category: ${category}` },
        { status: 500 }
      );
    }

    // Fetch the product data
    const product = await model.findUnique({
      where: { id: parseInt(id) }
    });

    if (!product) {
      return NextResponse.json(
        { error: `Product not found with ID: ${id}` },
        { status: 404 }
      );
    }

    // Convert to PDF-ready format
    const pdfData = convertDatabaseRecordToPDFData(product);

    return NextResponse.json({
      success: true,
      data: pdfData,
      category,
      id
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      }
    });

  } catch (error) {
    console.error('PDF Data API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/pdf-data/[category]
 * Fetches all products from a category (for batch operations)
 */
export async function GET_ALL(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const { category } = params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Map category to model (same as above)
    const categoryModelMap: { [key: string]: string } = {
      'backboxes': 'structuredBackboxes',
      'modules-faceplates': 'structuredModules',
      // ... (same mapping as above)
    };

    const modelName = categoryModelMap[category];
    
    if (!modelName) {
      return NextResponse.json(
        { error: `Unsupported category: ${category}` },
        { status: 400 }
      );
    }

    const model = (prisma as any)[modelName];
    
    if (!model) {
      return NextResponse.json(
        { error: `Model not found for category: ${category}` },
        { status: 500 }
      );
    }

    // Fetch products with pagination
    const products = await model.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' }
    });

    // Convert all to PDF-ready format
    const pdfDataList = products.map(convertDatabaseRecordToPDFData);

    return NextResponse.json({
      success: true,
      data: pdfDataList,
      category,
      count: pdfDataList.length,
      limit,
      offset
    });

  } catch (error) {
    console.error('PDF Data Batch API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

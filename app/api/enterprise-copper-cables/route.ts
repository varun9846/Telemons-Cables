import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/enterprise-copper-cables
 * Retrieves all enterprise copper cables from the database
 * Returns formatted data for frontend consumption
 */
export async function GET(request: NextRequest) {
  try {
    // Fetch all enterprise copper cables from the database
    const copperCables = await prisma.structuredCopperCables.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform the data to match frontend interface expectations
    const transformedData = copperCables.map((cable: any, index: number) => ({
      id: cable.id.toString(),
      title: cable.titleHead || `Enterprise Copper Cable ${index + 1}`,
      partNumber: cable.indepthPartCode || 'N/A',
      description: cable.description || 'High-performance enterprise copper cable',
      image: cable.indepthImage || '/images/products/enterprise-cables.jpg', // Default fallback image
      specifications: {
        performanceLevel: 'Enterprise Grade',
        cableConstruction: 'Shielded',
        conductorGauge: '24 AWG',
        conductorType: 'Copper',
        flammabilityRating: ['CM', 'CMR', 'CMP'],
        euroClassFlameRating: 'B2ca',
        availableColors: ['Blue', 'Gray', 'Black', 'White'],
        numberOfPairs: ['4 Pair', '6 Pair', '8 Pair'],
        overallLength: '305m (1000ft)'
      },
      features: cable.indepthKeyFeatures 
        ? cable.indepthKeyFeatures.split(',').map((feature: string) => feature.trim())
        : [
            'High-speed data transmission',
            'Shielded construction for EMI protection',
            'Compliant with industry standards',
            'Durable and long-lasting',
            'Easy installation and termination'
          ],
      detailedDescription: cable.indepthDescription || cable.description || 'Professional-grade enterprise copper cable designed for high-performance data center applications.',
      additionalImages: [
        '/images/products/enterprise-cables-detail-1.jpg',
        '/images/products/enterprise-cables-detail-2.jpg'
      ]
    }));

    // Return successful response with transformed data
    return NextResponse.json(transformedData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate' // Prevent caching to ensure updated images are served
      }
    });

  } catch (error) {
    console.error('Error fetching enterprise copper cables:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        error: 'Failed to fetch enterprise copper cables',
        message: 'An error occurred while retrieving the data. Please try again later.'
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } finally {
    // Close Prisma connection
    await prisma.$disconnect();
  }
}

/**
 * POST /api/enterprise-copper-cables
 * Creates a new enterprise copper cable record
 * (Optional - for admin functionality)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.titleHead || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields: titleHead and description' },
        { status: 400 }
      );
    }

    // Create new copper cable record
    const newCable = await prisma.structuredCopperCables.create({
      data: {
        titleHead: body.titleHead,
        description: body.description,
        indepthTitle: body.indepthTitle,
        indepthPartCode: body.indepthPartCode,
        indepthDescription: body.indepthDescription,
        indepthKeyFeatures: body.indepthKeyFeatures,
        indepthImage: body.indepthImage
      }
    });

    return NextResponse.json(newCable, { status: 201 });

  } catch (error) {
    console.error('Error creating enterprise copper cable:', error);
    
    return NextResponse.json(
      { error: 'Failed to create enterprise copper cable' },
      { status: 500 }
    );
  } finally {
    // Close Prisma connection
    await prisma.$disconnect();
  }
}

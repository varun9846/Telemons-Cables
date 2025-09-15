import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const racks = await prisma.structuredWallRacks.findMany();

    // Transform the data to match the required format
    const transformedData = racks.map((rack) => {
      return {
        id: rack.id.toString(),
        title: rack.titleHead || '',
        partNumber: rack.indepthPartCode || '',
        description: rack.description || '',
        image: rack.indepthImage || '',
        specifications: rack.indepthKeyFeatures ? rack.indepthKeyFeatures.split('\n').filter(Boolean) : [],
        features: rack.indepthKeyFeatures ? rack.indepthKeyFeatures.split('\n').filter(Boolean) : [],
        detailedDescription: rack.indepthDescription || '',
        additionalImages: ''
      }
    });

    return NextResponse.json(transformedData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching wall racks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wall racks' },
      { status: 500 }
    );
  }
} 
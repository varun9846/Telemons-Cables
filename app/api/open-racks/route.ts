import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const racks = await prisma.structuredOpenRacks.findMany();

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

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching open racks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch open racks' },
      { status: 500 }
    );
  }
} 
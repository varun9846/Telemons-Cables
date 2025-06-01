import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const breakoutBoxes = await prisma.structuredBreakoutBoxes.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform the data to match our frontend interface
    const transformedData = breakoutBoxes.map((box: any) => ({
      id: box.id.toString(),
      title: box.titleHead || '',
      partNumber: box.indepthPartCode || '',
      description: box.description || '',
      image: box.indepthImage || '',
      specifications: box.indepthKeyFeatures ? box.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      features: box.indepthKeyFeatures ? box.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      detailedDescription: box.indepthDescription || '',
      additionalImages: [], // Add additional images if available in the future
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching fibre breakout boxes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fibre breakout boxes' },
      { status: 500 }
    );
  }
} 
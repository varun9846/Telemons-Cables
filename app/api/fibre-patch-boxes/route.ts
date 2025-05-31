import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const patchBoxes = await prisma.structuredFibrePatchBoxes.findMany();

    // Transform the data to match our frontend interface
    const transformedData = patchBoxes.map((box: any) => ({
      id: box.id.toString(),
      title: box.titleHead || '',
      partNumber: box.indepthPartCode || '',
      description: box.description || '',
      image: box.indepthImage || '',
      specifications: box.indepthKeyFeatures ? box.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      features: box.indepthKeyFeatures ? box.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      detailedDescription: box.indepthDescription || '',
      additionalImages: box.indepthImage ? [box.indepthImage] : []
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching fibre patch boxes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fibre patch boxes' },
      { status: 500 }
    );
  }
} 
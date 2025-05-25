import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const formatImageName = (title: string): string => {
  if (!title) return '';
  return title.replace(/\s+/g, '_'); // Simply replace spaces with underscores
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const backboxes = await prisma.structuredBackboxes.findMany();

    // Transform the data to match the required format
    const transformedData = backboxes.map((backbox) => {
      const imageFileName = formatImageName(backbox.titleHead || '');
      return {
        id: backbox.id.toString(),
        title: backbox.titleHead || '',
        partNumber: backbox.indepthPartCode || '',
        description: backbox.description || '',
        image: `/images/Backbox-floorboxes/${imageFileName}.jpg`,
        specifications: backbox.indepthKeyFeatures ? backbox.indepthKeyFeatures.split('\n').filter(Boolean) : [],
        features: backbox.indepthKeyFeatures ? backbox.indepthKeyFeatures.split('\n').filter(Boolean) : [],
        detailedDescription: backbox.indepthDescription || '',
        additionalImages: [`/images/Backbox-floorboxes/${imageFileName}.jpg`]
      }
    });

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching backboxes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch backboxes' },
      { status: 500 }
    );
  }
} 
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
      // Prioritize database image field, fallback to generated path
      const imageFromDb = backbox.indepthImage;
      const fallbackImageFileName = formatImageName(backbox.titleHead || '');
      const imageSrc = imageFromDb || `/images/Backbox-floorboxes/${fallbackImageFileName}.jpg`;
      
      return {
        id: backbox.id.toString(),
        title: backbox.titleHead || '',
        partNumber: backbox.indepthPartCode || '',
        description: backbox.description || '',
        image: imageSrc,
        specifications: backbox.indepthKeyFeatures ? backbox.indepthKeyFeatures.split('\n').filter(Boolean) : [],
        features: backbox.indepthKeyFeatures ? backbox.indepthKeyFeatures.split('\n').filter(Boolean) : [],
        detailedDescription: backbox.indepthDescription || '',
        additionalImages: imageFromDb ? [imageFromDb] : [`/images/Backbox-floorboxes/${fallbackImageFileName}.jpg`]
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
    console.error('Error fetching backboxes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch backboxes' },
      { status: 500 }
    );
  }
} 
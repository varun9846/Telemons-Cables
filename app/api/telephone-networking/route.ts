import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Function to format title to match image filename
const formatImageName = (title: string): string => {
  if (!title) return '';
  return title.replace(/\s+/g, '_'); // Simply replace spaces with underscores
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const telephoneNetworking = await prisma.structuredTelephonenetworking.findMany();
    
    // Transform the data to match the required format
    const transformedData = telephoneNetworking.map((item) => {
      // Prioritize database image field, fallback to generated path
      const imageFromDb = item.indepthImage;
      const fallbackImageFileName = formatImageName(item.titleHead || '');
      const imageSrc = imageFromDb || `/images/telephone-networking/${fallbackImageFileName}.jpg`;
      
      return {
        id: item.id.toString(),
        title: item.titleHead || '',
        partNumber: item.indepthPartCode || '',
        description: item.description || '',
        image: imageSrc,
        specifications: item.indepthKeyFeatures ? item.indepthKeyFeatures.split('\n').filter(Boolean) : [],
        features: item.indepthKeyFeatures ? item.indepthKeyFeatures.split('\n').filter(Boolean) : [],
        detailedDescription: item.indepthDescription || '',
        additionalImages: imageFromDb ? [imageFromDb] : [`/images/telephone-networking/${fallbackImageFileName}.jpg`]
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
    console.error('Error fetching telephone networking data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch telephone networking data' },
      { status: 500 }
    );
  }
} 
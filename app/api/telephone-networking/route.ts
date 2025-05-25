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
      const imageFileName = formatImageName(item.titleHead || '');
      return {
        id: item.id.toString(),
        title: item.titleHead || '',
        partNumber: item.indepthPartCode || '',
        description: item.description || '',
        image: `/images/telephone-networking/${imageFileName}.jpg`,
        specifications: item.indepthKeyFeatures ? item.indepthKeyFeatures.split('\n').filter(Boolean) : [],
        features: item.indepthKeyFeatures ? item.indepthKeyFeatures.split('\n').filter(Boolean) : [],
        detailedDescription: item.indepthDescription || '',
        additionalImages: [`/images/telephone-networking/${imageFileName}.jpg`]
      }
    });

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching telephone networking data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch telephone networking data' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const telephoneNetworking = await prisma.structuredTelephonenetworking.findMany();
    
    // Transform the data to match the required format
    const transformedData = telephoneNetworking.map((item) => ({
      id: item.id.toString(),
      title: item.titleHead || '',
      partNumber: item.indepthPartCode || '',
      description: item.description || '',
      image: '/images/placeholder.jpg', // Placeholder image
      specifications: {
        model: 'Telephone',
        type: 'Network',
        category: 'Telephone',
        material: 'ABS',
        mounting: 'Standard',
        suitableForRoundCable: 'Yes'
      },
      features: item.indepthKeyFeatures ? item.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      detailedDescription: item.indepthDescription || '',
      additionalImages: ['/images/placeholder.jpg'] // Placeholder image
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching telephone networking data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch telephone networking data' },
      { status: 500 }
    );
  }
} 
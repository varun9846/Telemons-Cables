import { NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const backboxes = await prisma.structuredBackboxes.findMany();
    
    // Transform the data to match the required format
    const transformedData = backboxes.map((backbox) => ({
      id: backbox.id.toString(),
      title: backbox.titleHead || '',
      partNumber: backbox.indepthPartCode || '',
      description: backbox.description || '',
      image: '/images/placeholder.jpg', // Placeholder image
      specifications: {
        model: 'Backbox',
        type: backbox.titleHead?.includes('Double Gang') ? 'Double Gang' : 'Single Gang',
        depth: backbox.titleHead?.match(/\d+mm/)?.[0] || 'Standard',
        material: 'ABS',
        mounting: 'Flush Mount',
        suitableForRoundCable: 'Yes'
      },
      features: backbox.indepthKeyFeatures ? backbox.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      detailedDescription: backbox.indepthDescription || '',
      additionalImages: ['/images/placeholder.jpg'] // Placeholder image
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching backboxes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch backboxes' },
      { status: 500 }
    );
  }
} 
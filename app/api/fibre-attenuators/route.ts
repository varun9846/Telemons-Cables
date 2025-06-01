import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const attenuators = await prisma.structuredFibreAttenuators.findMany({
      orderBy: {
        id: 'asc'
      }
    });

    // Transform the data to match the frontend interface
    const transformedAttenuators = attenuators.map((attenuator) => ({
      id: attenuator.id.toString(),
      title: attenuator.titleHead || '',
      partNumber: attenuator.indepthPartCode || '',
      description: attenuator.description || '',
      image: attenuator.indepthImage || '',
      specifications: attenuator.indepthKeyFeatures ? attenuator.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      features: attenuator.indepthKeyFeatures ? attenuator.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      detailedDescription: attenuator.indepthDescription || '',
      additionalImages: []
    }));

    return NextResponse.json(transformedAttenuators);
  } catch (error) {
    console.error('Error fetching fibre attenuators:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fibre attenuators' },
      { status: 500 }
    );
  }
} 
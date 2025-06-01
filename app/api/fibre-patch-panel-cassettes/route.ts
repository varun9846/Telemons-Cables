import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const cassettes = await prisma.structuredFibreCassetes.findMany();
    const transformedData = cassettes.map((cassette) => ({
      id: cassette.id.toString(),
      title: cassette.titleHead || '',
      partNumber: cassette.indepthPartCode || '',
      description: cassette.description || '',
      image: cassette.indepthImage || '',
      specifications: cassette.indepthKeyFeatures ? cassette.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      features: cassette.indepthKeyFeatures ? cassette.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      detailedDescription: cassette.indepthDescription || '',
      additionalImages: []
    }));
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching fibre patch panel cassettes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fibre patch panel cassettes' },
      { status: 500 }
    );
  }
} 
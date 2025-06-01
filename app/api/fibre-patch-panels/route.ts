import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const panels = await prisma.structuredFibrePatchPanels.findMany();
    const transformedData = panels.map((panel) => ({
      id: panel.id.toString(),
      title: panel.titleHead || '',
      partNumber: panel.indepthPartCode || '',
      description: panel.description || '',
      image: panel.indepthImage || '',
      specifications: panel.indepthKeyFeatures ? panel.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      features: panel.indepthKeyFeatures ? panel.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      detailedDescription: panel.indepthDescription || '',
      additionalImages: []
    }));
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching fibre patch panels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fibre patch panels' },
      { status: 500 }
    );
  }
} 
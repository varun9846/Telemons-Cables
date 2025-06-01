import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const tools = await prisma.structuredFibreToolsAccessories.findMany();
    const transformedData = tools.map((tool) => ({
      id: tool.id.toString(),
      title: tool.titleHead || '',
      partNumber: tool.indepthPartCode || '',
      description: tool.description || '',
      image: tool.indepthImage || '',
      specifications: tool.indepthKeyFeatures ? tool.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      features: tool.indepthKeyFeatures ? tool.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      detailedDescription: tool.indepthDescription || '',
      additionalImages: []
    }));
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error in fibre-tools-accessories API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
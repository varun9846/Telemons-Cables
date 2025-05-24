import { NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const modules = await prisma.structuredModules.findMany();
    
    // Transform the data to match the required format
    const transformedData = modules.map((module) => ({
      id: module.id.toString(),
      title: module.titleHead || '',
      partNumber: module.indepthPartCode || '',
      description: module.description || '',
      image: '/images/placeholder.jpg', // Placeholder image
      specifications: {
        model: 'Module',
        connectorType: 'RJ45',
        shielded: 'No',
        category: '6',
        requiresTerminationTool: 'No',
        suitableForRoundCable: 'Yes'
      },
      features: module.indepthKeyFeatures ? module.indepthKeyFeatures.split('\n').filter(Boolean) : [],
      detailedDescription: module.indepthDescription || '',
      additionalImages: ['/images/placeholder.jpg'] // Placeholder image
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching modules and faceplates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch modules and faceplates' },
      { status: 500 }
    );
  }
} 
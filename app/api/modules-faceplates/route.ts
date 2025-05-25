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
    const modules = await prisma.structuredModules.findMany();
    
    // Transform the data to match the required format
    const transformedData = modules.map((module) => {
      const imageFileName = formatImageName(module.titleHead || '');
      
      return {
        id: module.id.toString(),
        title: module.titleHead || '',
        partNumber: module.indepthPartCode || '',
        description: module.description || '',
        image: `/images/modules-faceplates/${imageFileName}.jpg`,
        specifications: module.indepthKeyFeatures ? module.indepthKeyFeatures.split('\n').filter(Boolean) : [],
        features: module.indepthKeyFeatures ? module.indepthKeyFeatures.split('\n').filter(Boolean) : [],
        detailedDescription: module.indepthDescription || '',
        additionalImages: [`/images/modules-faceplates/${imageFileName}.jpg`]
      };
    });

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching modules and faceplates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch modules and faceplates' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const cables = await prisma.structuredCopperCables.findMany();
        const transformedData = cables.map((cable: any) => ({
            id: cable.id.toString(),
            title: cable.titleHead || '',
            partNumber: cable.indepthPartCode || '',
            description: cable.description || '',
            image: cable.indepthImage || '',
            // The frontend expects a rich specifications object; we don't have discrete fields
            // for each property in the schema, so provide safe defaults to avoid runtime errors.
            specifications: {
                model: cable.indepthPartCode || '',
                connectorType: '',
                shielded: '',
                category: '',
                requiresTerminationTool: '',
                suitableForRoundCable: '',
                performanceLevel: '',
                cableConstruction: '',
                conductorGauge: '',
                conductorType: '',
                overallLength: '',
                flammabilityRating: '',
                availableColors: []
            },
            // Split key features into a list for display
            features: cable.indepthKeyFeatures ? cable.indepthKeyFeatures.split('\n').filter(Boolean) : [],
            detailedDescription: cable.indepthDescription || '',
            additionalImages: []
        }));
        return NextResponse.json(transformedData);
    } catch (error) {
        console.error('Error fetching copper cables:', error);
        return NextResponse.json(
            { error: 'Failed to fetch copper cables' },
            { status: 500 }
        );
    }
}
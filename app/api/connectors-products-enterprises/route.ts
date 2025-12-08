import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const connectors = await prisma.structuredConnectorsProductsEnterPrises.findMany();
        const transformedData = connectors.map((connector: any) => ({
            id: connector.id.toString(),
            title: connector.titleHead || '',
            partNumber: connector.indepthPartCode || '',
            description: connector.description || '',
            image: connector.indepthImage || '',
            // The frontend expects a rich specifications object; we don't have discrete fields
            // for each property in the schema, so provide safe defaults to avoid runtime errors.
            specifications: {
                model: connector.indepthPartCode || '',
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
            features: connector.indepthKeyFeatures ? connector.indepthKeyFeatures.split('\n').filter(Boolean) : [],
            detailedDescription: connector.indepthDescription || '',
            additionalImages: []
        }));
        return NextResponse.json(transformedData);
    } catch (error) {
        console.error('Error fetching connectors products enterprises:', error);
        return NextResponse.json(
            { error: 'Failed to fetch connectors products enterprises' },
            { status: 500 }
        );
    }
}
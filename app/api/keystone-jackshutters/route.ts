import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(){
    try{
        const jacks= await prisma.structuredKeyStoneJackShutters.findMany();
        const transformedData=jacks.map((jack)=>({
            id: jack.id.toString(),
            title: jack.titleHead || '',
            partNumber: jack.indepthPartCode || '',
            description: jack.description || '',
            image: jack.indepthImage || '',
            // The frontend expects a rich specifications object; we don't have discrete fields
            // for each property in the schema, so provide safe defaults to avoid runtime errors.
            specifications: {
                model: jack.indepthPartCode || '',
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
            features: jack.indepthKeyFeatures ? jack.indepthKeyFeatures.split('\n').filter(Boolean) : [],
            detailedDescription: jack.indepthDescription || '',
            additionalImages: []
        }));
        return NextResponse.json(transformedData);
    }catch(error){
        console.error('Error fetching keystone jacks and shutters:', error);
        return NextResponse.json(
            { error: 'Failed to fetch keystone jacks and shutters' },
            { status: 500 }
        );
    }
}
export interface EnterpriseCopperCable {
  id: string;
  title: string;
  partNumber: string;
  description: string;
  image: string;
  specifications: {
    performanceLevel: string;
    cableConstruction: string;
    conductorGauge: string;
    conductorType: string;
    flammabilityRating: string[];
    euroClassFlameRating: string;
    availableColors: string[];
    numberOfPairs: string[];
    overallLength: string;
    // Additional fields that might be present
    category?: string;
    shielded?: string;
    terminationType?: string;
    suitableForRoundCable?: string;
    model?: string;
    connectorType?: string;
    requiresTerminationTool?: string;
  };
  features: string[];
  detailedDescription: string;
  additionalImages: string[];
}

// Interface for the raw database data from Prisma
export interface StructuredCopperCable {
  id: number;
  createdAt: Date;
  titleHead: string | null;
  description: string | null;
  indepthTitle: string | null;
  indepthPartCode: string | null;
  indepthDescription: string | null;
  indepthKeyFeatures: string | null;
  indepthImage: string | null;
} 
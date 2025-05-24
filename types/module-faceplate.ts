export interface ModuleFaceplate {
  id: string;
  title: string;
  partNumber: string;
  description: string;
  image: string;
  specifications: {
    model: string;
    connectorType: string;
    shielded: string;
    category: string;
    requiresTerminationTool: string;
    suitableForRoundCable: string;
    performanceLevel?: string;
    cableConstruction?: string;
    conductorGauge?: string;
    conductorType?: string;
    overallLength?: string;
    flammabilityRating?: string;
    availableColors?: string[];
  };
  features: string[];
  detailedDescription: string;
  additionalImages?: string[];
} 
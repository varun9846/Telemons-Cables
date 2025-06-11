export interface PowerPdu {
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

export interface PowerPduDetail extends PowerPdu {
  specifications?: {
    model?: string;
    powerRating?: string;
    inputVoltage?: string;
    outputVoltage?: string;
    mountingType?: string;
    features?: string[];
  };
  features: string[];
  detailedDescription: string;
  additionalImages?: string[];
} 
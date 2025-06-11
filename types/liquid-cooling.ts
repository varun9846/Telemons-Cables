export interface LiquidCooling {
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

export interface LiquidCoolingDetail extends LiquidCooling {
  specifications: {
    partCode: string;
    title: string;
    description: string;
  };
  features: string[];
  detailedDescription: string;
  additionalImages?: string[];
} 
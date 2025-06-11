export interface MpoCassette {
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

export interface MpoCassetteDetail extends MpoCassette {
  specifications: {
    model: string;
    type: string;
    fiberCount: string;
    connectorType: string;
    features: string[];
  };
  features: string[];
  detailedDescription: string;
  additionalImages?: string[];
} 
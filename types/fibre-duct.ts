export interface FibreDuct {
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

export interface FibreDuctDetail extends FibreDuct {
  specifications: {
    model: string;
    type: string;
    material: string;
    size: string;
    color: string;
    features: string[];
  };
  detailedDescription: string;
  additionalImages?: string[];
} 
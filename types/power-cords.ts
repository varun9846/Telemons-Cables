export interface PowerCord {
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

export interface PowerCordDetail extends PowerCord {
  specifications: {
    model: string;
    type: string;
    length: string;
    rating: string;
    certification: string;
    color: string;
    features: string[];
  };
  features: string[];
  detailedDescription: string;
  additionalImages?: string[];
} 
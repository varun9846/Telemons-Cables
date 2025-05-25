export interface Backbox {
  id: string;
  title: string;
  partNumber: string;
  description: string;
  image: string;
  specifications: {
    model: string;
    type: string;
    depth: string;
    material: string;
    mounting: string;
    suitableForRoundCable: string;
  };
  features: string[];
  detailedDescription: string;
  additionalImages?: string[];
} 
export interface TelephoneNetworking {
  id: string;
  title: string;
  partNumber: string;
  description: string;
  image: string;
  specifications: {
    model: string;
    type: string;
    category: string;
    material: string;
    mounting: string;
    suitableForRoundCable: string;
  };
  features: string[];
  detailedDescription: string;
  additionalImages?: string[];
} 
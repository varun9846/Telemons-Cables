export interface TelephoneNetworkingSpecifications {
  model: string;
  type: string;
  category: string;
  material: string;
  mounting: string;
  suitableForRoundCable: string;
}

export interface TelephoneNetworking {
  id: string;
  title: string;
  description: string;
  image: string;
  partNumber: string;
  specifications: TelephoneNetworkingSpecifications;
  features: string[];
  detailedDescription: string;
  additionalImages?: string[];
} 
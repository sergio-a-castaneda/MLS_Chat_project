export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface MLSListing {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  description: string;
}

export interface MLSSearchCriteria {
  location: string;
  priceRange: {
    min: number;
    max: number;
  };
  propertyType: string[];
  bedrooms: number;
  bathrooms: number;
}
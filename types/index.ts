export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  rating: number;
  type: 'apartment' | 'house' | 'condo';
}

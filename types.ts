export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  capacity: {
    passengers: number;
    luggage: number;
  };
  description?: string;
  image: string;
}

export enum RideType {
  ONE_WAY = 'One Way',
  HOURLY = 'Hourly'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
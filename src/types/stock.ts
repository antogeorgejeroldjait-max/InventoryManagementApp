export interface Stock {
  id: string;
  name: string;
  company: string;
  price: number;
  change: number;
  image: any;
}

export interface Product {
  id: string;
  name: string;
  company: string;
  Price: number;
  percentage: number;
  image: string;
  createdAt: string;
}

export type UserRole = 'user' | 'admin';

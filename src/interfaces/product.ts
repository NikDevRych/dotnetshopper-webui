import { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  isActive: boolean;
  categories: Category[];
}

export interface GetProducts {
  products: Product[];
  maxPages: number;
}

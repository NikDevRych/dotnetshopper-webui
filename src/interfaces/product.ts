export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  isActive: boolean;
}

export interface GetProducts {
  products: Product[];
  maxPages: number;
}

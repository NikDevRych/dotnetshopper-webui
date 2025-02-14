export interface Category {
  id: number;
  name: string;
  link: string;
  isActive: boolean;
}

export interface GetCategories {
  categories: Category[];
}

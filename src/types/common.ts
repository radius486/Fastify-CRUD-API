export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  inStock: boolean;
}

export type IdParam = {
  id: string;
}

export type ProductBody = {
  name: string;
  description?: string;
  price: number;
  category: string;
  inStock: boolean;
}

export type AppConfig = {
  PORT: number;
}

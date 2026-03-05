// src/hooks/useProducts.ts
import { useApi, usePost } from './useAPI';

export interface Product {
  categoryId: number;
  title: string;
  code: string;
  variationType: string;
  details: ProductDetails;
  about: string[];
  description: string;
}

export interface ProductDetails {
  category: string;
  capacity: number;
  capacityUnit: 'GB' | 'TB';
  capacityType: 'SSD' | 'HD';
  brand: string;
  series: string;
}

export function useProduct(id: number) {
  return useApi<Product>(`product/${id}`);
}

export function useProducts() {
  return useApi<Product[]>('product');
}

export function useCreateProduct() {
  return usePost<void, Product>('product/create');
}
// src/hooks/useProducts.ts
import { useApi, usePost } from './useAPI';
import type { Product } from '../types/product';

export function useProduct(id: number) {
  return useApi<Product>(`product/${id}`);
}

export function useProducts() {
  return useApi<Product[]>('product');
}

export function useCreateProduct() {
  return usePost<void, Product>('product/create');
}
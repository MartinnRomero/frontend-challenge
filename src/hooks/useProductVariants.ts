import { usePost } from './useAPI';

export interface ProductVariant {
  productId: number;
  sizeCode: string;
  colorName: string;
  imageUrls: string[];
}

export function useCreateProductVariant() {
  return usePost<void, ProductVariant>(`product/variation/create`);
}


import { useApi } from './useAPI';

export interface Inventory {
  id: number;
  productVariationId: number;
  countryCode: string;
  quantity: number;
}

export function useInventory() {
  return useApi<Inventory[]>('inventory');
}


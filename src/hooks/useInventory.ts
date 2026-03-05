import type { Inventory } from '../types/inventory';
import { useApi } from './useAPI';

export function useInventory() {
  return useApi<Inventory[]>('inventory');
}


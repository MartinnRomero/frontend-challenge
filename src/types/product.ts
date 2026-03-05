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

export type CatalogProduct = Product & {
    id: number;
    image?: string;
};
  
export type ProductCardProps = {
    product: CatalogProduct;
};
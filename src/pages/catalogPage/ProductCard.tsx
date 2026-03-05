import type { Product } from '../../hooks/useProducts';

export type CatalogProduct = Product & {
  id: number;
  image?: string;
};

type ProductCardProps = {
  product: CatalogProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      {product.image ? (
        <img
          src={product.image}
          alt={product.title}
          className="product-card__image"
        />
      ) : (
        <div className="skeleton-card__image" />
      )}
      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        {product.description && (
          <p className="product-card__description">{product.description}</p>
        )}
      </div>
    </article>
  );
}

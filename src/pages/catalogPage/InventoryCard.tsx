import type { Inventory } from '../../types/inventory';

type InventoryCardProps = {
  item: Inventory;
};

export function InventoryCard({ item }: InventoryCardProps) {
  return (
    <article className="product-card inventory-card">
      <div className="product-card__body">
        <h3 className="product-card__title">
          Inventario · Variación {item.productVariationId}
        </h3>
        <p className="product-card__description">
          País: <strong>{item.countryCode}</strong>
        </p>
        <p className="product-card__description">
          Cantidad: <strong>{item.quantity}</strong>
        </p>
      </div>
    </article>
  );
}

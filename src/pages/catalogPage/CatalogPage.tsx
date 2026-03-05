import { useMemo, useState } from 'react';
import './CatalogPage.css';
import { useProducts } from '../../hooks/useProducts';
import { useInventory, type Inventory } from '../../hooks/useInventory';
import { useCatalogEvents } from '../../hooks/useCatalogEvents';
import { ProductCard, type CatalogProduct } from './ProductCard';
import { InventoryCard } from './InventoryCard';

const SKELETON_CARD_COUNT = 6;

function CatalogSkeleton() {
  return (
    <div className="catalog-skeleton">
      {Array.from({ length: SKELETON_CARD_COUNT }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-card__image" />
          <div className="skeleton-card__body">
            <div className="skeleton-card__line skeleton-card__line--title" />
            <div className="skeleton-card__line" />
            <div className="skeleton-card__line" />
            <div className="skeleton-card__line skeleton-card__line--short" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CatalogBody({
  view,
  loading,
  error,
  products,
  inventory,
}: {
  view: 'products' | 'inventory';
  loading: boolean;
  error: string | null;
  products: CatalogProduct[] | null;
  inventory: Inventory[] | null;
}) {
  if (loading) return <CatalogSkeleton />;

  if (error) {
    return (
      <div className="catalog-message catalog-message--error">
        <p>No pudimos cargar el catálogo.</p>
        <p className="catalog-message__hint">Intente nuevamente más tarde.</p>
      </div>
    );
  }

  if (view === 'products') {
    const list = products?.data ?? [];
    if (list.length === 0) {
      return (
        <div className="catalog-message catalog-message--empty">
          <p>No hay productos para mostrar.</p>
        </div>
      );
    }
    return list.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  }

  const inventoryList = inventory?.data ?? [];
  if (inventoryList.length === 0) {
    return (
      <div className="catalog-message catalog-message--empty">
        <p>No hay registros de inventario para mostrar.</p>
      </div>
    );
  }

  return inventoryList.map((item) => (
    <InventoryCard key={`${item.productVariationId}-${item.countryCode}`} item={item} />
  ));
}

function CatalogPage() {
  const [view, setView] = useState<'products' | 'inventory'>('products');

  const products = useProducts();
  const inventory = useInventory();

  const handlers = useMemo(
    () => ({
      'product.created': products.refetch,
      'product.variation.created': inventory.refetch,
    }),
    [products.refetch, inventory.refetch],
  );

  useCatalogEvents(import.meta.env.VITE_API_URL, handlers);

  const loading = view === 'products' ? products.loading : inventory.loading;
  const error = view === 'products' ? products.error : inventory.error;

  return (
    <section className="catalog-page">
      <h2 className="page-title">Catálogo</h2>

      <div className="catalog-toggle">
        <button
          type="button"
          className={`catalog-toggle__btn ${view === 'products' ? 'is-active' : ''}`}
          onClick={() => setView('products')}
        >
          Productos
        </button>
        <button
          type="button"
          className={`catalog-toggle__btn ${view === 'inventory' ? 'is-active' : ''}`}
          onClick={() => setView('inventory')}
        >
          Inventario
        </button>
      </div>

      <div className="catalog-grid">
        <CatalogBody
          view={view}
          loading={loading}
          error={error}
          products={products.data as CatalogProduct[] | null}
          inventory={inventory.data}
        />
      </div>
    </section>
  );
}

export default CatalogPage;
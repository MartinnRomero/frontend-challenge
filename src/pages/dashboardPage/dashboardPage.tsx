import { useNavigate } from 'react-router-dom';
import './dashboardPage.css';

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <section className="page dashboard">
      <h2 className="page-title">Dashboard</h2>
      <p className="page-description">
        Elegí a qué módulo del sistema querés ir.
      </p>

      <div className="dashboard-grid">
        <button className="dashboard-card" onClick={() => navigate('/catalog')}>
          <h3 className="dashboard-card__title">Catálogo</h3>
          <p className="dashboard-card__text">
            Gestión y visualización de productos disponibles.
          </p>
        </button>

        <button className="dashboard-card" onClick={() => navigate('/products/new')}>
          <h3 className="dashboard-card__title">Crear producto</h3>
          <p className="dashboard-card__text">
            Creación de nuevos productos.
          </p>
        </button>

        <button className="dashboard-card" onClick={() => navigate('/products/variants/new')}>
          <h3 className="dashboard-card__title">Crear variante</h3>
          <p className="dashboard-card__text">
            Creación de nuevas variantes de productos.
          </p>
        </button>
      </div>
    </section>
  );
}
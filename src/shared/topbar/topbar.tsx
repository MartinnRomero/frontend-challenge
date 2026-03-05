import './topbar.css';

function Topbar({ onNavigateHome }: { onNavigateHome: () => void }) {
    return (
      <header className="topbar">
        <div className="topbar__content">
          <button className="topbar__brand" onClick={onNavigateHome}>
            <span className="topbar__title">E‑Commerce</span>
          </button>

          <nav className="topbar__nav">
            <ul className="topbar__nav-list">
              <li className="topbar__nav-item">
                <a href="/" className="topbar__nav-link">Home</a>
                <a href="/catalog" className="topbar__nav-link">Catalogo</a>
                <a href="/products/new" className="topbar__nav-link">Crear producto</a>
                <a href="/products/variants/new" className="topbar__nav-link">Crear variante</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }

export default Topbar;
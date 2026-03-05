import { Routes, Route } from 'react-router-dom';
import CatalogPage from '../pages/catalogPage/CatalogPage';
import { DashboardPage } from '../pages/dashboardPage/dashboardPage';
import { CreateProductPage } from '../pages/createProductPage/CreateProductPage';
import { CreateProductVariantPage } from '../pages/createProductVariantPage/CreateProductVariantPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/products/new" element={<CreateProductPage />} />
      <Route path="/products/variants/new" element={<CreateProductVariantPage />} />
    </Routes>
  );
}
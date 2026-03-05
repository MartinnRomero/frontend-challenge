import './App.css';
import { useNavigate } from 'react-router-dom';
import Topbar from '../shared/topbar/topbar.tsx';
import Footer from '../shared/footer/footer.tsx';
import AppRoutes from './routes.tsx';
import { useAuth } from '../hooks/useAuth.ts';
import { useEffect } from 'react';

function AuthBootstrapper() {
  const { login } = useAuth();

  useEffect(() => {
    login({ email: 'admin@admin.com', password: '12345678' })
      .then((res) => {
        const response = res as { data: { accessToken: string } } | null;
        console.log(response);
        const token = response?.data?.accessToken;
        if (token) {
          localStorage.setItem('authToken', String(token));
        }
      })
      .catch((err) => {
        console.error('Error al autenticar:', err);
      });
  }, [login]);

  return null;
}

function App() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <AuthBootstrapper />
      <Topbar onNavigateHome={() => navigate('/')} />
      
      <div className="app-routes">
      <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
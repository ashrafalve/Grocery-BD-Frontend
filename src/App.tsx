import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';
import Toast from './components/Toast';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
        <Toast />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

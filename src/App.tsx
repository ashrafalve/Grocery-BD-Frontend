import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import AppRoutes from './routes/AppRoutes';
import Toast from './components/Toast';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppRoutes />
          <Toast />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

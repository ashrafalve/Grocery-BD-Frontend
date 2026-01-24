import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../layouts/ProtectedRoute';
import PublicLayout from '../layouts/PublicLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// User Pages
import Home from '../pages/user/Home';
import ProductDetail from '../pages/user/ProductDetail';
import Cart from '../pages/user/Cart';
import Checkout from '../pages/user/Checkout';
import OrderSuccess from '../pages/user/OrderSuccess';
import Orders from '../pages/user/Orders';
import OrderTracking from '../pages/user/OrderTracking';
import Profile from '../pages/user/Profile';
import Wishlist from '../pages/user/Wishlist';
import AllProducts from '../pages/user/AllProducts';

// Delivery Pages
import DeliveryDashboard from '../pages/delivery/DeliveryDashboard';
import DeliveryOrderDetail from '../pages/delivery/DeliveryOrderDetail';
import DeliveryMap from '../pages/delivery/DeliveryMap';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminOrders from '../pages/admin/AdminOrders';
import AdminDeliveryBoys from '../pages/admin/AdminDeliveryBoys';

const AppRoutes: React.FC = () => {
    const { isAuthenticated, user } = useAuth();

    const getDefaultRoute = () => {
        if (!isAuthenticated || !user) return '/';

        switch (user.role) {
            case 'admin':
                return '/admin';
            case 'delivery':
                return '/delivery';
            default:
                return '/';
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                    <PublicLayout>
                        <Home />
                    </PublicLayout>
                } />
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={getDefaultRoute()} />} />
                <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to={getDefaultRoute()} />} />

                {/* Public User Routes */}
                <Route path="/product/:id" element={
                    <PublicLayout>
                        <ProductDetail />
                    </PublicLayout>
                } />
                <Route path="/category/:id" element={
                    <PublicLayout>
                        <Home />
                    </PublicLayout>
                } />
                <Route path="/products" element={
                    <PublicLayout>
                        <AllProducts />
                    </PublicLayout>
                } />
                <Route path="/cart" element={
                    <PublicLayout>
                        <Cart />
                    </PublicLayout>
                } />
                <Route path="/wishlist" element={
                    <PublicLayout>
                        <Wishlist />
                    </PublicLayout>
                } />
                <Route path="/checkout" element={
                    <PublicLayout>
                        <Checkout />
                    </PublicLayout>
                } />
                <Route path="/order-success/:orderId" element={
                    <ProtectedRoute allowedRoles={['user']}>
                        <OrderSuccess />
                    </ProtectedRoute>
                } />
                <Route path="/orders" element={
                    <ProtectedRoute allowedRoles={['user']}>
                        <Orders />
                    </ProtectedRoute>
                } />
                <Route path="/track/:orderId" element={
                    <ProtectedRoute allowedRoles={['user']}>
                        <OrderTracking />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute allowedRoles={['user']}>
                        <Profile />
                    </ProtectedRoute>
                } />

                {/* Delivery Routes */}
                <Route path="/delivery" element={
                    <ProtectedRoute allowedRoles={['delivery']}>
                        <DeliveryDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/delivery/order/:orderId" element={
                    <ProtectedRoute allowedRoles={['delivery']}>
                        <DeliveryOrderDetail />
                    </ProtectedRoute>
                } />
                <Route path="/delivery/map" element={
                    <ProtectedRoute allowedRoles={['delivery']}>
                        <DeliveryMap />
                    </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/admin/products" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminProducts />
                    </ProtectedRoute>
                } />
                <Route path="/admin/orders" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminOrders />
                    </ProtectedRoute>
                } />
                <Route path="/admin/delivery-boys" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDeliveryBoys />
                    </ProtectedRoute>
                } />
                <Route path="/admin/categories" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminProducts />
                    </ProtectedRoute>
                } />

                {/* Fallback */}
                <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;

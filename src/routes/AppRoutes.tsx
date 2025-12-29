import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../layouts/ProtectedRoute';

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
        if (!isAuthenticated || !user) return '/login';

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
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={getDefaultRoute()} />} />
                <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to={getDefaultRoute()} />} />

                {/* User Routes */}
                <Route path="/" element={
                    <ProtectedRoute allowedRoles={['user']}>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/product/:id" element={
                    <ProtectedRoute allowedRoles={['user']}>
                        <ProductDetail />
                    </ProtectedRoute>
                } />
                <Route path="/category/:id" element={
                    <ProtectedRoute allowedRoles={['user']}>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/cart" element={
                    <ProtectedRoute allowedRoles={['user']}>
                        <Cart />
                    </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                    <ProtectedRoute allowedRoles={['user']}>
                        <Checkout />
                    </ProtectedRoute>
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

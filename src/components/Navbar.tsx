import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to={user?.role === 'admin' ? '/admin' : user?.role === 'delivery' ? '/delivery' : '/'} className="flex items-center space-x-2">
                        <span className="text-2xl">🛒</span>
                        <span className="text-xl font-bold text-primary-600">GroceryBD</span>
                    </Link>

                    {/* Navigation Items */}
                    <div className="flex items-center space-x-6">
                        {user ? (
                            <>
                                {user.role === 'user' && (
                                    <>
                                        <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                                            Home
                                        </Link>
                                        <Link to="/orders" className="text-gray-700 hover:text-primary-600 transition-colors">
                                            Orders
                                        </Link>
                                        <Link to="/cart" className="relative text-gray-700 hover:text-primary-600 transition-colors">
                                            <span className="text-2xl">🛒</span>
                                            {cartItemsCount > 0 && (
                                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                    {cartItemsCount}
                                                </span>
                                            )}
                                        </Link>
                                        <Link to="/profile" className="text-gray-700 hover:text-primary-600 transition-colors">
                                            Profile
                                        </Link>
                                    </>
                                )}

                                {user.role === 'delivery' && (
                                    <>
                                        <Link to="/delivery" className="text-gray-700 hover:text-primary-600 transition-colors">
                                            Orders
                                        </Link>
                                        <Link to="/delivery/map" className="text-gray-700 hover:text-primary-600 transition-colors">
                                            Map
                                        </Link>
                                    </>
                                )}

                                {user.role === 'admin' && (
                                    <>
                                        <Link to="/admin" className="text-gray-700 hover:text-primary-600 transition-colors">
                                            Dashboard
                                        </Link>
                                        <Link to="/admin/products" className="text-gray-700 hover:text-primary-600 transition-colors">
                                            Products
                                        </Link>
                                        <Link to="/admin/orders" className="text-gray-700 hover:text-primary-600 transition-colors">
                                            Orders
                                        </Link>
                                        <Link to="/admin/delivery-boys" className="text-gray-700 hover:text-primary-600 transition-colors">
                                            Delivery
                                        </Link>
                                    </>
                                )}

                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-600">{user.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

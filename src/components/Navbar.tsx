import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { mockCategories } from '../mock';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const { wishlist } = useWishlist();
    const navigate = useNavigate();
    const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        // Close dropdown when opening mobile menu
        if (isShopDropdownOpen) {
            setIsShopDropdownOpen(false);
        }
    };

    // Close mobile menu when switching routes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const toggleShopDropdown = () => {
        setIsShopDropdownOpen(!isShopDropdownOpen);
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
                <div className="flex justify-between items-center h-12 sm:h-14 md:h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                        <span className="text-lg sm:text-xl md:text-2xl">🛒</span>
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary-600 hidden xs:block sm:block">GroceryBD</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex items-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-6 overflow-x-hidden">
                        {/* Common links for all users */}
                        <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors text-xs sm:text-xs md:text-sm flex-shrink-0">
                            Home
                        </Link>

                        {/* Shop Dropdown */}
                        <div className="relative flex-shrink-0">
                            <button
                                onClick={toggleShopDropdown}
                                className="text-gray-700 hover:text-primary-600 transition-colors text-xs sm:text-xs md:text-sm flex items-center gap-1"
                            >
                                Shop
                                <svg className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {/* Cart and Wishlist - always visible */}
                        <Link to="/cart" className="relative text-gray-700 hover:text-primary-600 transition-colors flex-shrink-0">
                            <svg className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>
                        <Link to="/wishlist" className="relative text-gray-700 hover:text-primary-600 transition-colors flex-shrink-0">
                            <svg className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {wishlist.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        {/* Authenticated user navigation */}
                        {user && (
                            <div className="hidden sm:flex items-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-6 overflow-x-hidden">
                                {user.role === 'user' && (
                                    <>
                                        <Link to="/orders" className="text-gray-700 hover:text-primary-600 transition-colors text-xs sm:text-xs md:text-sm flex-shrink-0">
                                            Orders
                                        </Link>
                                        <Link to="/profile" className="text-gray-700 hover:text-primary-600 transition-colors text-xs sm:text-xs md:text-sm flex-shrink-0">
                                            Profile
                                        </Link>
                                    </>
                                )}

                                {user.role === 'delivery' && (
                                    <>
                                        <Link to="/delivery" className="text-gray-700 hover:text-primary-600 transition-colors text-xs sm:text-xs md:text-sm flex-shrink-0">
                                            Orders
                                        </Link>
                                        <Link to="/delivery/map" className="text-gray-700 hover:text-primary-600 transition-colors text-xs sm:text-xs md:text-sm flex-shrink-0">
                                            Map
                                        </Link>
                                    </>
                                )}

                                {user.role === 'admin' && (
                                    <>
                                        <Link to="/admin" className="text-gray-700 hover:text-primary-600 transition-colors text-xs sm:text-xs md:text-sm flex-shrink-0">
                                            Dashboard
                                        </Link>
                                        <Link to="/admin/products" className="text-gray-700 hover:text-primary-600 transition-colors text-xs sm:text-xs md:text-sm flex-shrink-0">
                                            Products
                                        </Link>
                                        <Link to="/admin/orders" className="text-gray-700 hover:text-primary-600 transition-colors text-xs sm:text-xs md:text-sm flex-shrink-0">
                                            Orders
                                        </Link>
                                        <Link to="/admin/delivery-boys" className="text-gray-700 hover:text-primary-600 transition-colors text-xs sm:text-xs md:text-sm flex-shrink-0">
                                            Delivery
                                        </Link>
                                    </>
                                )}

                                <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 flex-shrink-0">
                                    <span className="text-xs sm:text-xs md:text-sm text-gray-600 hidden xs:hidden sm:block">{user.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 md:px-4 py-2 rounded-lg text-xs sm:text-xs md:text-sm transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Shop Dropdown Menu - Appears below navbar */}
                    {isShopDropdownOpen && (
                        <div className="fixed left-0 top-16 w-full z-50">
                            <div className="max-w-7xl mx-auto mt-2 w-56 bg-white shadow-lg ring-1 ring-black ring-opacity-5 rounded-md">
                                <div className="py-1">
                                    <div className="px-4 py-2">
                                        <h3 className="text-sm font-semibold text-gray-800">Shop by Category</h3>
                                    </div>
                                    <Link
                                        to="/products"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsShopDropdownOpen(false)}
                                    >
                                        All Products
                                    </Link>
                                    {mockCategories.map((category) => (
                                        <Link
                                            key={category.id}
                                            to={`/products?category=${category.id}`}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100 first:border-t-0"
                                            onClick={() => setIsShopDropdownOpen(false)}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Desktop Auth Options */}
                    {!user && (
                        <div className="hidden sm:flex items-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-6">
                            <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors text-xs sm:text-xs md:text-sm flex-shrink-0">
                                Login
                            </Link>
                            <Link to="/register" className="btn-primary text-xs sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 flex-shrink-0">
                                Register
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="sm:hidden text-gray-700 hover:text-primary-600 transition-colors p-2"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Sidebar */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
                        onClick={toggleMobileMenu}
                    />

                    {/* Mobile Menu Sidebar */}
                    <div className="fixed top-0 right-0 h-full w-72 sm:w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 sm:hidden overflow-y-auto">
                        {/* Mobile Menu Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                aria-label="Close menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile Menu Content */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {/* Common Links */}
                            <div className="space-y-2">
                                <Link
                                    to="/"
                                    onClick={toggleMobileMenu}
                                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors"
                                >
                                    Home
                                </Link>

                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setIsShopDropdownOpen(!isShopDropdownOpen);
                                        }}
                                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors flex items-center justify-between"
                                    >
                                        Shop
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                    {isShopDropdownOpen && (
                                        <div className="mt-2 ml-4 space-y-1">
                                            <Link
                                                to="/products"
                                                onClick={toggleMobileMenu}
                                                className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors"
                                            >
                                                All Products
                                            </Link>
                                            {mockCategories.map((category) => (
                                                <Link
                                                    key={category.id}
                                                    to={`/products?category=${category.id}`}
                                                    onClick={toggleMobileMenu}
                                                    className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors"
                                                >
                                                    {category.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Cart and Wishlist */}
                            <div className="space-y-2">
                                <Link
                                    to="/cart"
                                    onClick={toggleMobileMenu}
                                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors flex items-center justify-between"
                                >
                                    <span>Cart</span>
                                    {cartItemsCount > 0 && (
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </Link>

                                <Link
                                    to="/wishlist"
                                    onClick={toggleMobileMenu}
                                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors flex items-center justify-between"
                                >
                                    <span>Wishlist</span>
                                    {wishlist.length > 0 && (
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                            {wishlist.length}
                                        </span>
                                    )}
                                </Link>
                            </div>

                            {/* Authenticated User Links */}
                            {user && (
                                <div className="space-y-2">
                                    {user.role === 'user' && (
                                        <>
                                            <Link
                                                to="/orders"
                                                onClick={toggleMobileMenu}
                                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors"
                                            >
                                                Orders
                                            </Link>
                                            <Link
                                                to="/profile"
                                                onClick={toggleMobileMenu}
                                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors"
                                            >
                                                Profile
                                            </Link>
                                        </>
                                    )}

                                    {user.role === 'delivery' && (
                                        <>
                                            <Link
                                                to="/delivery"
                                                onClick={toggleMobileMenu}
                                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors"
                                            >
                                                Orders
                                            </Link>
                                            <Link
                                                to="/delivery/map"
                                                onClick={toggleMobileMenu}
                                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors"
                                            >
                                                Map
                                            </Link>
                                        </>
                                    )}

                                    {user.role === 'admin' && (
                                        <>
                                            <Link
                                                to="/admin"
                                                onClick={toggleMobileMenu}
                                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors"
                                            >
                                                Dashboard
                                            </Link>
                                            <Link
                                                to="/admin/products"
                                                onClick={toggleMobileMenu}
                                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors"
                                            >
                                                Products
                                            </Link>
                                            <Link
                                                to="/admin/orders"
                                                onClick={toggleMobileMenu}
                                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors"
                                            >
                                                Orders
                                            </Link>
                                            <Link
                                                to="/admin/delivery-boys"
                                                onClick={toggleMobileMenu}
                                                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors"
                                            >
                                                Delivery
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Unauthenticated User Links */}
                            {!user && (
                                <div className="space-y-2">
                                    <Link
                                        to="/login"
                                        onClick={toggleMobileMenu}
                                        className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={toggleMobileMenu}
                                        className="block w-full text-left px-4 py-3 bg-primary-600 text-white rounded-lg transition-colors"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}

                            {/* User Actions */}
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                {user ? (
                                    <div className="flex items-center justify-between px-4 py-3">
                                        <span className="text-gray-700 font-medium">{user.name}</span>
                                        <button
                                            onClick={handleLogout}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 text-sm">
                                        Login to access your account
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
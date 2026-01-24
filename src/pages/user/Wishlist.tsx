import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import { showToast } from '../../hooks/useToast';

const Wishlist: React.FC = () => {
    const navigate = useNavigate();
    const { getWishlistProducts, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    
    const wishlistProducts = getWishlistProducts();

    const handleAddToCart = (productId: string, productName: string) => {
        addToCart(productId, 1);
        showToast(`${productName} added to cart!`, 'success');
    };

    const handleRemoveFromWishlist = (productId: string, productName: string) => {
        removeFromWishlist(productId, productName);
    };

    if (wishlistProducts.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4 block">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
                    <p className="text-gray-600 mb-6">Start adding products you love!</p>
                    <button onClick={() => navigate('/')} className="btn-primary">
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-2">My Wishlist <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg></h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {wishlistProducts.map(product => {
                        const discountedPrice = product.discount
                            ? product.price - (product.price * product.discount) / 100
                            : product.price;

                        return (
                            <div key={product.id} className="card p-3 sm:p-4 group hover:scale-105 transition-transform duration-200">
                                <div className="relative mb-3 sm:mb-4 overflow-hidden rounded-lg">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    {product.discount && (
                                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                                            -{product.discount}%
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-1">
                                        {product.name}
                                    </h3>

                                    {product.discount ? (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm sm:text-base font-bold text-primary-600">
                                                    {formatPrice(discountedPrice)}
                                                </span>
                                                <span className="text-xs sm:text-sm text-gray-400 line-through">
                                                    {formatPrice(product.price)}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500">per {product.unit}</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="text-sm sm:text-base font-bold text-primary-600">
                                                {formatPrice(product.price)}
                                            </div>
                                            <span className="text-xs text-gray-500">per {product.unit}</span>
                                        </div>
                                    )}

                                    <div className="flex gap-2 pt-2">
                                        <button
                                            onClick={() => handleAddToCart(product.id, product.name)}
                                            disabled={product.stock === 0}
                                            className="flex-1 btn-primary text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                                            className="p-2 border border-red-300 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Remove from wishlist"
                                        >
                                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
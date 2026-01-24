import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { formatPrice } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { showToast } from '../hooks/useToast';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const handleAddToCart = () => {
        addToCart(product.id, 1);
        showToast(`${product.name} added to cart!`, 'success');
    };

    const handleWishlistClick = () => {
        toggleWishlist(product.id, product.name);
    };

    const discountedPrice = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    return (
        <div className="card p-3 sm:p-4 group hover:scale-105 transition-transform duration-200">
            <Link to={`/product/${product.id}`}>
                <div className="relative mb-4 overflow-hidden rounded-lg">
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
                    {product.stock < 10 && product.stock > 0 && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs">
                            Low Stock
                        </div>
                    )}
                    {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                    )}
                </div>
            </Link>

            <div className="space-y-2">
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800 hover:text-primary-600 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 hidden sm:block">{product.description}</p>

                {product.rating && (
                    <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                            {'⭐'.repeat(Math.floor(product.rating))}
                        </div>
                        <span className="text-sm text-gray-600">
                            ({product.reviews} reviews)
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between pt-2">
                    <div>
                        {product.discount ? (
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-primary-600">
                                        {formatPrice(discountedPrice)}
                                    </span>
                                    <span className="text-sm text-gray-400 line-through">
                                        {formatPrice(product.price)}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500">per {product.unit}</span>
                            </div>
                        ) : (
                            <div>
                                <div className="text-lg font-bold text-primary-600">
                                    {formatPrice(product.price)}
                                </div>
                                <span className="text-xs text-gray-500">per {product.unit}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-1 sm:gap-2">
                        <button
                            onClick={handleWishlistClick}
                            className="p-2 sm:p-2 border border-gray-300 hover:border-red-500 rounded-lg transition-colors"
                            title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                            <svg 
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                                fill={isInWishlist(product.id) ? 'currentColor' : 'none'} 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="btn-primary text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed px-2 sm:px-4"
                        >
                            Add +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

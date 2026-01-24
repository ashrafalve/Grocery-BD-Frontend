import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../../mock';
import { formatPrice } from '../../utils/helpers';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { showToast } from '../../hooks/useToast';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [quantity, setQuantity] = useState(1);

    const product = mockProducts.find(p => p.id === id);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                    <button onClick={() => navigate('/')} className="btn-primary">
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    const discountedPrice = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    const handleAddToCart = () => {
        addToCart(product.id, quantity);
        showToast(`${quantity} ${product.unit} of ${product.name} added to cart!`, 'success');
    };

    const handleWishlistClick = () => {
        toggleWishlist(product.id, product.name);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 sm:mb-8 text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
                >
                    ← Back
                </button>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                    {/* Product Image */}
                    <div className="relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full rounded-2xl shadow-lg"
                        />
                        {product.discount && (
                            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-lg font-bold">
                                -{product.discount}%
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">{product.name}</h1>
                            <p className="text-gray-600 text-base sm:text-lg">{product.description}</p>
                        </div>

                        {product.rating && (
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="flex text-yellow-400 text-lg sm:text-2xl">
                                    {'⭐'.repeat(Math.floor(product.rating))}
                                </div>
                                <span className="text-gray-600 text-sm sm:text-lg">
                                    {product.rating} ({product.reviews} reviews)
                                </span>
                            </div>
                        )}

                        <div className="border-t border-b border-gray-200 py-4 sm:py-6">
                            {product.discount ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 sm:gap-4">
                                        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600">
                                            {formatPrice(discountedPrice)}
                                        </span>
                                        <span className="text-lg sm:text-xl md:text-2xl text-gray-400 line-through">
                                            {formatPrice(product.price)}
                                        </span>
                                    </div>
                                    <span className="text-sm sm:text-base text-gray-500">per {product.unit}</span>
                                </div>
                            ) : (
                                <div>
                                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600">
                                        {formatPrice(product.price)}
                                    </div>
                                    <span className="text-sm sm:text-base text-gray-500">per {product.unit}</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Availability</h3>
                            {product.stock > 0 ? (
                                <span className="badge badge-success text-sm sm:text-lg px-3 sm:px-4 py-2">
                                    In Stock ({product.stock} {product.unit} available)
                                </span>
                            ) : (
                                <span className="badge badge-danger text-sm sm:text-lg px-3 sm:px-4 py-2">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {product.stock > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Quantity</h3>
                                <div className="flex items-center gap-2 sm:gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 border-gray-300 hover:border-primary-600 font-bold text-sm sm:text-xl"
                                    >
                                        −
                                    </button>
                                    <span className="text-xl sm:text-2xl font-bold w-12 sm:w-16 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 border-gray-300 hover:border-primary-600 font-bold text-sm sm:text-xl"
                                    >
                                        +
                                    </button>
                                    <span className="text-gray-600 text-sm sm:text-base">{product.unit}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                            <button
                                onClick={handleWishlistClick}
                                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 hover:border-red-500 rounded-lg font-medium transition-colors text-sm sm:text-base"
                            >
                                <svg 
                                    className={`w-5 h-5 sm:w-6 sm:h-6 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                                    fill={isInWishlist(product.id) ? 'currentColor' : 'none'} 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            </button>
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="flex-1 btn-primary py-3 sm:py-4 text-sm sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    handleAddToCart();
                                    navigate('/cart');
                                }}
                                disabled={product.stock === 0}
                                className="flex-1 bg-secondary-500 hover:bg-secondary-600 text-white font-medium py-3 sm:py-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
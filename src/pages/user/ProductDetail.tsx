import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../../mock';
import { formatPrice } from '../../utils/helpers';
import { useCart } from '../../context/CartContext';
import { showToast } from '../../hooks/useToast';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
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

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
                >
                    ← Back
                </button>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full rounded-2xl shadow-lg"
                        />
                        {product.discount && (
                            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold">
                                -{product.discount}%
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
                            <p className="text-gray-600 text-lg">{product.description}</p>
                        </div>

                        {product.rating && (
                            <div className="flex items-center gap-3">
                                <div className="flex text-yellow-400 text-2xl">
                                    {'⭐'.repeat(Math.floor(product.rating))}
                                </div>
                                <span className="text-gray-600 text-lg">
                                    {product.rating} ({product.reviews} reviews)
                                </span>
                            </div>
                        )}

                        <div className="border-t border-b border-gray-200 py-6">
                            {product.discount ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl font-bold text-primary-600">
                                            {formatPrice(discountedPrice)}
                                        </span>
                                        <span className="text-2xl text-gray-400 line-through">
                                            {formatPrice(product.price)}
                                        </span>
                                    </div>
                                    <span className="text-gray-600">per {product.unit}</span>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="text-4xl font-bold text-primary-600">
                                        {formatPrice(product.price)}
                                    </div>
                                    <span className="text-gray-600">per {product.unit}</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Availability</h3>
                            {product.stock > 0 ? (
                                <span className="badge badge-success text-lg px-4 py-2">
                                    In Stock ({product.stock} {product.unit} available)
                                </span>
                            ) : (
                                <span className="badge badge-danger text-lg px-4 py-2">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {product.stock > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-primary-600 font-bold text-xl"
                                    >
                                        −
                                    </button>
                                    <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-primary-600 font-bold text-xl"
                                    >
                                        +
                                    </button>
                                    <span className="text-gray-600">{product.unit}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="flex-1 btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    handleAddToCart();
                                    navigate('/cart');
                                }}
                                disabled={product.stock === 0}
                                className="flex-1 bg-secondary-500 hover:bg-secondary-600 text-white font-medium py-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

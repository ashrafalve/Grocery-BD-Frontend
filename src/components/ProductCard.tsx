import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { formatPrice } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import { showToast } from '../hooks/useToast';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product.id, 1);
        showToast(`${product.name} added to cart!`, 'success');
    };

    const discountedPrice = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    return (
        <div className="card p-4 group hover:scale-105 transition-transform duration-200">
            <Link to={`/product/${product.id}`}>
                <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
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
                    <h3 className="font-semibold text-gray-800 hover:text-primary-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

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

                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

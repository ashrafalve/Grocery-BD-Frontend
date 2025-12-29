import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import { showToast } from '../../hooks/useToast';

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const { updateQuantity, removeFromCart, getTotal, getCartWithProducts } = useCart();
    const cartItems = getCartWithProducts();
    const total = getTotal();

    const handleRemove = (productId: string, productName: string) => {
        removeFromCart(productId);
        showToast(`${productName} removed from cart`, 'info');
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <span className="text-6xl mb-4 block">🛒</span>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-6">Add some products to get started!</p>
                    <button onClick={() => navigate('/')} className="btn-primary">
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart 🛒</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item.productId} className="card p-6">
                                <div className="flex gap-6">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-800">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">{item.product.description}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemove(item.productId, item.product.name)}
                                                className="text-red-500 hover:text-red-700 text-xl"
                                            >
                                                ×
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-lg border border-gray-300 hover:border-primary-600 font-bold"
                                                >
                                                    −
                                                </button>
                                                <span className="font-bold w-12 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                    disabled={item.quantity >= item.product.stock}
                                                    className="w-8 h-8 rounded-lg border border-gray-300 hover:border-primary-600 font-bold disabled:opacity-50"
                                                >
                                                    +
                                                </button>
                                                <span className="text-sm text-gray-500">{item.product.unit}</span>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-lg font-bold text-primary-600">
                                                    {formatPrice(item.price * item.quantity)}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {formatPrice(item.price)} each
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span>{formatPrice(50)}</span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-bold text-gray-800">
                                        <span>Total</span>
                                        <span className="text-primary-600">{formatPrice(total + 50)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full btn-primary py-3 text-lg mb-3"
                            >
                                Proceed to Checkout
                            </button>

                            <button
                                onClick={() => navigate('/')}
                                className="w-full btn-secondary py-3"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/helpers';
import { showToast } from '../../hooks/useToast';
import type { PaymentMethod } from '../../types';

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { getTotal, getCartWithProducts, clearCart } = useCart();
    const cartItems = getCartWithProducts();
    const total = getTotal();

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
    const [bkashNumber, setBkashNumber] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [address, setAddress] = useState({
        street: user?.address?.street || '',
        area: user?.address?.area || '',
        city: user?.address?.city || 'Dhaka',
    });

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();

        if (!address.street || !address.area) {
            showToast('Please fill in all address fields', 'error');
            return;
        }

        if (paymentMethod === 'bkash' && (!bkashNumber || !transactionId)) {
            showToast('Please provide bKash details', 'error');
            return;
        }

        // Mock order creation
        const orderId = `ORD${Date.now()}`;

        clearCart();
        showToast('Order placed successfully!', 'success');
        navigate(`/order-success/${orderId}`);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">No Items in Cart</h2>
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
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout 🛍️</h1>

                <form onSubmit={handlePlaceOrder}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Forms */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Delivery Address */}
                            <div className="card p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Address</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Street Address
                                        </label>
                                        <input
                                            type="text"
                                            value={address.street}
                                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                                            className="input-field"
                                            placeholder="House/Flat no, Road, Block"
                                            required
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Area
                                            </label>
                                            <input
                                                type="text"
                                                value={address.area}
                                                onChange={(e) => setAddress({ ...address, area: e.target.value })}
                                                className="input-field"
                                                placeholder="e.g. Dhanmondi, Gulshan"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                value={address.city}
                                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                                className="input-field"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="card p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>

                                <div className="space-y-4">
                                    {/* Cash on Delivery */}
                                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                            className="mr-3 w-5 h-5"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold">Cash on Delivery</div>
                                            <div className="text-sm text-gray-500">Pay when you receive</div>
                                        </div>
                                        <span className="text-2xl">💵</span>
                                    </label>

                                    {/* bKash */}
                                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'bkash' ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="bkash"
                                            checked={paymentMethod === 'bkash'}
                                            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                            className="mr-3 w-5 h-5"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold">bKash</div>
                                            <div className="text-sm text-gray-500">Mobile payment</div>
                                        </div>
                                        <span className="text-2xl">📱</span>
                                    </label>
                                </div>

                                {/* bKash Details */}
                                {paymentMethod === 'bkash' && (
                                    <div className="mt-6 p-4 bg-pink-50 border border-pink-200 rounded-lg space-y-4">
                                        <div className="text-sm text-gray-700">
                                            <p className="font-semibold mb-2">Send money to:</p>
                                            <p className="text-lg font-bold text-pink-600">01900-000000</p>
                                            <p className="text-xs mt-1">Reference: {user?.name}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your bKash Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={bkashNumber}
                                                onChange={(e) => setBkashNumber(e.target.value)}
                                                className="input-field"
                                                placeholder="01XXXXXXXXX"
                                                required={paymentMethod === 'bkash'}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Transaction ID
                                            </label>
                                            <input
                                                type="text"
                                                value={transactionId}
                                                onChange={(e) => setTransactionId(e.target.value)}
                                                className="input-field"
                                                placeholder="Enter bKash TrxID"
                                                required={paymentMethod === 'bkash'}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="card p-6 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                                    {cartItems.map(item => (
                                        <div key={item.productId} className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                {item.product.name} × {item.quantity}
                                            </span>
                                            <span className="font-medium">
                                                {formatPrice(item.price * item.quantity)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-4 space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery Fee</span>
                                        <span>{formatPrice(50)}</span>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span className="text-primary-600">{formatPrice(total + 50)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="w-full btn-primary py-3 text-lg">
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;

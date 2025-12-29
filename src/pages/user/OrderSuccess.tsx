import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="card p-8 text-center animate-fadeIn">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">✓</span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Order Placed Successfully! 🎉
                    </h1>

                    <p className="text-gray-600 mb-6">
                        Thank you for your order. We've received your order and will start processing it shortly.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4 mb-8">
                        <div className="text-sm text-gray-600 mb-1">Order ID</div>
                        <div className="text-xl font-bold text-primary-600">{orderId}</div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => navigate(`/track/${orderId}`)}
                            className="w-full btn-primary py-3"
                        >
                            Track Order
                        </button>
                        <button
                            onClick={() => navigate('/orders')}
                            className="w-full btn-secondary py-3"
                        >
                            View All Orders
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full text-primary-600 hover:text-primary-700 font-medium py-3"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockOrders } from '../../mock';
import { formatDateTime, formatPrice, getStatusColor } from '../../utils/helpers';
import { showToast } from '../../hooks/useToast';
import type { OrderStatus } from '../../types';

const DeliveryOrderDetail: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const order = mockOrders.find(o => o.id === orderId);

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h2>
                    <button onClick={() => navigate('/delivery')} className="btn-primary">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const handleStatusUpdate = async (newStatus: OrderStatus) => {
        setUpdatingStatus(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setUpdatingStatus(false);
        showToast(`Order status updated to ${newStatus}`, 'success');

        if (newStatus === 'delivered') {
            navigate('/delivery');
        }
    };

    const getNextStatus = (): OrderStatus | null => {
        const statusFlow: OrderStatus[] = ['confirmed', 'picked', 'on-the-way', 'delivered'];
        const currentIndex = statusFlow.indexOf(order.status);
        if (currentIndex < statusFlow.length - 1) {
            return statusFlow[currentIndex + 1];
        }
        return null;
    };

    const nextStatus = getNextStatus();

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate('/delivery')}
                    className="mb-6 text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
                >
                    ← Back to Dashboard
                </button>

                <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Details 📦</h1>

                <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="card p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Order #{order.id}</h2>
                                <p className="text-gray-600">{formatDateTime(order.createdAt)}</p>
                            </div>
                            <span className={`badge ${getStatusColor(order.status)} text-lg capitalize`}>
                                {order.status.replace('-', ' ')}
                            </span>
                        </div>

                        <div className="border-t pt-4">
                            <div className="text-3xl font-bold text-primary-600 mb-2">
                                {formatPrice(order.total)}
                            </div>
                            <div className="flex gap-4 text-sm">
                                <span className={`badge ${getStatusColor(order.paymentStatus)}`}>
                                    {order.paymentMethod.toUpperCase()} - {order.paymentStatus}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="card p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Information</h2>
                        <div className="space-y-3">
                            <div>
                                <div className="text-sm text-gray-600">Name</div>
                                <div className="font-bold text-lg">{order.userName}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Phone</div>
                                <div className="font-bold text-lg">{order.userPhone}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Delivery Address</div>
                                <div className="font-medium">
                                    <p>{order.deliveryAddress.street}</p>
                                    <p>{order.deliveryAddress.area}, {order.deliveryAddress.city}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate(`/delivery/map?order=${order.id}`)}
                            className="btn-primary mt-4 w-full"
                        >
                            Navigate to Address
                        </button>
                    </div>

                    {/* Order Items */}
                    <div className="card p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
                        <div className="space-y-3">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                    <div>
                                        <div className="font-medium">Item {idx + 1}</div>
                                        <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold">{formatPrice(item.price * item.quantity)}</div>
                                        <div className="text-sm text-gray-600">{formatPrice(item.price)} each</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Status Update Actions */}
                    {nextStatus && order.status !== 'delivered' && (
                        <div className="card p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Update Status</h2>
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleStatusUpdate(nextStatus)}
                                    disabled={updatingStatus}
                                    className="w-full btn-primary py-3 text-lg capitalize"
                                >
                                    {updatingStatus
                                        ? 'Updating...'
                                        : `Mark as ${nextStatus.replace('-', ' ')}`}
                                </button>

                                {nextStatus === 'delivered' && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-gray-700">
                                        ⚠️ Make sure you've collected payment if it's COD before marking as delivered.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {order.status === 'delivered' && (
                        <div className="card p-6 bg-green-50 border-green-200">
                            <div className="text-center">
                                <span className="text-5xl mb-3 block">✓</span>
                                <h3 className="text-xl font-bold text-green-800 mb-2">Order Delivered</h3>
                                <p className="text-green-700">This order has been successfully delivered.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeliveryOrderDetail;

import React, { useState } from 'react';
import { mockOrders, mockDeliveryBoys } from '../../mock';
import { formatDateTime, formatPrice, getStatusColor } from '../../utils/helpers';
import { showToast } from '../../hooks/useToast';

const AdminOrders: React.FC = () => {
    const [orders] = useState(mockOrders);
    const [filter, setFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(o => o.status === filter);

    const handleAssignDelivery = (deliveryBoyId: string) => {
        const deliveryBoy = mockDeliveryBoys.find(d => d.id === deliveryBoyId);
        showToast(`Order assigned to ${deliveryBoy?.name}`, 'success');
        setSelectedOrder(null);
    };

    const handleVerifyPayment = () => {
        showToast('Payment verified successfully', 'success');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-6 sm:mb-8">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Order Management</h1>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto">
                    {['all', 'pending', 'confirmed', 'on-the-way', 'delivered', 'cancelled'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-2 sm:px-3 md:px-4 py-2 rounded-lg font-medium capitalize whitespace-nowrap transition-all text-xs sm:text-sm ${filter === status
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {status === 'all' ? 'All Orders' : status.replace('-', ' ')}
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                <div className="space-y-3 sm:space-y-4">
                    {filteredOrders.map(order => (
                        <div key={order.id} className="card p-3 sm:p-4 md:p-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2">
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-800">Order #{order.id}</h3>
                                    <p className="text-xs sm:text-sm text-gray-500">{formatDateTime(order.createdAt)}</p>
                                </div>
                                <div className="flex gap-1 sm:gap-2">
                                    <span className={`badge ${getStatusColor(order.status)} capitalize text-xs`}>
                                        {order.status.replace('-', ' ')}
                                    </span>
                                    <span className={`badge ${getStatusColor(order.paymentStatus)} text-xs`}>
                                        {order.paymentStatus}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-3 sm:mb-4">
                                <div>
                                    <div className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Customer</div>
                                    <div className="font-bold text-sm sm:text-base">{order.userName}</div>
                                    <div className="text-xs sm:text-sm text-gray-600">{order.userPhone}</div>
                                </div>

                                <div>
                                    <div className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Amount</div>
                                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600">
                                        {formatPrice(order.total)}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {order.paymentMethod.toUpperCase()}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Delivery Boy</div>
                                    <div className="font-bold text-sm sm:text-base">
                                        {order.deliveryBoyName || 'Not Assigned'}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-3 sm:pt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                                {!order.deliveryBoyId && order.status !== 'cancelled' && (
                                    <button
                                        onClick={() => setSelectedOrder(order.id)}
                                        className="btn-primary text-xs sm:text-sm w-full sm:w-auto"
                                    >
                                        Assign Delivery Boy
                                    </button>
                                )}

                                {order.paymentMethod === 'bkash' && order.paymentStatus === 'pending' && (
                                    <button
                                        onClick={() => handleVerifyPayment()}
                                        className="btn-secondary text-xs sm:text-sm w-full sm:w-auto"
                                    >
                                        Verify Payment
                                    </button>
                                )}

                                {order.paymentMethod === 'bkash' && order.bkashTransactionId && (
                                    <div className="text-xs sm:text-sm">
                                        <span className="text-gray-600">TrxID: </span>
                                        <span className="font-mono font-bold">{order.bkashTransactionId}</span>
                                    </div>
                                )}
                            </div>

                            {/* Assign Delivery Boy Modal */}
                            {selectedOrder === order.id && (
                                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                                    <div className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Assign to:</div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                        {mockDeliveryBoys.filter(d => d.isAvailable).map(db => (
                                            <button
                                                key={db.id}
                                                onClick={() => handleAssignDelivery(db.id)}
                                                className="p-2 sm:p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-primary-600 transition-all text-left"
                                            >
                                                <div className="font-bold text-sm sm:text-base">{db.name}</div>
                                                <div className="text-xs sm:text-sm text-gray-600">
                                                    Rating: {db.rating} ⭐ • {db.totalDeliveries} deliveries
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="mt-2 sm:mt-3 text-gray-600 hover:text-gray-800 text-sm sm:text-base"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;

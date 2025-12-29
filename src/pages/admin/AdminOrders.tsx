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
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Management 📦</h1>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto">
                    {['all', 'pending', 'confirmed', 'on-the-way', 'delivered', 'cancelled'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg font-medium capitalize whitespace-nowrap transition-all ${filter === status
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {status === 'all' ? 'All Orders' : status.replace('-', ' ')}
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.map(order => (
                        <div key={order.id} className="card p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">Order #{order.id}</h3>
                                    <p className="text-sm text-gray-500">{formatDateTime(order.createdAt)}</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className={`badge ${getStatusColor(order.status)} capitalize`}>
                                        {order.status.replace('-', ' ')}
                                    </span>
                                    <span className={`badge ${getStatusColor(order.paymentStatus)}`}>
                                        {order.paymentStatus}
                                    </span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 mb-4">
                                <div>
                                    <div className="text-sm font-medium text-gray-700 mb-1">Customer</div>
                                    <div className="font-bold">{order.userName}</div>
                                    <div className="text-sm text-gray-600">{order.userPhone}</div>
                                </div>

                                <div>
                                    <div className="text-sm font-medium text-gray-700 mb-1">Amount</div>
                                    <div className="text-2xl font-bold text-primary-600">
                                        {formatPrice(order.total)}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {order.paymentMethod.toUpperCase()}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm font-medium text-gray-700 mb-1">Delivery Boy</div>
                                    <div className="font-bold">
                                        {order.deliveryBoyName || 'Not Assigned'}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4 flex gap-3">
                                {!order.deliveryBoyId && order.status !== 'cancelled' && (
                                    <button
                                        onClick={() => setSelectedOrder(order.id)}
                                        className="btn-primary"
                                    >
                                        Assign Delivery Boy
                                    </button>
                                )}

                                {order.paymentMethod === 'bkash' && order.paymentStatus === 'pending' && (
                                    <button
                                        onClick={() => handleVerifyPayment()}
                                        className="btn-secondary"
                                    >
                                        Verify Payment
                                    </button>
                                )}

                                {order.paymentMethod === 'bkash' && order.bkashTransactionId && (
                                    <div className="text-sm">
                                        <span className="text-gray-600">TrxID: </span>
                                        <span className="font-mono font-bold">{order.bkashTransactionId}</span>
                                    </div>
                                )}
                            </div>

                            {/* Assign Delivery Boy Modal */}
                            {selectedOrder === order.id && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="font-semibold mb-3">Assign to:</div>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {mockDeliveryBoys.filter(d => d.isAvailable).map(db => (
                                            <button
                                                key={db.id}
                                                onClick={() => handleAssignDelivery(db.id)}
                                                className="p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-primary-600 transition-all text-left"
                                            >
                                                <div className="font-bold">{db.name}</div>
                                                <div className="text-sm text-gray-600">
                                                    Rating: {db.rating} ⭐ • {db.totalDeliveries} deliveries
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="mt-3 text-gray-600 hover:text-gray-800"
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

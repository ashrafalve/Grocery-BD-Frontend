import React, { useState } from 'react';
import { mockOrders } from '../../mock';
import { formatDateTime, formatPrice, getStatusColor } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Orders: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [filter, setFilter] = useState<string>('all');

    const userOrders = mockOrders.filter(order => order.userId === user?.id);

    const filteredOrders = filter === 'all'
        ? userOrders
        : userOrders.filter(order => order.status === filter);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders 📦</h1>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto">
                    {['all', 'pending', 'confirmed', 'on-the-way', 'delivered'].map(status => (
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
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-12">
                        <span className="text-6xl mb-4 block">📦</span>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Found</h2>
                        <button onClick={() => navigate('/')} className="btn-primary">
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map(order => (
                            <div key={order.id} className="card p-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">Order #{order.id}</h3>
                                        <p className="text-sm text-gray-500">{formatDateTime(order.createdAt)}</p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                                        <span className={`badge ${getStatusColor(order.status)} capitalize`}>
                                            {order.status.replace('-', ' ')}
                                        </span>
                                        <span className={`badge ${getStatusColor(order.paymentStatus)}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-b border-gray-200 py-4 my-4">
                                    <div className="space-y-2">
                                        {order.items.slice(0, 2).map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-sm">
                                                <span className="text-gray-600">
                                                    Item {idx + 1} × {item.quantity}
                                                </span>
                                                <span className="font-medium">
                                                    {formatPrice(item.price * item.quantity)}
                                                </span>
                                            </div>
                                        ))}
                                        {order.items.length > 2 && (
                                            <div className="text-sm text-gray-500">
                                                +{order.items.length - 2} more items
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                                        <div className="text-2xl font-bold text-primary-600">
                                            {formatPrice(order.total)}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Payment: {order.paymentMethod.toUpperCase()}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-4 md:mt-0">
                                        <button
                                            onClick={() => navigate(`/track/${order.id}`)}
                                            className="btn-primary"
                                        >
                                            Track Order
                                        </button>
                                        {order.deliveryBoyName && (
                                            <div className="text-sm">
                                                <div className="text-gray-600">Delivery Boy</div>
                                                <div className="font-medium">{order.deliveryBoyName}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;

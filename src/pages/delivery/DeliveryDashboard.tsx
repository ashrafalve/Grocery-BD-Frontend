import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockOrders } from '../../mock';
import { useAuth } from '../../context/AuthContext';
import { formatDateTime, formatPrice, getStatusColor } from '../../utils/helpers';

const DeliveryDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Get orders assigned to this delivery boy
    const assignedOrders = mockOrders.filter(
        order => order.deliveryBoyId === user?.id && order.status !== 'delivered'
    );

    const completedToday = mockOrders.filter(
        order => order.deliveryBoyId === user?.id && order.status === 'delivered'
    ).length;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Delivery Dashboard 🚴</h1>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Active Deliveries</div>
                                <div className="text-3xl font-bold text-primary-600">{assignedOrders.length}</div>
                            </div>
                            <span className="text-4xl">📦</span>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Completed Today</div>
                                <div className="text-3xl font-bold text-green-600">{completedToday}</div>
                            </div>
                            <span className="text-4xl">✓</span>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Status</div>
                                <div className="text-lg font-bold text-primary-600">
                                    {assignedOrders.length > 0 ? 'On Delivery' : 'Available'}
                                </div>
                            </div>
                            <span className="text-4xl">{assignedOrders.length > 0 ? '🚴' : '✓'}</span>
                        </div>
                    </div>
                </div>

                {/* Active Orders */}
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Assigned Orders</h2>
                    <button
                        onClick={() => navigate('/delivery/map')}
                        className="btn-primary"
                    >
                        View Map
                    </button>
                </div>

                {assignedOrders.length === 0 ? (
                    <div className="card p-12 text-center">
                        <span className="text-6xl mb-4 block">🎉</span>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">All Caught Up!</h3>
                        <p className="text-gray-600">No active deliveries at the moment.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {assignedOrders.map(order => (
                            <div key={order.id} className="card p-6 hover:shadow-lg transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">Order #{order.id}</h3>
                                        <p className="text-sm text-gray-500">{formatDateTime(order.createdAt)}</p>
                                    </div>
                                    <span className={`badge ${getStatusColor(order.status)} capitalize mt-2 md:mt-0`}>
                                        {order.status.replace('-', ' ')}
                                    </span>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <div className="text-sm font-medium text-gray-700 mb-2">Customer</div>
                                        <div className="font-bold text-gray-800">{order.userName}</div>
                                        <div className="text-sm text-gray-600">{order.userPhone}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm font-medium text-gray-700 mb-2">Delivery Address</div>
                                        <div className="text-sm text-gray-700">
                                            <p>{order.deliveryAddress.street}</p>
                                            <p>{order.deliveryAddress.area}, {order.deliveryAddress.city}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Order Amount</div>
                                        <div className="text-2xl font-bold text-primary-600">
                                            {formatPrice(order.total)}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Payment: {order.paymentMethod.toUpperCase()} - {order.paymentStatus}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-4 md:mt-0">
                                        <button
                                            onClick={() => navigate(`/delivery/order/${order.id}`)}
                                            className="btn-primary"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => navigate(`/delivery/map?order=${order.id}`)}
                                            className="btn-secondary"
                                        >
                                            Navigate
                                        </button>
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

export default DeliveryDashboard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockOrders, mockProducts, mockUsers, mockDeliveryBoys } from '../../mock';
import { formatPrice } from '../../utils/helpers';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();

    const totalOrders = mockOrders.length;
    const pendingOrders = mockOrders.filter(o => o.status === 'pending' || o.status === 'confirmed').length;
    const completedOrders = mockOrders.filter(o => o.status === 'delivered').length;
    const totalRevenue = mockOrders
        .filter(o => o.status === 'delivered')
        .reduce((sum, order) => sum + order.total, 0);

    const recentOrders = mockOrders.slice(0, 5);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard 📊</h1>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card p-6 gradient-primary text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm opacity-90 mb-1">Total Revenue</div>
                                <div className="text-3xl font-bold">{formatPrice(totalRevenue)}</div>
                            </div>
                            <span className="text-4xl opacity-90">💰</span>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Total Orders</div>
                                <div className="text-3xl font-bold text-gray-800">{totalOrders}</div>
                            </div>
                            <span className="text-4xl">📦</span>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Pending Orders</div>
                                <div className="text-3xl font-bold text-yellow-600">{pendingOrders}</div>
                            </div>
                            <span className="text-4xl">⏳</span>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Completed</div>
                                <div className="text-3xl font-bold text-green-600">{completedOrders}</div>
                            </div>
                            <span className="text-4xl">✓</span>
                        </div>
                    </div>
                </div>

                {/* Additional Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Total Products</div>
                                <div className="text-2xl font-bold text-gray-800">{mockProducts.length}</div>
                            </div>
                            <span className="text-3xl">🛍️</span>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Total Users</div>
                                <div className="text-2xl font-bold text-gray-800">{mockUsers.length}</div>
                            </div>
                            <span className="text-3xl">👥</span>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Delivery Boys</div>
                                <div className="text-2xl font-bold text-gray-800">{mockDeliveryBoys.length}</div>
                            </div>
                            <span className="text-3xl">🚴</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <button
                        onClick={() => navigate('/admin/orders')}
                        className="btn-primary py-4"
                    >
                        Manage Orders
                    </button>
                    <button
                        onClick={() => navigate('/admin/products')}
                        className="btn-primary py-4"
                    >
                        Manage Products
                    </button>
                    <button
                        onClick={() => navigate('/admin/delivery-boys')}
                        className="btn-primary py-4"
                    >
                        Manage Delivery
                    </button>
                    <button
                        onClick={() => navigate('/admin/categories')}
                        className="btn-secondary py-4"
                    >
                        Manage Categories
                    </button>
                </div>

                {/* Recent Orders Table */}
                <div className="card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
                        <button
                            onClick={() => navigate('/admin/orders')}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            View All →
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map(order => (
                                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 font-medium">#{order.id}</td>
                                        <td className="py-3 px-4">{order.userName}</td>
                                        <td className="py-3 px-4 font-bold text-primary-600">{formatPrice(order.total)}</td>
                                        <td className="py-3 px-4">
                                            <span className="badge badge-info capitalize">
                                                {order.status.replace('-', ' ')}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="badge badge-warning">
                                                {order.paymentMethod.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

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
        <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-6 sm:mb-8">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                    <div className="card p-3 sm:p-4 md:p-6 gradient-primary text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xs sm:text-sm opacity-90 mb-1">Total Revenue</div>
                                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{formatPrice(totalRevenue)}</div>
                            </div>
                            <svg className="w-6 h-6 sm:w-8 sm:h-10 md:w-10 md:h-12 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="card p-3 sm:p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xs sm:text-sm text-gray-600 mb-1">Total Orders</div>
                                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">{totalOrders}</div>
                            </div>
                            <svg className="w-6 h-6 sm:w-8 sm:h-10 md:w-10 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                    </div>

                    <div className="card p-3 sm:p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xs sm:text-sm text-gray-600 mb-1">Pending Orders</div>
                                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-yellow-600">{pendingOrders}</div>
                            </div>
                            <svg className="w-6 h-6 sm:w-8 sm:h-10 md:w-10 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="card p-3 sm:p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xs sm:text-sm text-gray-600 mb-1">Completed</div>
                                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-600">{completedOrders}</div>
                            </div>
                            <svg className="w-6 h-6 sm:w-8 sm:h-10 md:w-10 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                    <div className="card p-3 sm:p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xs sm:text-sm text-gray-600 mb-1">Total Products</div>
                                <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{mockProducts.length}</div>
                            </div>
                            <svg className="w-5 h-5 sm:w-6 sm:h-8 md:w-8 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                    </div>

                    <div className="card p-3 sm:p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xs sm:text-sm text-gray-600 mb-1">Total Users</div>
                                <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{mockUsers.length}</div>
                            </div>
                            <svg className="w-5 h-5 sm:w-6 sm:h-8 md:w-8 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="card p-3 sm:p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xs sm:text-sm text-gray-600 mb-1">Delivery Boys</div>
                                <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{mockDeliveryBoys.length}</div>
                            </div>
                            <svg className="w-5 h-5 sm:w-6 sm:h-8 md:w-8 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
                    <button
                        onClick={() => navigate('/admin/orders')}
                        className="btn-primary py-3 px-2 text-xs sm:text-sm sm:py-4"
                    >
                        Manage Orders
                    </button>
                    <button
                        onClick={() => navigate('/admin/products')}
                        className="btn-primary py-3 px-2 text-xs sm:text-sm sm:py-4"
                    >
                        Manage Products
                    </button>
                    <button
                        onClick={() => navigate('/admin/delivery-boys')}
                        className="btn-primary py-3 px-2 text-xs sm:text-sm sm:py-4"
                    >
                        Manage Delivery
                    </button>
                    <button
                        onClick={() => navigate('/admin/categories')}
                        className="btn-secondary py-3 px-2 text-xs sm:text-sm sm:py-4"
                    >
                        Manage Categories
                    </button>
                </div>

                {/* Recent Orders Table */}
                <div className="card p-3 sm:p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Recent Orders</h2>
                        <button
                            onClick={() => navigate('/admin/orders')}
                            className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base self-start"
                        >
                            View All →
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[500px]">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Order ID</th>
                                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Customer</th>
                                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Amount</th>
                                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Status</th>
                                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map(order => (
                                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium text-xs sm:text-sm">#{order.id}</td>
                                            <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">{order.userName}</td>
                                            <td className="py-2 sm:py-3 px-2 sm:px-4 font-bold text-primary-600 text-xs sm:text-sm">{formatPrice(order.total)}</td>
                                            <td className="py-2 sm:py-3 px-2 sm:px-4">
                                                <span className="badge badge-info capitalize text-xs">
                                                    {order.status.replace('-', ' ')}
                                                </span>
                                            </td>
                                            <td className="py-2 sm:py-3 px-2 sm:px-4">
                                                <span className="badge badge-warning text-xs">
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
        </div>
    );
};

export default AdminDashboard;

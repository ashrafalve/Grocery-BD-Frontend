import React, { useState } from 'react';
import { mockDeliveryBoys, mockOrders } from '../../mock';
import { showToast } from '../../hooks/useToast';

const AdminDeliveryBoys: React.FC = () => {
    const [deliveryBoys] = useState(mockDeliveryBoys);

    const handleToggleAvailability = (name: string, currentStatus: boolean) => {
        showToast(`${name} marked as ${currentStatus ? 'unavailable' : 'available'}`, 'success');
    };

    const getActiveDeliveries = (dbId: string) => {
        return mockOrders.filter(
            o => o.deliveryBoyId === dbId && o.status !== 'delivered'
        ).length;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Delivery Boy Management 🚴</h1>
                    <button className="btn-primary text-xs sm:text-sm px-3 sm:px-4">
                        + Add Delivery Boy
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                    <div className="card p-3 sm:p-4 md:p-6">
                        <div className="text-xs sm:text-sm text-gray-600 mb-1">Total Delivery Boys</div>
                        <div className="text-2xl sm:text-3xl font-bold text-gray-800">{deliveryBoys.length}</div>
                    </div>
                    <div className="card p-3 sm:p-4 md:p-6">
                        <div className="text-xs sm:text-sm text-gray-600 mb-1">Available</div>
                        <div className="text-2xl sm:text-3xl font-bold text-green-600">
                            {deliveryBoys.filter(d => d.isAvailable).length}
                        </div>
                    </div>
                    <div className="card p-3 sm:p-4 md:p-6">
                        <div className="text-xs sm:text-sm text-gray-600 mb-1">On Delivery</div>
                        <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                            {deliveryBoys.filter(d => !d.isAvailable).length}
                        </div>
                    </div>
                </div>

{/* Delivery Boys Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {deliveryBoys.map(db => (
                        <div key={db.id} className="card p-3 sm:p-4 md:p-6">
                            <div className="flex items-start justify-between mb-3 sm:mb-4">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                        <span className="text-lg sm:text-2xl">🚴</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base sm:text-lg text-gray-800">{db.name}</h3>
                                        <p className="text-xs sm:text-sm text-gray-600">{db.phone}</p>
                                    </div>
                                </div>
                                <span className={`badge ${db.isAvailable ? 'badge-success' : 'badge-warning'} text-xs`}>
                                    {db.isAvailable ? 'Available' : 'Busy'}
                                </span>
                            </div>

                            <div className="space-y-2 mb-3 sm:mb-4">
                                <div className="flex justify-between text-xs sm:text-sm">
                                    <span className="text-gray-600">Total Deliveries</span>
                                    <span className="font-bold">{db.totalDeliveries}</span>
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm">
                                    <span className="text-gray-600">Rating</span>
                                    <span className="font-bold">{db.rating} ⭐</span>
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm">
                                    <span className="text-gray-600">Active Deliveries</span>
                                    <span className="font-bold text-primary-600">
                                        {getActiveDeliveries(db.id)}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t pt-3 sm:pt-4 flex gap-2">
                                <button
                                    onClick={() => handleToggleAvailability(db.name, db.isAvailable)}
                                    className={`flex-1 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm ${db.isAvailable
                                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                        }`}
                                >
                                    {db.isAvailable ? 'Set Unavailable' : 'Set Available'}
                                </button>
                                <button className="px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 text-xs sm:text-sm">
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDeliveryBoys;

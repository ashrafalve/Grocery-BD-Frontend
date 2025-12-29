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
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Delivery Boy Management 🚴</h1>
                    <button className="btn-primary">
                        + Add Delivery Boy
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="card p-6">
                        <div className="text-sm text-gray-600 mb-1">Total Delivery Boys</div>
                        <div className="text-3xl font-bold text-gray-800">{deliveryBoys.length}</div>
                    </div>
                    <div className="card p-6">
                        <div className="text-sm text-gray-600 mb-1">Available</div>
                        <div className="text-3xl font-bold text-green-600">
                            {deliveryBoys.filter(d => d.isAvailable).length}
                        </div>
                    </div>
                    <div className="card p-6">
                        <div className="text-sm text-gray-600 mb-1">On Delivery</div>
                        <div className="text-3xl font-bold text-blue-600">
                            {deliveryBoys.filter(d => !d.isAvailable).length}
                        </div>
                    </div>
                </div>

                {/* Delivery Boys Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {deliveryBoys.map(db => (
                        <div key={db.id} className="card p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">🚴</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{db.name}</h3>
                                        <p className="text-sm text-gray-600">{db.phone}</p>
                                    </div>
                                </div>
                                <span className={`badge ${db.isAvailable ? 'badge-success' : 'badge-warning'}`}>
                                    {db.isAvailable ? 'Available' : 'Busy'}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Total Deliveries</span>
                                    <span className="font-bold">{db.totalDeliveries}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Rating</span>
                                    <span className="font-bold">{db.rating} ⭐</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Active Deliveries</span>
                                    <span className="font-bold text-primary-600">
                                        {getActiveDeliveries(db.id)}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t pt-4 flex gap-2">
                                <button
                                    onClick={() => handleToggleAvailability(db.name, db.isAvailable)}
                                    className={`flex-1 py-2 rounded-lg font-medium transition-all ${db.isAvailable
                                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                        }`}
                                >
                                    {db.isAvailable ? 'Set Unavailable' : 'Set Available'}
                                </button>
                                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700">
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

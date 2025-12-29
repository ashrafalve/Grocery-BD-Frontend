import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { Icon, type LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockOrders } from '../../mock';
import { formatDateTime, formatPrice, getStatusColor } from '../../utils/helpers';

// Fix for default marker icons in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

const OrderTracking: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [deliveryLocation, setDeliveryLocation] = useState<LatLngExpression>([23.7565, 90.3890]);
    const mapRef = useRef<any>(null);

    const order = mockOrders.find(o => o.id === orderId);

    useEffect(() => {
        if (!order || order.status === 'delivered') return;

        // Simulate delivery boy movement
        const interval = setInterval(() => {
            setDeliveryLocation(prev => {
                const [lat, lng] = prev as [number, number];
                const destLat = order.deliveryAddress.coordinates.lat;
                const destLng = order.deliveryAddress.coordinates.lng;

                // Move 10% closer to destination
                const newLat = lat + (destLat - lat) * 0.1;
                const newLng = lng + (destLng - lng) * 0.1;

                return [newLat, newLng];
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [order]);

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h2>
                </div>
            </div>
        );
    }

    const deliveryAddress: LatLngExpression = [
        order.deliveryAddress.coordinates.lat,
        order.deliveryAddress.coordinates.lng,
    ];

    const statusSteps = [
        { status: 'pending', label: 'Order Placed', icon: '📝' },
        { status: 'confirmed', label: 'Confirmed', icon: '✓' },
        { status: 'picked', label: 'Picked Up', icon: '📦' },
        { status: 'on-the-way', label: 'On The Way', icon: '🚴' },
        { status: 'delivered', label: 'Delivered', icon: '✓' },
    ];

    const currentStepIndex = statusSteps.findIndex(s => s.status === order.status);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Track Order 📍</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Order Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Order Details */}
                        <div className="card p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-sm text-gray-600">Order ID</div>
                                    <div className="font-bold">{order.id}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Status</div>
                                    <span className={`badge ${getStatusColor(order.status)} capitalize inline-block mt-1`}>
                                        {order.status.replace('-', ' ')}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Total Amount</div>
                                    <div className="text-2xl font-bold text-primary-600">
                                        {formatPrice(order.total)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Ordered On</div>
                                    <div className="font-medium">{formatDateTime(order.createdAt)}</div>
                                </div>
                                {order.estimatedDelivery && (
                                    <div>
                                        <div className="text-sm text-gray-600">Estimated Delivery</div>
                                        <div className="font-medium text-primary-600">
                                            {formatDateTime(order.estimatedDelivery)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Delivery Boy Info */}
                        {order.deliveryBoyName && (
                            <div className="card p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Boy</h2>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">👤</span>
                                    </div>
                                    <div>
                                        <div className="font-bold">{order.deliveryBoyName}</div>
                                        <div className="text-sm text-gray-600">Delivering your order</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Delivery Address */}
                        <div className="card p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Address</h2>
                            <div className="space-y-1 text-gray-700">
                                <p>{order.deliveryAddress.street}</p>
                                <p>{order.deliveryAddress.area}, {order.deliveryAddress.city}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Map & Timeline */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Live Map */}
                        <div className="card p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Live Tracking 🗺️</h2>
                            <div className="h-96 rounded-lg overflow-hidden">
                                <MapContainer
                                    center={deliveryLocation}
                                    zoom={13}
                                    style={{ height: '100%', width: '100%' }}
                                    ref={mapRef}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    {/* Delivery Boy Location */}
                                    <Marker position={deliveryLocation}>
                                        <Popup>
                                            <div className="text-center">
                                                <div className="font-bold">Delivery Boy</div>
                                                <div className="text-sm">{order.deliveryBoyName}</div>
                                            </div>
                                        </Popup>
                                    </Marker>

                                    {/* Delivery Address */}
                                    <Marker position={deliveryAddress}>
                                        <Popup>
                                            <div className="text-center">
                                                <div className="font-bold">Your Location</div>
                                                <div className="text-sm">{order.deliveryAddress.area}</div>
                                            </div>
                                        </Popup>
                                    </Marker>

                                    {/* Route Line */}
                                    <Polyline
                                        positions={[deliveryLocation, deliveryAddress]}
                                        color="blue"
                                        weight={3}
                                        opacity={0.7}
                                        dashArray="10, 10"
                                    />
                                </MapContainer>
                            </div>
                        </div>

                        {/* Order Timeline */}
                        <div className="card p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Timeline</h2>
                            <div className="space-y-6">
                                {statusSteps.map((step, index) => {
                                    const isCompleted = index <= currentStepIndex;
                                    const isCurrent = index === currentStepIndex;

                                    return (
                                        <div key={step.status} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center ${isCompleted
                                                        ? 'bg-primary-600 text-white'
                                                        : 'bg-gray-200 text-gray-400'
                                                        } ${isCurrent ? 'ring-4 ring-primary-200' : ''}`}
                                                >
                                                    <span className="text-xl">{step.icon}</span>
                                                </div>
                                                {index < statusSteps.length - 1 && (
                                                    <div
                                                        className={`w-1 h-12 ${isCompleted ? 'bg-primary-600' : 'bg-gray-200'
                                                            }`}
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-8">
                                                <div
                                                    className={`font-bold ${isCompleted ? 'text-gray-800' : 'text-gray-400'
                                                        }`}
                                                >
                                                    {step.label}
                                                </div>
                                                {isCurrent && (
                                                    <div className="text-sm text-primary-600 mt-1">
                                                        Current Status
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;

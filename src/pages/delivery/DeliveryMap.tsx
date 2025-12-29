import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { Icon, type LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockOrders } from '../../mock';
import { useAuth } from '../../context/AuthContext';

// Fix for default marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

const DeliveryMap: React.FC = () => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.get('order');

    // Simulated current location (delivery boy)
    const [currentLocation, setCurrentLocation] = useState<LatLngExpression>([23.7565, 90.3890]);

    const assignedOrders = mockOrders.filter(
        order => order.deliveryBoyId === user?.id && order.status !== 'delivered'
    );

    const selectedOrder = orderId
        ? assignedOrders.find(o => o.id === orderId)
        : assignedOrders[0];

    // Simulate GPS movement
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLocation(prev => {
                const [lat, lng] = prev as [number, number];
                return [lat + (Math.random() - 0.5) * 0.001, lng + (Math.random() - 0.5) * 0.001];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Delivery Map 🗺️</h1>
                    <button
                        onClick={() => navigate('/delivery')}
                        className="btn-secondary"
                    >
                        Back to Dashboard
                    </button>
                </div>

                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Sidebar - Orders List */}
                    <div className="lg:col-span-1">
                        <div className="card p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                            <h2 className="font-bold text-gray-800 mb-4">Active Deliveries ({assignedOrders.length})</h2>

                            {assignedOrders.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No active deliveries
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {assignedOrders.map(order => (
                                        <div
                                            key={order.id}
                                            onClick={() => navigate(`/delivery/map?order=${order.id}`)}
                                            className={`p-3 rounded-lg cursor-pointer transition-all ${selectedOrder?.id === order.id
                                                ? 'bg-primary-100 border-2 border-primary-600'
                                                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                                                }`}
                                        >
                                            <div className="font-bold text-sm">Order #{order.id}</div>
                                            <div className="text-xs text-gray-600 mt-1">{order.userName}</div>
                                            <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                                                {order.deliveryAddress.area}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Map */}
                    <div className="lg:col-span-3">
                        <div className="card p-6">
                            {selectedOrder ? (
                                <>
                                    <div className="mb-4 flex justify-between items-center">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">
                                                Delivering to: {selectedOrder.userName}
                                            </h2>
                                            <p className="text-sm text-gray-600">
                                                {selectedOrder.deliveryAddress.street}, {selectedOrder.deliveryAddress.area}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/delivery/order/${selectedOrder.id}`)}
                                            className="btn-primary"
                                        >
                                            View Details
                                        </button>
                                    </div>

                                    <div className="h-[600px] rounded-lg overflow-hidden">
                                        <MapContainer
                                            center={currentLocation}
                                            zoom={14}
                                            style={{ height: '100%', width: '100%' }}
                                        >
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />

                                            {/* Current Location (Delivery Boy) */}
                                            <Marker position={currentLocation}>
                                                <Popup>
                                                    <div className="text-center">
                                                        <div className="font-bold">Your Location</div>
                                                        <div className="text-sm">Delivery in progress</div>
                                                    </div>
                                                </Popup>
                                            </Marker>

                                            {/* All Delivery Locations */}
                                            {assignedOrders.map(order => {
                                                const destination: LatLngExpression = [
                                                    order.deliveryAddress.coordinates.lat,
                                                    order.deliveryAddress.coordinates.lng,
                                                ];

                                                return (
                                                    <React.Fragment key={order.id}>
                                                        <Marker position={destination}>
                                                            <Popup>
                                                                <div className="text-center">
                                                                    <div className="font-bold">{order.userName}</div>
                                                                    <div className="text-sm">{order.deliveryAddress.area}</div>
                                                                    <div className="text-xs text-gray-600">Order #{order.id}</div>
                                                                </div>
                                                            </Popup>
                                                        </Marker>

                                                        {selectedOrder.id === order.id && (
                                                            <Polyline
                                                                positions={[currentLocation, destination]}
                                                                color="blue"
                                                                weight={3}
                                                                opacity={0.7}
                                                                dashArray="10, 10"
                                                            />
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </MapContainer>
                                    </div>
                                </>
                            ) : (
                                <div className="h-[600px] flex items-center justify-center text-gray-500">
                                    <div className="text-center">
                                        <span className="text-6xl mb-4 block">🗺️</span>
                                        <p>No active deliveries to show on map</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryMap;

import type { User, DeliveryBoy, Order } from '../types';

// Mock Users
export const mockUsers: User[] = [
    {
        id: 'user1',
        name: 'Rahim Ahmed',
        email: 'rahim@example.com',
        phone: '01712345678',
        role: 'user',
        address: {
            street: 'House 12, Road 5, Dhanmondi',
            city: 'Dhaka',
            area: 'Dhanmondi',
            coordinates: {
                lat: 23.7461,
                lng: 90.3742,
            },
        },
        createdAt: '2024-01-15T10:00:00Z',
    },
    {
        id: 'user2',
        name: 'Fatima Begum',
        email: 'fatima@example.com',
        phone: '01823456789',
        role: 'user',
        address: {
            street: 'Flat 3B, Gulshan Avenue',
            city: 'Dhaka',
            area: 'Gulshan',
            coordinates: {
                lat: 23.7806,
                lng: 90.4193,
            },
        },
        createdAt: '2024-02-10T14:30:00Z',
    },
];

// Mock Admin
export const mockAdmin: User = {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@grocerybd.com',
    phone: '01900000000',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
};

// Mock Delivery Boys
export const mockDeliveryBoys: DeliveryBoy[] = [
    {
        id: 'delivery1',
        name: 'Karim Rahman',
        email: 'karim@example.com',
        phone: '01934567890',
        currentLocation: {
            lat: 23.7565,
            lng: 90.3890,
        },
        isAvailable: true,
        totalDeliveries: 145,
        rating: 4.8,
    },
    {
        id: 'delivery2',
        name: 'Selim Hossain',
        email: 'selim@example.com',
        phone: '01845678901',
        currentLocation: {
            lat: 23.7689,
            lng: 90.4012,
        },
        isAvailable: true,
        totalDeliveries: 98,
        rating: 4.6,
    },
    {
        id: 'delivery3',
        name: 'Monir Islam',
        email: 'monir@example.com',
        phone: '01756789012',
        currentLocation: {
            lat: 23.7425,
            lng: 90.3850,
        },
        isAvailable: false,
        activeOrderId: 'order1',
        totalDeliveries: 203,
        rating: 4.9,
    },
];

// Mock Orders
export const mockOrders: Order[] = [
    {
        id: 'order1',
        userId: 'user1',
        userName: 'Rahim Ahmed',
        userPhone: '01712345678',
        items: [
            { productId: 'prod1', quantity: 2, price: 40 },
            { productId: 'prod5', quantity: 1, price: 180 },
            { productId: 'prod9', quantity: 3, price: 70 },
        ],
        total: 470,
        deliveryAddress: {
            street: 'House 12, Road 5, Dhanmondi',
            city: 'Dhaka',
            area: 'Dhanmondi',
            coordinates: {
                lat: 23.7461,
                lng: 90.3742,
            },
        },
        paymentMethod: 'bkash',
        paymentStatus: 'verified',
        status: 'on-the-way',
        deliveryBoyId: 'delivery3',
        deliveryBoyName: 'Monir Islam',
        bkashTransactionId: 'BKX123456789',
        createdAt: '2025-12-29T10:30:00Z',
        updatedAt: '2025-12-29T11:00:00Z',
        estimatedDelivery: '2025-12-29T12:30:00Z',
    },
    {
        id: 'order2',
        userId: 'user2',
        userName: 'Fatima Begum',
        userPhone: '01823456789',
        items: [
            { productId: 'prod15', quantity: 5, price: 85 },
            { productId: 'prod12', quantity: 2, price: 180 },
        ],
        total: 785,
        deliveryAddress: {
            street: 'Flat 3B, Gulshan Avenue',
            city: 'Dhaka',
            area: 'Gulshan',
            coordinates: {
                lat: 23.7806,
                lng: 90.4193,
            },
        },
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        status: 'confirmed',
        deliveryBoyId: 'delivery1',
        deliveryBoyName: 'Karim Rahman',
        createdAt: '2025-12-29T09:15:00Z',
        updatedAt: '2025-12-29T09:20:00Z',
        estimatedDelivery: '2025-12-29T13:00:00Z',
    },
    {
        id: 'order3',
        userId: 'user1',
        userName: 'Rahim Ahmed',
        userPhone: '01712345678',
        items: [
            { productId: 'prod7', quantity: 3, price: 120 },
            { productId: 'prod10', quantity: 1, price: 450 },
        ],
        total: 810,
        deliveryAddress: {
            street: 'House 12, Road 5, Dhanmondi',
            city: 'Dhaka',
            area: 'Dhanmondi',
            coordinates: {
                lat: 23.7461,
                lng: 90.3742,
            },
        },
        paymentMethod: 'bkash',
        paymentStatus: 'pending',
        status: 'pending',
        createdAt: '2025-12-29T11:45:00Z',
        updatedAt: '2025-12-29T11:45:00Z',
    },
    {
        id: 'order4',
        userId: 'user2',
        userName: 'Fatima Begum',
        userPhone: '01823456789',
        items: [
            { productId: 'prod2', quantity: 5, price: 30 },
            { productId: 'prod3', quantity: 2, price: 50 },
        ],
        total: 250,
        deliveryAddress: {
            street: 'Flat 3B, Gulshan Avenue',
            city: 'Dhaka',
            area: 'Gulshan',
            coordinates: {
                lat: 23.7806,
                lng: 90.4193,
            },
        },
        paymentMethod: 'cod',
        paymentStatus: 'completed',
        status: 'delivered',
        deliveryBoyId: 'delivery2',
        deliveryBoyName: 'Selim Hossain',
        createdAt: '2025-12-28T14:20:00Z',
        updatedAt: '2025-12-28T17:30:00Z',
    },
];

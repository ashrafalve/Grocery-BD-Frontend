// User Types
export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'user' | 'admin' | 'delivery';
    address?: {
        street: string;
        city: string;
        area: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    createdAt: string;
}

// Product Types
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    unit: string;
    image: string;
    categoryId: string;
    stock: number;
    discount?: number;
    rating?: number;
    reviews?: number;
}

// Category Types
export interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
    icon: string;
}

// Cart Types
export interface CartItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface Cart {
    userId: string;
    items: CartItem[];
    total: number;
}

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'picked' | 'on-the-way' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'bkash';
export type PaymentStatus = 'pending' | 'verified' | 'completed' | 'failed';

export interface Order {
    id: string;
    userId: string;
    userName: string;
    userPhone: string;
    items: CartItem[];
    total: number;
    deliveryAddress: {
        street: string;
        city: string;
        area: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    status: OrderStatus;
    deliveryBoyId?: string;
    deliveryBoyName?: string;
    bkashTransactionId?: string;
    createdAt: string;
    updatedAt: string;
    estimatedDelivery?: string;
}

// Delivery Boy Types
export interface DeliveryBoy {
    id: string;
    name: string;
    email: string;
    phone: string;
    currentLocation?: {
        lat: number;
        lng: number;
    };
    isAvailable: boolean;
    activeOrderId?: string;
    totalDeliveries: number;
    rating: number;
}

// Location Types
export interface Location {
    lat: number;
    lng: number;
    timestamp: number;
}

// Dashboard Stats
export interface DashboardStats {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    totalRevenue: number;
    totalProducts: number;
    totalUsers: number;
    totalDeliveryBoys: number;
}

// Notification Types
export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    createdAt: string;
}

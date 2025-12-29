import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import { mockUsers, mockAdmin, mockDeliveryBoys } from '../mock';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string, role: 'user' | 'admin' | 'delivery') => Promise<boolean>;
    register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string, role: 'user' | 'admin' | 'delivery'): Promise<boolean> => {
        // Mock login logic
        let foundUser: User | null = null;

        if (role === 'admin') {
            if (email === 'admin@grocerybd.com' && password === 'admin123') {
                foundUser = mockAdmin;
            }
        } else if (role === 'delivery') {
            const deliveryBoy = mockDeliveryBoys.find(d => d.email === email);
            if (deliveryBoy && password === 'delivery123') {
                foundUser = {
                    id: deliveryBoy.id,
                    name: deliveryBoy.name,
                    email: deliveryBoy.email,
                    phone: deliveryBoy.phone,
                    role: 'delivery',
                    createdAt: new Date().toISOString(),
                };
            }
        } else {
            const regularUser = mockUsers.find(u => u.email === email);
            if (regularUser && password === 'user123') {
                foundUser = regularUser;
            }
        }

        if (foundUser) {
            setUser(foundUser);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(foundUser));
            return true;
        }

        return false;
    };

    const register = async (name: string, email: string, phone: string, _password: string): Promise<boolean> => {
        // Mock registration
        const newUser: User = {
            id: `user${Date.now()}`,
            name,
            email,
            phone,
            role: 'user',
            createdAt: new Date().toISOString(),
        };

        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

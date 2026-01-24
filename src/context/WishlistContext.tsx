import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../types';
import { mockProducts } from '../mock';
import { showToast } from '../hooks/useToast';

interface WishlistContextType {
    wishlist: string[];
    addToWishlist: (productId: string, productName: string) => void;
    removeFromWishlist: (productId: string, productName: string) => void;
    toggleWishlist: (productId: string, productName: string) => void;
    isInWishlist: (productId: string) => boolean;
    getWishlistProducts: () => Product[];
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<string[]>([]);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (productId: string, productName: string) => {
        if (wishlist.includes(productId)) {
            showToast(`${productName} is already in your wishlist`, 'info');
            return;
        }

        setWishlist(prev => [...prev, productId]);
        showToast(`${productName} added to wishlist`, 'success');
    };

    const removeFromWishlist = (productId: string, productName: string) => {
        setWishlist(prev => prev.filter(id => id !== productId));
        showToast(`${productName} removed from wishlist`, 'info');
    };

    const toggleWishlist = (productId: string, productName: string) => {
        if (wishlist.includes(productId)) {
            removeFromWishlist(productId, productName);
        } else {
            addToWishlist(productId, productName);
        }
    };

    const isInWishlist = (productId: string) => {
        return wishlist.includes(productId);
    };

    const getWishlistProducts = () => {
        return wishlist
            .map(productId => mockProducts.find(p => p.id === productId))
            .filter(Boolean) as Product[];
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            toggleWishlist,
            isInWishlist,
            getWishlistProducts,
            clearWishlist,
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
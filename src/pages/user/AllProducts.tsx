import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockProducts, mockCategories } from '../../mock';
import ProductCard from '../../components/ProductCard';
import { ProductCardSkeleton } from '../../components/Skeleton';

const AllProducts: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [loading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'newest'>('name');

    // Read category from URL query params on component mount
    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
        }
    }, [searchParams]);

    const filteredProducts = selectedCategory
        ? mockProducts.filter(p => p.categoryId === selectedCategory)
        : mockProducts;

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'newest':
                return b.id.localeCompare(a.id);
            default:
                return 0;
        }
    });

    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                    <div className="flex items-center gap-2">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                            All Products
                        </h1>
                    </div>
                    <div className="text-sm sm:text-base text-gray-600">
                        Showing {sortedProducts.length} products
                    </div>
                </div>

                {/* Filters and Sorting */}
                <div className="card p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                        {/* Category Filter */}
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                Filter by Category
                            </label>
                            <select
                                value={selectedCategory || 'all'}
                                onChange={(e) => setSelectedCategory(e.target.value === 'all' ? null : e.target.value)}
                                className="input-field text-xs sm:text-sm"
                            >
                                <option value="all">All Categories</option>
                                {mockCategories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                            {/* Sort Options */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="input-field text-sm"
                            >
                                <option value="name">Name (A-Z)</option>
                                <option value="price-low">Price (Low to High)</option>
                                <option value="price-high">Price (High to Low)</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>

                        {/* Clear Filters */}
                        <div className="flex items-end">
                            {selectedCategory && (
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="w-full btn-secondary text-xs sm:text-sm"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Active Filter Display */}
                {selectedCategory && (
                    <div className="mb-6 flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-gray-600">Active Filters:</span>
                        <span className="badge badge-info text-sm">
                            {mockCategories.find(c => c.id === selectedCategory)?.name}
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="ml-2 text-white hover:text-gray-200"
                            >
                                ×
                            </button>
                        </span>
                    </div>
                )}

                {/* Products Grid */}
                {sortedProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-base sm:text-lg">No products found in this category</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                        {loading ? (
                            Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
                        ) : (
                            sortedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
import React, { useState } from 'react';
import { mockCategories, mockProducts } from '../../mock';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';
import { CategoryCardSkeleton, ProductCardSkeleton } from '../../components/Skeleton';

const Home: React.FC = () => {
    const [loading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredProducts = selectedCategory
        ? mockProducts.filter(p => p.categoryId === selectedCategory)
        : mockProducts;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="gradient-primary text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
                            Fresh Groceries Delivered to Your Doorstep 🛒
                        </h1>
                        <p className="text-lg md:text-xl text-green-100 mb-8">
                            Shop from the best local markets in Bangladesh
                        </p>
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-700 hover:bg-primary-800 text-white px-6 py-2 rounded-full transition-colors">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Categories Section */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
                        {selectedCategory && (
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                                View All
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {loading ? (
                            Array.from({ length: 8 }).map((_, i) => <CategoryCardSkeleton key={i} />)
                        ) : (
                            mockCategories.map(category => (
                                <div
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className="cursor-pointer"
                                >
                                    <CategoryCard category={category} />
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Featured Products Section */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {selectedCategory
                                ? `${mockCategories.find(c => c.id === selectedCategory)?.name} Products`
                                : 'All Products'}
                        </h2>
                        <span className="text-gray-600">{filteredProducts.length} items</span>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No products found in this category</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {loading ? (
                                Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
                            ) : (
                                filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            )}
                        </div>
                    )}
                </section>

                {/* Promotional Banner */}
                <section className="mt-16 bg-gradient-to-r from-secondary-400 to-secondary-300 rounded-2xl p-8 md:p-12 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0">
                            <h2 className="text-3xl font-bold mb-2">Special Offer! 🎉</h2>
                            <p className="text-lg">Get 15% off on your first order</p>
                            <p className="text-sm mt-2 opacity-90">Use code: WELCOME15</p>
                        </div>
                        <button className="bg-white text-secondary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors">
                            Shop Now
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;

import React, { useState } from 'react';
import { mockCategories, mockProducts } from '../../mock';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';
import { CategoryCardSkeleton, ProductCardSkeleton } from '../../components/Skeleton';
import SlideBanner from '../../components/SlideBanner';

const Home: React.FC = () => {
    const [loading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = mockProducts.filter(p => {
        const matchesCategory = selectedCategory ? p.categoryId === selectedCategory : true;
        const matchesSearch = searchTerm
            ? p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              p.description.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            {/* Sliding Banner */}
            <div className="py-6 sm:py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                    <SlideBanner
                        slides={[
                            {
                                id: 1,
                                title: "🔥 Flash Sale!",
                                subtitle: "Get up to 50% off on selected items",
                                buttonText: "Shop Now",
                                backgroundColor: "bg-gradient-to-r from-red-500 to-orange-500"
                            },
                            {
                                id: 2,
                                title: "🥬 Fresh Vegetables",
                                subtitle: "Farm-fresh organic vegetables delivered daily",
                                buttonText: "Explore Veggies",
                                backgroundColor: "bg-gradient-to-r from-green-500 to-green-600"
                            },
                            {
                                id: 3,
                                title: "🍎 Special Offer!",
                                subtitle: "Free delivery on orders above ৳500",
                                buttonText: "Order Now",
                                backgroundColor: "bg-gradient-to-r from-purple-500 to-indigo-600"
                            }
                        ]}
                    />
                </div>
            </div>

            {/* Original Hero Section */}
            <div className="gradient-primary text-white py-6 sm:py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 animate-fadeIn">
                            Fresh Groceries Delivered 🛒
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-green-100 mb-6 sm:mb-8">
                            Shop from the best local markets in Bangladesh
                        </p>
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-primary-300 text-sm sm:text-base"
                                />
                                <button
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-700 hover:bg-primary-800 text-white px-4 sm:px-6 py-2 rounded-full transition-colors text-sm sm:text-base"
                                    type="button"
                                    onClick={() => setSearchTerm('')}
                                >
                                    {searchTerm ? 'Clear' : 'Search'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
                {/* Categories Section */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Shop by Category</h2>
                        {selectedCategory && (
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base"
                            >
                                View All
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4">
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
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                            {selectedCategory
                                ? `${mockCategories.find(c => c.id === selectedCategory)?.name} Products`
                                : 'All Products'}
                        </h2>
                        <span className="text-gray-600 text-sm sm:text-base">{filteredProducts.length} items</span>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-base sm:text-lg">No products found in this category</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
                <section className="mt-8 sm:mt-12 md:mt-16 bg-gradient-to-r from-secondary-400 to-secondary-300 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-4 md:mb-0 text-center md:text-left">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Special Offer! 🎉</h2>
                            <p className="text-sm sm:text-base md:text-lg">Get 15% off on your first order</p>
                            <p className="text-xs sm:text-sm mt-2 opacity-90">Use code: WELCOME15</p>
                        </div>
                        <button className="bg-white text-secondary-600 hover:bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold transition-colors text-sm sm:text-base">
                            Shop Now
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;

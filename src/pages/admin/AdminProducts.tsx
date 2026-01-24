import React, { useState } from 'react';
import { mockProducts, mockCategories } from '../../mock';
import { formatPrice } from '../../utils/helpers';
import { showToast } from '../../hooks/useToast';

const AdminProducts: React.FC = () => {
    const [products] = useState(mockProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDeleteProduct = (name: string) => {
        showToast(`${name} deleted successfully`, 'success');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Product Management 🛍️</h1>
                    <button className="btn-primary text-xs sm:text-sm px-3 sm:px-4">
                        + Add New Product
                    </button>
                </div>

                {/* Filters */}
                <div className="card p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                Search Products
                            </label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-field text-xs sm:text-sm"
                                placeholder="Search by product name..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                Filter by Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="input-field text-xs sm:text-sm"
                            >
                                <option value="all">All Categories</option>
                                {mockCategories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="card p-3 sm:p-4 md:p-6">
                    <div className="mb-3 sm:mb-4 text-gray-600 text-sm sm:text-base">
                        Showing {filteredProducts.length} of {products.length} products
                    </div>

                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Image</th>
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Name</th>
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Price</th>
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Stock</th>
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Category</th>
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(product => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded"
                                            />
                                        </td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                                            <div className="font-medium text-xs sm:text-sm">{product.name}</div>
                                            <div className="text-sm sm:text-sm text-gray-500">{product.unit}</div>
                                        </td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-4 font-bold text-primary-600 text-xs sm:text-sm">
                                            {formatPrice(product.price)}
                                        </td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                                            <span className={`badge ${product.stock < 10 ? 'badge-warning' : 'badge-success'} text-xs`}>
                                                {product.stock} {product.unit}
                                            </span>
                                        </td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                                            {mockCategories.find(c => c.id === product.categoryId)?.name}
                                        </td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                                            <div className="flex gap-1 sm:gap-2">
                                                <button className="text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm">
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.name)}
                                                    className="text-red-600 hover:text-red-700 font-medium text-xs sm:text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
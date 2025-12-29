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
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Product Management 🛍️</h1>
                    <button className="btn-primary">
                        + Add New Product
                    </button>
                </div>

                {/* Filters */}
                <div className="card p-6 mb-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Products
                            </label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-field"
                                placeholder="Search by product name..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="input-field"
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
                <div className="card p-6">
                    <div className="mb-4 text-gray-600">
                        Showing {filteredProducts.length} of {products.length} products
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Image</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(product => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="font-medium">{product.name}</div>
                                            <div className="text-sm text-gray-500">{product.unit}</div>
                                        </td>
                                        <td className="py-3 px-4 font-bold text-primary-600">
                                            {formatPrice(product.price)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`badge ${product.stock < 10 ? 'badge-warning' : 'badge-success'}`}>
                                                {product.stock} {product.unit}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            {mockCategories.find(c => c.id === product.categoryId)?.name}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <button className="text-blue-600 hover:text-blue-700 font-medium">
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.name)}
                                                    className="text-red-600 hover:text-red-700 font-medium"
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

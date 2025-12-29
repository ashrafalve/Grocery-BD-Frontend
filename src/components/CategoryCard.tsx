import React from 'react';
import { Link } from 'react-router-dom';
import type { Category } from '../types';

interface CategoryCardProps {
    category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    return (
        <Link to={`/category/${category.id}`}>
            <div className="card p-6 text-center group hover:shadow-lg hover:scale-105 transition-all duration-200">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-200">
                    <span className="text-4xl">{category.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                    {category.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{category.description}</p>
            </div>
        </Link>
    );
};

export default CategoryCard;

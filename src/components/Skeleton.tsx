import React from 'react';

interface SkeletonProps {
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
    return (
        <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
    );
};

export const ProductCardSkeleton: React.FC = () => {
    return (
        <div className="card p-4">
            <Skeleton className="w-full h-48 mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-10 w-24" />
            </div>
        </div>
    );
};

export const CategoryCardSkeleton: React.FC = () => {
    return (
        <div className="card p-4 text-center">
            <Skeleton className="w-16 h-16 rounded-full mx-auto mb-3" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>
    );
};

export default Skeleton;

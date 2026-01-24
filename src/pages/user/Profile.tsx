import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile: React.FC = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-3 mb-8">
                    <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                </div>

                <div className="space-y-6">
                    {/* Personal Information */}
                    <div className="card p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={user.name}
                                    className="input-field"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={user.email}
                                    className="input-field"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={user.phone}
                                    className="input-field"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Account Type
                                </label>
                                <input
                                    type="text"
                                    value={user.role.toUpperCase()}
                                    className="input-field capitalize"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    {/* Delivery Address */}
                    {user.address && (
                        <div className="card p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Delivery Address</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Street Address
                                    </label>
                                    <input
                                        type="text"
                                        value={user.address.street}
                                        className="input-field"
                                        readOnly
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Area
                                        </label>
                                        <input
                                            type="text"
                                            value={user.address.area}
                                            className="input-field"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            value={user.address.city}
                                            className="input-field"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Account Actions */}
                    <div className="card p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Account Actions</h2>
                        <div className="space-y-3">
                            <button className="w-full md:w-auto btn-primary">
                                Edit Profile
                            </button>
                            <button className="w-full md:w-auto btn-secondary ml-0 md:ml-3">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

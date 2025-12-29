import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { showToast } from '../../hooks/useToast';
import { validateEmail } from '../../utils/helpers';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'user' | 'admin' | 'delivery'>('user');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            showToast('Invalid email address', 'error');
            return;
        }

        if (password.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return;
        }

        setLoading(true);

        const success = await login(email, password, role);

        setLoading(false);

        if (success) {
            showToast('Login successful!', 'success');

            // Navigate based on role
            if (role === 'admin') {
                navigate('/admin');
            } else if (role === 'delivery') {
                navigate('/delivery');
            } else {
                navigate('/');
            }
        } else {
            showToast('Invalid credentials', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back! 👋</h1>
                    <p className="text-gray-600">Login to your GroceryBD account</p>
                </div>

                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Login as
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRole('user')}
                                    className={`py-2 px-4 rounded-lg border-2 transition-all ${role === 'user'
                                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                                            : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                >
                                    User
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('delivery')}
                                    className={`py-2 px-4 rounded-lg border-2 transition-all ${role === 'delivery'
                                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                                            : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                >
                                    Delivery
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('admin')}
                                    className={`py-2 px-4 rounded-lg border-2 transition-all ${role === 'admin'
                                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                                            : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                >
                                    Admin
                                </button>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {/* Demo Credentials */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                            <p className="font-medium text-blue-900 mb-2">Demo Credentials:</p>
                            <div className="space-y-1 text-blue-800">
                                <p><strong>User:</strong> rahim@example.com / user123</p>
                                <p><strong>Delivery:</strong> karim@example.com / delivery123</p>
                                <p><strong>Admin:</strong> admin@grocerybd.com / admin123</p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3 text-lg"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

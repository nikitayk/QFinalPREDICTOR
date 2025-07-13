import React, { useState } from 'react';
import { BarChart3, Lock, ArrowLeft, Eye, EyeOff, Store } from 'lucide-react';

const ShopkeeperLogin = ({ onNavigate, onLogin }) => {
  const [formData, setFormData] = useState({
    shopId: '',
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call for shopkeeper authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials
      if (formData.username === 'admin' && formData.password === 'admin123') {
        // Store shopkeeper data in localStorage
        localStorage.setItem('shopkeeperData', JSON.stringify({
          shopId: formData.shopId || 'SHOP001',
          username: formData.username,
          loginTime: new Date().toISOString(),
          userType: 'shopkeeper'
        }));
        
        onLogin('shopkeeper', formData);
      } else {
        setError('Invalid credentials. Use admin/admin123 for demo.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <button
              onClick={() => onNavigate('landing')}
              className="absolute top-6 left-6 p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Business Dashboard</h2>
            <p className="text-gray-600">Manage your queue and serve customers</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shop ID
              </label>
              <input
                type="text"
                name="shopId"
                value={formData.shopId}
                onChange={handleInputChange}
                placeholder="Enter your shop ID (e.g., SHOP001)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <h3 className="text-sm font-medium text-purple-800 mb-2">Demo Credentials:</h3>
            <div className="text-sm text-purple-700 space-y-1">
              <p><strong>Username:</strong> admin</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-800 mb-2">Dashboard Features:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Manage queue in real-time</li>
              <li>• Serve next customer</li>
              <li>• View analytics and insights</li>
              <li>• Configure queue settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperLogin;
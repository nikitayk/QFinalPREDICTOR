import React, { useState } from 'react';
import { Users, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const ClientLogin = ({ onNavigate, onLogin }) => {
  const [formData, setFormData] = useState({
    queueId: '',
    customerName: '',
    phoneNumber: ''
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
      // Simulate API call for client authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (formData.queueId && formData.customerName && formData.phoneNumber) {
        // Store client data in localStorage
        localStorage.setItem('clientData', JSON.stringify({
          queueId: formData.queueId,
          customerName: formData.customerName,
          phoneNumber: formData.phoneNumber,
          joinTime: new Date().toISOString(),
          userType: 'client'
        }));
        
        onLogin('client', formData);
      } else {
        setError('Please fill in all fields');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <button
              onClick={() => onNavigate('landing')}
              className="absolute top-6 left-6 p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Customer Portal</h2>
            <p className="text-gray-600">Join the queue and track your wait time</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Queue ID
              </label>
              <input
                type="text"
                name="queueId"
                value={formData.queueId}
                onChange={handleInputChange}
                placeholder="Enter queue ID (e.g., SHOP001)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Joining Queue...
                </>
              ) : (
                'Join Queue'
              )}
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">How it works:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Get the Queue ID from the shop</li>
              <li>• Enter your details to join the queue</li>
              <li>• Receive real-time wait time updates</li>
              <li>• Get notified when it's your turn</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
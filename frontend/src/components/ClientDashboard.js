import React, { useState, useEffect } from 'react';
import { Clock, Users, MapPin, Phone, LogOut, RefreshCw, Bell, CheckCircle } from 'lucide-react';

const ClientDashboard = ({ clientData, onLogout }) => {
  const [queueStatus, setQueueStatus] = useState({
    position: 3,
    estimatedWait: 12,
    totalInQueue: 8,
    isActive: true,
    lastUpdated: new Date()
  });
  const [loading, setLoading] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueStatus(prev => {
        const newPosition = Math.max(0, prev.position - Math.random() * 0.3);
        const newWait = Math.max(0, newPosition * 4 + Math.random() * 3);
        
        return {
          ...prev,
          position: Math.floor(newPosition),
          estimatedWait: Math.floor(newWait),
          totalInQueue: Math.max(newPosition + 2, Math.floor(Math.random() * 5) + newPosition),
          lastUpdated: new Date()
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const refreshStatus = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setQueueStatus(prev => ({
      ...prev,
      lastUpdated: new Date()
    }));
    setLoading(false);
  };

  const getStatusColor = (position) => {
    if (position === 0) return 'text-green-600';
    if (position <= 2) return 'text-yellow-600';
    return 'text-blue-600';
  };

  const getStatusMessage = (position) => {
    if (position === 0) return "It's your turn! Please proceed to the counter.";
    if (position === 1) return "You're next! Please get ready.";
    if (position <= 3) return "Almost there! You'll be called soon.";
    return "Please wait, we'll notify you when it's almost your turn.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Queue Status</h1>
              <p className="text-sm text-gray-600">Welcome, {clientData.customerName}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <LogOut size={20} className="mr-1" />
            Exit Queue
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Main Status Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold mb-2 ${getStatusColor(queueStatus.position)}`}>
              {queueStatus.position === 0 ? '🎉' : `#${queueStatus.position}`}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              {queueStatus.position === 0 ? 'Your turn!' : 'Your position in queue'}
            </div>
            <div className={`text-lg font-medium ${getStatusColor(queueStatus.position)}`}>
              {getStatusMessage(queueStatus.position)}
            </div>
          </div>

          {queueStatus.position > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-600">{queueStatus.estimatedWait}</div>
                <div className="text-sm text-blue-700">Minutes remaining</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl text-center">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-600">{queueStatus.totalInQueue}</div>
                <div className="text-sm text-purple-700">Total in queue</div>
              </div>
              <div className="bg-green-50 p-6 rounded-xl text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-600">Active</div>
                <div className="text-sm text-green-700">Queue status</div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={refreshStatus}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-300 flex items-center"
            >
              <RefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} size={20} />
              {loading ? 'Updating...' : 'Refresh Status'}
            </button>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-gray-600 mr-3" />
              <div>
                <div className="text-sm text-gray-600">Name</div>
                <div className="font-medium">{clientData.customerName}</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-600 mr-3" />
              <div>
                <div className="text-sm text-gray-600">Phone</div>
                <div className="font-medium">{clientData.phoneNumber}</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-600 mr-3" />
              <div>
                <div className="text-sm text-gray-600">Queue ID</div>
                <div className="font-medium">{clientData.queueId}</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-gray-600 mr-3" />
              <div>
                <div className="text-sm text-gray-600">Joined at</div>
                <div className="font-medium">
                  {new Date(clientData.joinTime).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bell className="mr-2 text-blue-600" />
            Helpful Tips
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              Keep this page open to receive real-time updates
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              You'll be notified when you\'re next in line
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              Please arrive at the counter when it's your turn
            </li>
          </ul>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-gray-500">
          Last updated: {queueStatus.lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
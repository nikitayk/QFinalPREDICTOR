import React, { useState, useEffect } from 'react';
import { 
  Users, Clock, TrendingUp, Settings, LogOut, UserCheck, 
  BarChart3, RefreshCw, Plus, Minus, Play, Pause 
} from 'lucide-react';

const ShopkeeperDashboard = ({ shopkeeperData, onLogout }) => {
  const [queueData, setQueueData] = useState({
    currentQueue: [
      { id: 1, name: 'John Doe', phone: '+1234567890', joinTime: new Date(Date.now() - 15 * 60000), position: 1 },
      { id: 2, name: 'Jane Smith', phone: '+1234567891', joinTime: new Date(Date.now() - 12 * 60000), position: 2 },
      { id: 3, name: 'Bob Johnson', phone: '+1234567892', joinTime: new Date(Date.now() - 8 * 60000), position: 3 },
      { id: 4, name: 'Alice Brown', phone: '+1234567893', joinTime: new Date(Date.now() - 5 * 60000), position: 4 },
    ],
    activeCounters: 2,
    avgServiceTime: 4.5,
    isQueueActive: true,
    totalServedToday: 23,
    avgWaitTime: 12.5
  });

  const [stats, setStats] = useState({
    todayCustomers: 23,
    avgWaitTime: 12.5,
    peakHour: '2:00 PM',
    satisfaction: 4.2
  });

  const serveNextCustomer = () => {
    setQueueData(prev => {
      const newQueue = prev.currentQueue.slice(1).map((customer, index) => ({
        ...customer,
        position: index + 1
      }));
      
      return {
        ...prev,
        currentQueue: newQueue,
        totalServedToday: prev.totalServedToday + 1
      };
    });
    
    setStats(prev => ({
      ...prev,
      todayCustomers: prev.todayCustomers + 1
    }));
  };

  const toggleQueue = () => {
    setQueueData(prev => ({
      ...prev,
      isQueueActive: !prev.isQueueActive
    }));
  };

  const updateCounters = (change) => {
    setQueueData(prev => ({
      ...prev,
      activeCounters: Math.max(1, Math.min(5, prev.activeCounters + change))
    }));
  };

  const updateServiceTime = (change) => {
    setQueueData(prev => ({
      ...prev,
      avgServiceTime: Math.max(1, Math.min(15, prev.avgServiceTime + change))
    }));
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new customers
      if (Math.random() < 0.3 && queueData.currentQueue.length < 10) {
        const names = ['Mike Wilson', 'Sarah Davis', 'Tom Anderson', 'Lisa Garcia', 'David Martinez'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        
        setQueueData(prev => ({
          ...prev,
          currentQueue: [...prev.currentQueue, {
            id: Date.now(),
            name: randomName,
            phone: `+123456${Math.floor(Math.random() * 10000)}`,
            joinTime: new Date(),
            position: prev.currentQueue.length + 1
          }]
        }));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [queueData.currentQueue.length]);

  const getWaitTime = (joinTime) => {
    const now = new Date();
    const diff = Math.floor((now - joinTime) / (1000 * 60));
    return diff;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg mr-3">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Queue Management</h1>
              <p className="text-sm text-gray-600">Shop ID: {shopkeeperData.shopId || 'SHOP001'}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <LogOut size={20} className="mr-1" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Customers Today</p>
                <p className="text-2xl font-bold text-blue-600">{stats.todayCustomers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Wait Time</p>
                <p className="text-2xl font-bold text-green-600">{stats.avgWaitTime}m</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Peak Hour</p>
                <p className="text-2xl font-bold text-purple-600">{stats.peakHour}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Satisfaction</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.satisfaction}/5</p>
              </div>
              <UserCheck className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Queue Control */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Queue Control</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Queue Status</span>
                  <button
                    onClick={toggleQueue}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                      queueData.isQueueActive 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {queueData.isQueueActive ? <Pause size={16} className="mr-1" /> : <Play size={16} className="mr-1" />}
                    {queueData.isQueueActive ? 'Active' : 'Paused'}
                  </button>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Active Counters</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCounters(-1)}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-bold w-8 text-center">{queueData.activeCounters}</span>
                      <button
                        onClick={() => updateCounters(1)}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Service Time (min)</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateServiceTime(-0.5)}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-bold w-12 text-center">{queueData.avgServiceTime}</span>
                      <button
                        onClick={() => updateServiceTime(0.5)}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={serveNextCustomer}
                  disabled={queueData.currentQueue.length === 0}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                >
                  <UserCheck className="mr-2" size={20} />
                  Serve Next Customer
                </button>
              </div>
            </div>
          </div>

          {/* Current Queue */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Current Queue ({queueData.currentQueue.length})</h2>
                <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                  <RefreshCw size={16} className="mr-1" />
                  Refresh
                </button>
              </div>

              {queueData.currentQueue.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No customers in queue</p>
                  <p className="text-gray-400 text-sm">New customers will appear here automatically</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {queueData.currentQueue.map((customer, index) => (
                    <div
                      key={customer.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        index === 0 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                            index === 0 ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                          }`}>
                            {customer.position}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{customer.name}</p>
                            <p className="text-sm text-gray-600">{customer.phone}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Waiting</p>
                          <p className="font-medium text-gray-900">{getWaitTime(customer.joinTime)}m</p>
                        </div>
                      </div>
                      {index === 0 && (
                        <div className="mt-2 text-sm text-green-700 font-medium">
                          → Next to be served
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;
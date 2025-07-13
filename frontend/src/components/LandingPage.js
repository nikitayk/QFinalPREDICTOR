import React from 'react';
import { Clock, Users, TrendingUp, Shield, Smartphone, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms predict wait times with 95% accuracy"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-600" />,
      title: "Real-Time Updates",
      description: "Live queue status updates keep customers informed instantly"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights to optimize your business operations"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee"
    }
  ];

  const benefits = [
    "Reduce customer wait anxiety",
    "Optimize staff allocation",
    "Increase customer satisfaction",
    "Improve operational efficiency",
    "Real-time queue management",
    "Data-driven insights"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
                <Clock className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart Queue
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your business with AI-powered queue predictions. Reduce wait times, 
              increase customer satisfaction, and optimize operations with real-time insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('client-login')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <Users className="mr-2" size={20} />
                Customer Portal
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button
                onClick={() => onNavigate('shopkeeper-login')}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <BarChart3 className="mr-2" size={20} />
                Business Dashboard
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Q-Line?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cutting-edge technology meets practical solutions for modern businesses
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Transform Your Business Operations
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join hundreds of businesses that have revolutionized their customer experience 
                with our intelligent queue management system.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Demo</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Current Queue</div>
                    <div className="text-2xl font-bold text-blue-600">8 customers</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Estimated Wait</div>
                    <div className="text-2xl font-bold text-green-600">12 minutes</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Active Counters</div>
                    <div className="text-2xl font-bold text-purple-600">3 counters</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Revolutionize Your Queue Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Start your journey towards smarter, more efficient customer service today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('client-login')}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Try Customer Portal
            </button>
            <button
              onClick={() => onNavigate('shopkeeper-login')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Access Business Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Q-Line</h3>
            <p className="text-gray-400 mb-6">Smart Queue Management System</p>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                © 2025 Q-Line. All rights reserved. Powered by AI technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
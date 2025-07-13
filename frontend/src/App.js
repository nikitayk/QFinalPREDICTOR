import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ClientLogin from './components/ClientLogin';
import ShopkeeperLogin from './components/ShopkeeperLogin';
import ClientDashboard from './components/ClientDashboard';
import ShopkeeperDashboard from './components/ShopkeeperDashboard';
import './index.css';

const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState(null);

  // Check for existing session on app load
  useEffect(() => {
    const clientData = localStorage.getItem('clientData');
    const shopkeeperData = localStorage.getItem('shopkeeperData');

    if (clientData) {
      const data = JSON.parse(clientData);
      setUserData(data);
      setUserType('client');
      setCurrentView('client-dashboard');
    } else if (shopkeeperData) {
      const data = JSON.parse(shopkeeperData);
      setUserData(data);
      setUserType('shopkeeper');
      setCurrentView('shopkeeper-dashboard');
    }
  }, []);

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const handleLogin = (type, data) => {
    setUserType(type);
    setUserData(data);
    
    if (type === 'client') {
      setCurrentView('client-dashboard');
    } else if (type === 'shopkeeper') {
      setCurrentView('shopkeeper-dashboard');
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('clientData');
    localStorage.removeItem('shopkeeperData');
    
    // Reset state
    setUserData(null);
    setUserType(null);
    setCurrentView('landing');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigation} />;
      
      case 'client-login':
        return (
          <ClientLogin 
            onNavigate={handleNavigation} 
            onLogin={handleLogin}
          />
        );
      
      case 'shopkeeper-login':
        return (
          <ShopkeeperLogin 
            onNavigate={handleNavigation} 
            onLogin={handleLogin}
          />
        );
      
      case 'client-dashboard':
        return (
          <ClientDashboard 
            clientData={userData} 
            onLogout={handleLogout}
          />
        );
      
      case 'shopkeeper-dashboard':
        return (
          <ShopkeeperDashboard 
            shopkeeperData={userData} 
            onLogout={handleLogout}
          />
        );
      
      default:
        return <LandingPage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
};

export default App;
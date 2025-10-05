import React, { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import CreateChatbot from './components/CreateChatbot';
import ManageChatbot from './components/ManageChatbot';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { Chatbot } from './types';

type Page = 'landing' | 'login' | 'signup' | 'dashboard' | 'create' | 'manage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [selectedChatbot, setSelectedChatbot] = useState<Chatbot | null>(null);

  const navigate = (page: Page) => setCurrentPage(page);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    navigate('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setChatbots([]);
    setSelectedChatbot(null);
    navigate('landing');
  };

  const handleChatbotCreated = (newChatbot: Chatbot) => {
    setChatbots(prev => [...prev, newChatbot]);
    navigate('dashboard');
  };
  
  const handleSelectChatbot = useCallback((chatbot: Chatbot) => {
      setSelectedChatbot(chatbot);
      navigate('manage');
  }, []);

  const handleUpdateChatbot = (updatedChatbot: Chatbot) => {
    setChatbots(prev => prev.map(cb => cb.id === updatedChatbot.id ? updatedChatbot : cb));
    setSelectedChatbot(updatedChatbot);
  };
  
  const handleBackToDashboard = () => {
      setSelectedChatbot(null);
      navigate('dashboard');
  }

  const renderPage = () => {
    if (!isAuthenticated) {
      switch (currentPage) {
        case 'login':
          return <LoginPage onLoginSuccess={handleAuthSuccess} onNavigateToSignup={() => navigate('signup')} />;
        case 'signup':
          return <SignUpPage onSignUpSuccess={handleAuthSuccess} onNavigateToLogin={() => navigate('login')} />;
        case 'landing':
        default:
          return <LandingPage onNavigateToLogin={() => navigate('login')} onNavigateToSignup={() => navigate('signup')} />;
      }
    }

    // Authenticated Pages
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard chatbots={chatbots} onSelectChatbot={handleSelectChatbot} onCreateNew={() => navigate('create')} onLogout={handleLogout} />;
      case 'create':
        return <CreateChatbot onChatbotCreated={handleChatbotCreated} onBack={handleBackToDashboard} onLogout={handleLogout} />;
      case 'manage':
        if (selectedChatbot) {
          return <ManageChatbot chatbot={selectedChatbot} onUpdate={handleUpdateChatbot} onBack={handleBackToDashboard} onLogout={handleLogout} />;
        }
        // Fallback to dashboard if no bot is selected
        navigate('dashboard');
        return <Dashboard chatbots={chatbots} onSelectChatbot={handleSelectChatbot} onCreateNew={() => navigate('create')} onLogout={handleLogout} />;
      default:
        // Fallback for authenticated users
        navigate('dashboard');
        return <Dashboard chatbots={chatbots} onSelectChatbot={handleSelectChatbot} onCreateNew={() => navigate('create')} onLogout={handleLogout} />;
    }
  };

  return <div className="min-h-screen bg-slate-900">{renderPage()}</div>;
};

export default App;
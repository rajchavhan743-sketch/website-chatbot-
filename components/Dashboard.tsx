import React, { useRef } from 'react';
import { Chatbot } from '../types';
import Icon from './Icon';
import Header from './Header';

interface DashboardProps {
  chatbots: Chatbot[];
  onSelectChatbot: (chatbot: Chatbot) => void;
  onCreateNew: () => void;
  onLogout: () => void;
}

const ChatbotCard: React.FC<{ chatbot: Chatbot; onSelect: (chatbot: Chatbot) => void; }> = ({ chatbot, onSelect }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    
    return (
        <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onClick={() => onSelect(chatbot)}
            className="group relative glow-card cursor-pointer rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
        >
            <div className="absolute -top-12 -right-12 text-slate-700/50 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-150 group-hover:text-sky-500/30">
                <Icon icon="robot" className="w-32 h-32" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-white">{chatbot.name}</h3>
                <p className="mt-2 text-sm text-slate-400 truncate">{chatbot.website || 'No website provided'}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>Created: {chatbot.createdAt.toLocaleDateString()}</span>
                    <span className="flex items-center gap-1 rounded-full bg-green-900/50 px-2 py-1 text-green-300">
                        <span className="h-2 w-2 rounded-full bg-green-400"></span>
                        Ready
                    </span>
                </div>
            </div>
        </div>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ chatbots, onSelectChatbot, onCreateNew, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header title="Dashboard" onLogout={onLogout}>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 rounded-md bg-gradient-to-br from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity duration-200"
        >
          <Icon icon="plus" className="h-4 w-4" />
          Create New Chatbot
        </button>
      </Header>
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {chatbots.length === 0 ? (
          <div className="text-center rounded-lg border-2 border-dashed border-slate-700 p-12">
            <Icon icon="robot" className="mx-auto h-12 w-12 text-slate-500" />
            <h3 className="mt-2 text-lg font-medium text-white">No chatbots yet</h3>
            <p className="mt-1 text-sm text-slate-400">Get started by creating your first AI chatbot.</p>
            <div className="mt-6">
              <button
                onClick={onCreateNew}
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-br from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity duration-200"
              >
                <Icon icon="plus" className="-ml-1 mr-2 h-5 w-5" />
                Create New Chatbot
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {chatbots.map(bot => (
              <ChatbotCard key={bot.id} chatbot={bot} onSelect={onSelectChatbot} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
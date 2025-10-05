import React, { useState, useRef } from 'react';
import { Chatbot } from '../types';
import Header from './Header';
import Icon from './Icon';

interface CreateChatbotProps {
  onChatbotCreated: (chatbot: Chatbot) => void;
  onBack: () => void;
  onLogout: () => void;
}

const CreateChatbot: React.FC<CreateChatbotProps> = ({ onChatbotCreated, onBack, onLogout }) => {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [knowledgeBase, setKnowledgeBase] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !knowledgeBase) {
      setError('Chatbot Name and Knowledge Base are required.');
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate AI training
    setTimeout(() => {
      const newChatbot: Chatbot = {
        id: crypto.randomUUID(),
        name,
        website,
        knowledgeBase,
        createdAt: new Date(),
      };
      onChatbotCreated(newChatbot);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header title="Create New Chatbot" onLogout={onLogout}>
         <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 transition-colors duration-200"
        >
            <Icon icon="arrowLeft" className="h-4 w-4" />
            Back to Dashboard
        </button>
      </Header>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div 
          ref={cardRef} 
          onMouseMove={handleMouseMove} 
          className="glow-card rounded-xl shadow-lg p-8"
        >
            <h2 className="text-2xl font-bold text-white mb-1">Chatbot Details</h2>
            <p className="text-slate-400 mb-6">Provide the necessary information to train your new AI chatbot.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-300">
                        Chatbot Name <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input block w-full rounded-md sm:text-sm sm:leading-6 py-2 px-3"
                            placeholder="e.g., Support Bot"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="website" className="block text-sm font-medium leading-6 text-slate-300">
                        Business Website
                    </label>
                    <div className="mt-2">
                        <input
                            type="url"
                            id="website"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            className="form-input block w-full rounded-md sm:text-sm sm:leading-6 py-2 px-3"
                            placeholder="https://example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="knowledgeBase" className="block text-sm font-medium leading-6 text-slate-300">
                        Knowledge Base <span className="text-red-400">*</span>
                    </label>
                    <p className="text-xs text-slate-500 mt-1">Paste all the text-based information you want the chatbot to know. The more detailed, the better.</p>
                    <div className="mt-2">
                        <textarea
                            id="knowledgeBase"
                            rows={10}
                            value={knowledgeBase}
                            onChange={(e) => setKnowledgeBase(e.target.value)}
                            className="form-input block w-full rounded-md sm:text-sm sm:leading-6 py-2 px-3"
                            placeholder="e.g., Company Info, FAQs, Product Details..."
                        />
                    </div>
                </div>
                
                {error && <p className="text-sm text-red-400">{error}</p>}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-md bg-gradient-to-br from-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Training AI...
                            </>
                        ) : (
                           "Create Chatbot"
                        )}
                    </button>
                </div>
            </form>
        </div>
      </main>
    </div>
  );
};

export default CreateChatbot;
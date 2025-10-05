import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Chatbot, ChatMessage } from '../types';
import * as geminiService from '../services/geminiService';
import ChatWindow from './ChatWindow';
import Header from './Header';
import Icon from './Icon';

interface ManageChatbotProps {
  chatbot: Chatbot;
  onUpdate: (updatedChatbot: Chatbot) => void;
  onBack: () => void;
  onLogout: () => void;
}

const GlowCard: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
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
    <div ref={cardRef} onMouseMove={handleMouseMove} className={`glow-card rounded-xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

const ManageChatbot: React.FC<ManageChatbotProps> = ({ chatbot, onUpdate, onBack, onLogout }) => {
  const [knowledgeBase, setKnowledgeBase] = useState(chatbot.knowledgeBase);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    setKnowledgeBase(chatbot.knowledgeBase);
    setChatHistory([]);
  }, [chatbot]);

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      const updatedChatbot = { ...chatbot, knowledgeBase };
      onUpdate(updatedChatbot);
      setIsUpdating(false);
      setChatHistory([]);
      setIsChatOpen(false);
    }, 1500);
  };
  
  const handleCopy = () => {
      const embedCode = `<script src="https://your-saas-domain.com/embed.js" data-chatbot-id="${chatbot.id}" async defer></script>`;
      navigator.clipboard.writeText(embedCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendMessage = useCallback(async (messageText: string) => {
    const userMessage: ChatMessage = { id: crypto.randomUUID(), text: messageText, sender: 'user' };
    const newChatHistory = [...chatHistory, userMessage];
    setChatHistory(newChatHistory);
    setIsBotTyping(true);

    const botResponseText = await geminiService.getChatbotResponse(chatbot, messageText, newChatHistory);
    
    const botMessage: ChatMessage = { id: crypto.randomUUID(), text: botResponseText, sender: 'bot' };
    setChatHistory(prev => [...prev, botMessage]);
    setIsBotTyping(false);
  }, [chatHistory, chatbot]);

  const embedCode = `<script src="https://sitebot-ai.com/embed.js" data-chatbot-id="${chatbot.id}" async defer></script>`;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header title={chatbot.name} onLogout={onLogout}>
         <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-600 transition-colors duration-200"
        >
            <Icon icon="arrowLeft" className="h-4 w-4" />
            Back to Dashboard
        </button>
      </Header>
      
      <main className="flex-grow w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-8">
            <GlowCard>
                <h3 className="text-lg font-semibold text-white">Knowledge Base</h3>
                <p className="text-sm text-slate-400 mt-1 mb-4">Update the source of truth for your chatbot.</p>
                <textarea
                    value={knowledgeBase}
                    onChange={(e) => setKnowledgeBase(e.target.value)}
                    rows={12}
                    className="form-input block w-full rounded-md sm:text-sm sm:leading-6 p-3"
                />
                <button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className="mt-4 w-full flex items-center justify-center gap-2 rounded-md bg-gradient-to-br from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                    {isUpdating ? 'Updating...' : 'Update & Re-train'}
                </button>
            </GlowCard>

            <GlowCard>
                 <h3 className="text-lg font-semibold text-white">Embed on Your Website</h3>
                 <p className="text-sm text-slate-400 mt-1 mb-4">Copy and paste this script into your website's HTML.</p>
                 <div className="relative">
                    <pre className="bg-slate-900 rounded-md p-4 text-sm text-slate-300 overflow-x-auto border border-slate-700">
                        <code>{embedCode}</code>
                    </pre>
                    <button 
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors">
                        {isCopied ? <Icon icon="check" className="h-5 w-5 text-green-400"/> : <Icon icon="copy" className="h-5 w-5"/>}
                    </button>
                 </div>
            </GlowCard>
        </div>

        <div className="fixed bottom-5 right-5 z-30">
             {isChatOpen ? (
                 <ChatWindow 
                    messages={chatHistory} 
                    onSendMessage={handleSendMessage}
                    isBotTyping={isBotTyping}
                    chatbotName={chatbot.name}
                    onClose={() => setIsChatOpen(false)}
                />
             ) : (
                <button 
                    onClick={() => setIsChatOpen(true)}
                    className="flex items-center gap-3 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-all hover:scale-105"
                >
                    <Icon icon="chatBubble" className="h-6 w-6" />
                    Test Your Chatbot
                </button>
             )}
        </div>
      </main>
    </div>
  );
};

export default ManageChatbot;
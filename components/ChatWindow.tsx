import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import Icon from './Icon';

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isBotTyping: boolean;
  chatbotName: string;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, isBotTyping, chatbotName, onClose }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };
  
  const MessageItem: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isBot = message.sender === 'bot';
    return (
        <div className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isBot ? 'bg-sky-500' : 'bg-slate-600'}`}>
                <Icon icon={isBot ? 'robot' : 'user'} className="h-5 w-5 text-white" />
            </div>
            <div className={`max-w-xs rounded-xl px-4 py-3 ${isBot ? 'bg-slate-700 text-white rounded-bl-none' : 'bg-sky-500 text-white rounded-br-none'}`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
        </div>
    );
  };

  return (
    <div className="flex h-[60vh] w-full max-w-sm flex-col rounded-xl bg-slate-800 shadow-2xl transition-all border border-slate-700">
      <div className="flex items-center justify-between border-b border-slate-700 p-4">
        <div>
            <h3 className="text-lg font-semibold text-white">Test "{chatbotName}"</h3>
            <p className="text-sm text-slate-400">Interact with your AI.</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            <Icon icon="close" className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
        {isBotTyping && (
             <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500">
                    <Icon icon="robot" className="h-5 w-5 text-white" />
                </div>
                <div className="max-w-xs rounded-xl rounded-bl-none bg-slate-700 px-4 py-3">
                    <div className="flex items-center justify-center space-x-1">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-300 delay-0"></span>
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-300 delay-150"></span>
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-300 delay-300"></span>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-700 p-4">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="form-input flex-1 rounded-lg px-4 py-2.5"
          />
          <button
            type="submit"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-white transition-colors hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50"
            disabled={!input.trim() || isBotTyping}
          >
            <Icon icon="send" className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;

export interface Chatbot {
  id: string;
  name: string;
  website: string;
  knowledgeBase: string;
  createdAt: Date;
}

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

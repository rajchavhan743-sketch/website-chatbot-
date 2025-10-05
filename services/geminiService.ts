
import { GoogleGenAI } from "@google/genai";
import { Chatbot, ChatMessage } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder for development.
  // In a real environment, the API key would be securely managed.
  // We are assuming `process.env.API_KEY` is set.
  console.warn("API_KEY environment variable not set. Using a placeholder. Please set your API key for the app to function.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getChatbotResponse = async (chatbot: Chatbot, userMessage: string, chatHistory: ChatMessage[]): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';

    const systemInstruction = `You are a helpful and friendly customer support chatbot for the business named "${chatbot.name}".
    Your goal is to answer user questions based *ONLY* on the information provided in the following knowledge base.
    Do not use any external information or your general knowledge.
    If the user's question cannot be answered using the knowledge base, politely say "I'm sorry, I don't have information on that topic. Is there anything else I can help with?".
    Keep your answers concise and relevant to the user's query.
    The business's website is ${chatbot.website}. You can mention it if relevant.

    KNOWLEDGE BASE:
    ---
    ${chatbot.knowledgeBase}
    ---
    `;

    const contents = chatHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: userMessage }] });


    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            systemInstruction
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error getting response from Gemini API:", error);
    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again in a moment.";
  }
};

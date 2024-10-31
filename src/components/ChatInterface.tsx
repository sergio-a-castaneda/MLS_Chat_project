import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useSearchStore } from '../store/searchStore';

export function ChatInterface() {
  const [input, setInput] = useState('');
  const { messages, addMessage } = useChatStore();
  const { searchProperties } = useSearchStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage({
      content: input,
      sender: 'user',
    });

    // Example search criteria (in a real app, you'd parse the user's input)
    const searchCriteria = {
      location: 'Downtown',
      priceRange: {
        min: 500000,
        max: 1000000,
      },
      propertyType: ['Single Family'],
      bedrooms: 3,
      bathrooms: 2,
    };

    try {
      await searchProperties(searchCriteria);
      
      addMessage({
        content: "I've found some properties matching your criteria. You can view them in the results panel.",
        sender: 'bot',
      });
    } catch (error) {
      addMessage({
        content: "I'm sorry, but I couldn't fetch the properties at this moment. Please try again later.",
        sender: 'bot',
      });
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-full border-l">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chat Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
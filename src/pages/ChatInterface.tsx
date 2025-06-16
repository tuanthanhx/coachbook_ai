import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, EllipsisVertical, Send } from 'lucide-react';

const ChatInterface = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { type: 'ai', text: `Hi! I'm your Atomic Habits coach. I'm here to help you build better habits and break bad ones. What would you like to work on today?` },
    { type: 'user', text: 'How do I start a new habit?' },
    { type: 'ai', text: 'Remember, habits are the compound interest of self-improvement. Small changes might not seem to matter much on any given day, but the impact they deliver over months and years can be enormous.' },
    { type: 'user', text: 'Help me design my environment' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { type: 'user', text: input }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: 'ai', text: 'This is a simulated response. How else can I help?' },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center py-8 p-4 relative">
          <ChevronLeft className="bg-white rounded-full w-10 h-10 p-1 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer" onClick={() => navigate(-1)} />
          <h1 className="px-8 w-full text-center text-xl font-bold">Atomic Habits Coach</h1>
          <EllipsisVertical className="bg-white rounded-full w-10 h-10 p-2.5 absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer" />
        </div>
        {/* Message Thread View */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-10 flex ${message.type === 'ai' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`p-4 rounded-lg shadow-md max-w-xs ${message.type === 'ai' ? 'bg-white rounded-bl-none text-left' : 'bg-gradient-to-r from-[#2564ea] to-[#16a14b] rounded-br-none text-white text-right'
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="mb-4 flex justify-start">
              <div className="p-3 rounded-lg max-w-xs bg-gray-200 text-left">
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="fixed bottom-0 left-0 right-0">
          <div className="w-[430px] mx-auto">
            <div className="w-full px-5 py-2 overflow-hidden flex gap-2">
              {['What is the summary?', 'Give me advice', 'How to start?'].map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => setInput(prompt)}
                  className="text-sm shadow-md"
                >
                  {prompt}
                </Button>
              ))}
            </div>

            <div className="px-5 py-4 bg-white shadow-md flex items-center gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 h-11 p-4 rounded-full bg-gray-100"
              />
              <Button onClick={handleSend} disabled={!input.trim()} className="w-11 h-11 p-0 rounded-full bg-blue-500 text-white">
                <Send className="w-11 h-11 block" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatInterface;

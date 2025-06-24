import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import apiService from '@/lib/apiService';
import Layout from '@/components/layouts/LayoutDefault';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, EllipsisVertical, Send } from 'lucide-react';
// @ts-ignore
import ReactMarkdown from 'react-markdown';
import './ChatInterface.css';

interface Message {
  type: 'ai' | 'user';
  text: string;
}

const ChatInterface = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChatHistory = async (id: string) => {
    try {
      const response = await apiService.get(`/chat/${id}`);
      const formattedMessages = response.data.map((item: any) => ({
        type: item.sender === 'assistant' ? 'ai' : 'user',
        text: item.message,
      }));
      setMessages(formattedMessages);
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchChatHistory(id);
    }
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { type: 'user', text: input };
    setMessages([...messages, newMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await apiService.post(`/chat/${id}`, {
        message: input,
        sender: 'user',
      });

      setMessages((prev) => [
        ...prev,
        { type: 'ai', text: response.data.assistantResponse },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsTyping(false);
    }
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
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="mb-4 flex justify-start">
              <div className="p-3 rounded-lg rounded-bl-none shadow-md max-w-xs bg-white text-left">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSend();
                  }
                }}
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

import React, { createContext, useState, useEffect, useContext } from 'react';
import { getRandomQuote } from '@/lib/apiService';

interface QuoteContextType {
  quote: { content: string; author: string } | null;
  fetchQuote: () => Promise<void>;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quote, setQuote] = useState<{ content: string; author: string } | null>(null);

  const fetchQuote = async () => {
    const today = new Date().toISOString().split('T')[0];
    const storedDate = localStorage.getItem('quoteDate');

    if (quote && storedDate === today) return;

    try {
      const data = await getRandomQuote();
      if (data) {
        setQuote(data);
        localStorage.setItem('quoteDate', today);
      }
    } catch (error) {
      console.error('Failed to fetch quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <QuoteContext.Provider value={{ quote, fetchQuote }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};

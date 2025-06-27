import React from 'react';
import { useQuote } from '../../context/QuoteContext';
import { LoaderCircle } from 'lucide-react';

const Quote: React.FC = () => {
  const { quote } = useQuote();

  return (
    <div>
      <div className="flex items-center text-center min-h-36 py-8 px-5 bg-gradient-to-r from-[#2564ea] to-[#16a14b] rounded-lg shadow-md text-white">
        {quote ? (
          <div className="flex flex-col w-full text-center">
            <div className="italic">{quote?.content}</div>
            <div className="mt-2">{quote?.author ? `- ${quote.author}` : ''}</div>
          </div>
        ) : (
          <LoaderCircle className="animate-spin h-8 w-8 mx-auto" />
        )}
      </div>
    </div>
  );
};

export default Quote;

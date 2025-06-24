import React from 'react';
import { useQuote } from '../../context/QuoteContext';

const Quote: React.FC = () => {
  const { quote } = useQuote();

  return (
    <div>
      <div className="flex items-center text-center py-8 px-5 bg-gradient-to-r from-[#2564ea] to-[#16a14b] rounded-lg shadow-md text-white">
        <div className="flex flex-col">
          <div className="italic">{quote?.content || 'Loading...'}</div>
          <div className="mt-2">{quote?.author ? `- ${quote.author}` : ''}</div>
        </div>
      </div>
    </div>
  );
};

export default Quote;

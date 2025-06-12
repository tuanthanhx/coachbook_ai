import React from 'react';

const Quote: React.FC = () => {
  return (
    <div>
      <div className="flex items-center text-center py-8 px-5 bg-gradient-to-r from-[#2564ea] to-[#16a14b] rounded-lg shadow-md text-white">
        <div className="flex flex-col">
          <div className="italic">The only limit to our realization of tomorrow is our doubts of today.</div>
          <div className="mt-2">- Franklin D. Roosevelt</div>
        </div>
      </div>
    </div>
  );
};

export default Quote;

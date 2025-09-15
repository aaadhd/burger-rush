
import React from 'react';
import type { Customer } from '../types';

interface CustomerAreaProps {
  customer: Customer | null;
  emotion: 'happy' | 'angry' | null;
}

const CustomerArea: React.FC<CustomerAreaProps> = ({ customer, emotion }) => {
  if (!customer) return null;

  let emotionEmoji = '';
  let emotionColor = '';
  if (emotion === 'happy') {
    emotionEmoji = customer.happyEmoji;
    emotionColor = 'text-green-500';
  } else if (emotion === 'angry') {
    emotionEmoji = customer.angryEmoji;
    emotionColor = 'text-red-500';
  }

  return (
    <div className="flex flex-col items-center gap-2 z-10">
      <div className="relative w-32 h-32 bg-gray-100 rounded-full border-4 border-gray-800 flex justify-center items-center text-7xl shadow-lg">
        {customer.emoji}
        {emotion && (
          <span className={`absolute top-0 right-0 text-4xl ${emotionColor}`}>
            {emotionEmoji}
          </span>
        )}
      </div>
      <div className="relative bg-white px-5 py-2.5 rounded-2xl shadow-md font-bold text-xl mt-[-20px]">
        {customer.name}'s Burger Order!
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-5 h-5 bg-white transform rotate-45 shadow-sm -z-10"></div>
      </div>
    </div>
  );
};

export default CustomerArea;

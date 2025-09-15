
import React from 'react';
import type { Ingredients } from '../types';
import { INGREDIENTS } from '../constants';

interface OrderSequenceProps {
  order: string[];
}

const OrderSequence: React.FC<OrderSequenceProps> = ({ order }) => {
  return (
    <div className="relative mt-5 flex flex-col items-center z-20">
      <div className="text-xl font-bold text-gray-800 bg-white/90 px-4 py-1 rounded-lg mb-2 shadow-md">
        Current Order
      </div>
      <div className="flex gap-2 bg-white/90 p-2.5 rounded-2xl shadow-lg">
        {order.map((ingredientKey, index) => (
          <div
            key={index}
            className={`w-14 h-14 rounded-lg bg-gray-200 flex justify-center items-center border-4 text-4xl shadow-inner transition-all duration-300 border-transparent`}
          >
            {INGREDIENTS[ingredientKey]?.emoji}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSequence;
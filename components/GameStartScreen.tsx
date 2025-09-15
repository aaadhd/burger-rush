import React from 'react';

interface GameStartScreenProps {
  onStart: () => void;
}

const GameStartScreen: React.FC<GameStartScreenProps> = ({ onStart }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-300 to-orange-400 flex flex-col justify-center items-center z-[1000]">
        <div className="text-center mb-12">
            <h1 className="text-9xl text-white text-shadow-lg tracking-wider">
                <span className="inline-block -rotate-12">🍔</span>
                BURGER RUSH
                <span className="inline-block rotate-12">🥤</span>
            </h1>
        </div>
      <button
        onClick={onStart}
        className="bg-[#1dd1a1] text-white px-16 py-6 rounded-full text-5xl cursor-pointer shadow-xl border-b-8 border-[#10ac84] hover:bg-[#2ee5b5] hover:-translate-y-1 active:translate-y-0 active:border-b-4 transition-all"
      >
        START
      </button>
    </div>
  );
};

export default GameStartScreen;
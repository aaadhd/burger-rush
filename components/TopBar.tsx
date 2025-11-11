import React from 'react';

interface TopBarProps {
  round: number;
  onEndGame: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ round, onEndGame }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-14 bg-white/80 text-gray-800 flex justify-between items-center px-4 shadow-lg z-[1000] border-b-4 border-yellow-300">
      <div className="flex items-center gap-2">
        <span className="text-xl tracking-wider">Burger Rush</span>
      </div>
       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 rounded-full shadow-md border-b-2 border-gray-200">
         <span className="text-xl font-bold">Round {round}</span>
       </div>
      <div className="flex items-center gap-2">
        <button className="px-4 py-1.5 rounded-xl bg-blue-500 text-white text-sm shadow-md border-b-2 border-blue-700 hover:bg-blue-400 active:border-b-0 transition-all">
          Pause
        </button>
        <button
            onClick={onEndGame}
            className="px-4 py-1.5 rounded-xl bg-red-500 text-white text-sm shadow-md border-b-2 border-red-700 hover:bg-red-400 active:border-b-0 transition-all">
          End Game
        </button>
      </div>
    </div>
  );
};

export default TopBar;
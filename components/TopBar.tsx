import React from 'react';

interface TopBarProps {
  round: number;
  onEndGame: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ round, onEndGame }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-20 lg:h-24 bg-white/80 text-gray-800 flex justify-between items-center px-4 lg:px-6 shadow-lg z-[1000] border-b-4 lg:border-b-8 border-yellow-300" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <div className="flex items-center gap-2 lg:gap-4">
        <span className="text-2xl lg:text-4xl tracking-wider">Burger Rush</span>
      </div>
       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 lg:px-6 py-1 lg:py-2 rounded-full shadow-md border-b-2 lg:border-b-4 border-gray-200">
         <span className="text-2xl lg:text-4xl font-bold">Round {round}</span>
       </div>
      <div className="flex items-center gap-2 lg:gap-4">
        <button className="px-3 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-2xl bg-blue-500 text-white text-sm lg:text-xl shadow-md border-b-2 lg:border-b-4 border-blue-700 hover:bg-blue-400 active:border-b-0 transition-all">
          Pause
        </button>
        <button 
            onClick={onEndGame}
            className="px-3 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-2xl bg-red-500 text-white text-sm lg:text-xl shadow-md border-b-2 lg:border-b-4 border-red-700 hover:bg-red-400 active:border-b-0 transition-all">
          End Game
        </button>
      </div>
    </div>
  );
};

export default TopBar;
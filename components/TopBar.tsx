import React from 'react';

interface TopBarProps {
  round: number;
  onPause: () => void;
  onOpenMenu: () => void;
  buttonsDisabled?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ round, onPause, onOpenMenu, buttonsDisabled = false }) => {
  return (
    <header className="absolute top-0 left-0 w-full h-[70px] bg-yellow-400/95 shadow-lg flex items-center justify-between px-6 z-[500] border-b-4 border-yellow-500">
      <div className="w-1/3">
        <h1
          className="text-4xl text-white font-bold drop-shadow-[2px_2px_0_#ca8a04]"
          style={{
            fontFamily: "'Luckiest Guy', cursive",
            WebkitTextStroke: '2px #ca8a04',
            paintOrder: 'stroke fill',
          }}
        >
          Burger Rush
        </h1>
      </div>
      <div className="w-1/3 flex justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-full border-2 border-yellow-500 shadow-inner px-8 py-2 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path
              fill="#ca8a04"
              d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0 2a10 10 0 1 1 0-20a10 10 0 0 1 0 20M12.5 7v5.5l4.5 2.5l-.75 1.23l-5.25-3.1V7z"
            />
          </svg>
          <span
            className="text-2xl font-bold text-yellow-800"
            style={{ fontFamily: 'Pretendard, sans-serif' }}
          >
            Round {round}
          </span>
        </div>
      </div>
      <div className="w-1/3 flex justify-end items-center gap-4">
        <button
          onClick={onPause}
          disabled={buttonsDisabled}
          className="w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-transform transform hover:scale-110 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Pause Game"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        </button>
        <button
          onClick={onOpenMenu}
          disabled={buttonsDisabled}
          className="w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-transform transform hover:scale-110 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Open Game Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div
      style={{ width: '1280px', height: '800px' }}
      className="bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-300 flex items-center justify-center"
    >
      <div className="text-center animate-pop-in">
        <div className="text-[280px] mb-4">🍔</div>
        <h1 className="text-7xl font-bold text-white drop-shadow-lg">Burger Rush!</h1>
      </div>
    </div>
  );
};

export default SplashScreen;

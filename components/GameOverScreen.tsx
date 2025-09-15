import React from 'react';
import type { Player, Team } from '../types';
import Confetti from './Confetti';
import { TEAM_MASCOTS } from '../constants';

interface GameOverScreenProps {
  scores: { blue: number; red: number };
  winner: Team | 'tie' | null;
  winnerPlayers: Player[];
  onPlayAgain: () => void;
  onExit: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ scores, winner, winnerPlayers, onPlayAgain, onExit }) => {
  let winnerMessage = '';
  let winnerMascot = '🏆';
  if (winner === 'tie') {
    winnerMessage = "It's a Tie!";
  } else if (winner) {
    winnerMessage = `${winner.charAt(0).toUpperCase() + winner.slice(1)} Team Wins!`;
    winnerMascot = TEAM_MASCOTS[winner];
  }
  
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-[1000] animate-pop-in">
      <Confetti />
      <div className="text-center bg-white/70 p-10 rounded-3xl shadow-2xl">
        <h2 className="text-8xl text-gray-800 mb-4 text-shadow-lg">GAME OVER!</h2>
        <p className="text-7xl font-bold text-yellow-500 text-shadow-lg mb-4 flex items-center justify-center gap-4">
            <span className="text-8xl">{winnerMascot}</span>
            {winnerMessage}
        </p>
        <p className="text-5xl text-gray-700 text-shadow-lg mb-8">
            <span className="text-blue-500">Blue: {scores.blue}</span>
             vs 
            <span className="text-red-500"> Red: {scores.red}</span>
        </p>
      
        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mb-10">
            {winnerPlayers.map(player => (
            <div key={player.id} className={`w-24 h-24 rounded-full bg-white flex justify-center items-center text-5xl border-8 shadow-lg ${player.team === 'blue' ? 'border-blue-500' : 'border-red-500'}`}>
                {player.avatarEmoji}
            </div>
            ))}
        </div>

        <div className="flex gap-8 justify-center">
            <button
            onClick={onPlayAgain}
            className="bg-blue-500 text-white px-12 py-5 rounded-full text-4xl cursor-pointer shadow-xl border-b-8 border-blue-700 hover:bg-blue-400 hover:-translate-y-1 active:translate-y-0 active:border-b-4 transition-all"
            >
            Play Again
            </button>
            <button
            onClick={onExit}
            className="bg-gray-500 text-white px-12 py-5 rounded-full text-4xl cursor-pointer shadow-xl border-b-8 border-gray-700 hover:bg-gray-400 hover:-translate-y-1 active:translate-y-0 active:border-b-4 transition-all"
            >
            Exit
            </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
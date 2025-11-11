import React from 'react';
import type { Player, Team } from '../types';

interface TeamInfoProps {
  team: Team;
  score: number;
  players: Player[];
  activePlayerIndex: number;
}

const TeamInfo: React.FC<TeamInfoProps> = ({ team, score, players, activePlayerIndex }) => {
  if (players.length === 0) return null;

  const isBlue = team === 'blue';
  const teamName = isBlue ? 'Blue Team' : 'Red Team';
  
  const rotatedPlayers = [...players.slice(activePlayerIndex), ...players.slice(0, activePlayerIndex)];
  const activePlayer = rotatedPlayers[0];
  const waitingPlayers = rotatedPlayers.slice(1, 4); // Limit to 3 waiting players

  return (
    <div className={`relative flex flex-col items-center gap-2 w-[280px]`}>
      {/* Combined Score and Name Banner (Enlarged) */}
      <div className="w-full flex items-center justify-center gap-4 bg-white/80 px-5 py-1 rounded-full shadow-lg">
        <h3 className={`text-3xl ${isBlue ? 'text-blue-600' : 'text-red-600'} whitespace-nowrap`}>{teamName}</h3>
        <span className="text-3xl font-bold text-gray-800 text-shadow-lg">{score}</span>
      </div>

      {/* Players (Enlarged) */}
      <div className="flex flex-col items-center gap-1 mt-2">
        {/* Active Player */}
        <div className="flex flex-col items-center transition-transform duration-300 ease-out transform scale-100 z-10">
            <div className="w-20 h-20 rounded-full bg-white flex justify-center items-center border-4 border-yellow-400 shadow-md overflow-hidden">
                <img src={activePlayer.avatarUrl} alt={`${activePlayer.name} avatar`} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <span className={`text-lg font-bold text-white bg-black/50 px-4 py-1 rounded-full -mt-4`}>{activePlayer.name}</span>
        </div>
        {/* Waiting Players */}
        <div className="flex items-center gap-2 -mt-3">
            {waitingPlayers.map(player => (
                <div key={player.id} className="flex flex-col items-center opacity-70">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center border-2 border-gray-400 shadow-sm overflow-hidden">
                        <img src={player.avatarUrl} alt={`${player.name} avatar`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
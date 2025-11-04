import React from 'react';
import type { Teams, Player } from '../types';
import { TEAM_MASCOTS } from '../constants';

interface TeamSetupScreenProps {
  teams: Teams;
  onShuffle: () => void;
  onStart: () => void;
}

const TeamBox: React.FC<{ title: string; teamColor: string; players: Player[]; team: 'blue' | 'red' }> = ({ title, teamColor, players, team }) => (
  <div className={`bg-white/80 p-6 rounded-3xl shadow-xl text-center border-t-8 border-${teamColor}-400`}>
    <h3 className={`text-${teamColor}-600 text-5xl mb-4 flex items-center justify-center gap-3`}>
      {title}
    </h3>
    <div className="grid grid-cols-5 gap-4 p-4 bg-gray-200/50 rounded-2xl min-h-[180px]">
      {players.map(player => (
        <div key={player.id} className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white flex justify-center items-center text-5xl border-4 border-gray-300 shadow-md transform transition-transform hover:scale-110">
              {player.avatarEmoji}
            </div>
            <span className="mt-1 text-gray-700 font-sans font-bold text-sm">{player.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const TeamSetupScreen: React.FC<TeamSetupScreenProps> = ({ teams, onShuffle, onStart }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <h2 className="text-7xl font-bold text-white mb-8 text-shadow-lg">TEAM SETUP</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <TeamBox title="Blue Team" teamColor="blue" players={teams.blue} team="blue"/>
        <TeamBox title="Red Team" teamColor="red" players={teams.red} team="red"/>
      </div>
      <div className="flex gap-8 mt-12">
        <button
          onClick={onShuffle}
          className="bg-[#feca57] text-white px-12 py-5 rounded-full text-4xl cursor-pointer shadow-xl border-b-8 border-[#ff9f43] hover:bg-[#fed330] hover:-translate-y-1 active:translate-y-0 active:border-b-4 transition-all"
        >
          Shuffle Teams
        </button>
        <button
          onClick={onStart}
          className="bg-[#1dd1a1] text-white px-12 py-5 rounded-full text-4xl cursor-pointer shadow-xl border-b-8 border-[#10ac84] hover:bg-[#2ee5b5] hover:-translate-y-1 active:translate-y-0 active:border-b-4 transition-all"
        >
          Start Game!
        </button>
      </div>
    </div>
  );
};

export default TeamSetupScreen;


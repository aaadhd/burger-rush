
import React, { useState } from 'react';
import type { Team, Player, Customer, Quiz, Teams } from '../types';
import TopBar from './TopBar';
import TeamInfo from './TeamInfo';
import CustomerArea from './CustomerArea';
import OrderSequence from './OrderSequence';
import AssemblyStation from './AssemblyStation';
import QuizModal from './QuizModal';
import GameMenuModal from './GameMenuModal';
import TutorialModal from './TutorialModal';

interface GameScreenProps {
  round: number;
  scores: { blue: number; red: number };
  teams: Teams;
  bluePlayerIndex: number;
  redPlayerIndex: number;
  customer: Customer | null;
  order: string[];
  blueAssembly: string[];
  redAssembly: string[];
  quizWinningTeam: Team | null;
  wrongIngredient: { team: Team | null; ingredient: string | null };
  quiz: Quiz | null;
  customerEmotion: 'happy' | 'angry' | null;
  isRoundActive: boolean;
  blueTeamFinished: boolean;
  redTeamFinished: boolean;
  blueNewIngredient?: string | null;
  redNewIngredient?: string | null;
  isPaused: boolean;
  onEndGame: () => void;
  onIngredientClick: (team: Team, ingredient: string) => void;
  onQuizAnswer: (answer: string) => void;
  onExitGame: () => void;
  onPause: () => void;
}

const GameScreen: React.FC<GameScreenProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuGuideOpen, setIsMenuGuideOpen] = useState(false);

  // 라운드가 비활성화되거나 일시정지 중이면 재료 클릭 불가
  const isLocked = !props.isRoundActive || props.isPaused;

  const closeModalsAndUnpause = () => {
    setIsMenuOpen(false);
    setIsMenuGuideOpen(false);
    if (props.isPaused) {
      props.onPause();
    }
  };

  const handleMenuButton = () => {
    setIsMenuOpen(true);
    if (!props.isPaused) {
      props.onPause();
    }
  };

  const handleOpenGuide = () => {
    setIsMenuOpen(false);
    setIsMenuGuideOpen(true);
  };

  const handleCloseGuide = () => {
    closeModalsAndUnpause();
  };

  const handleEndGameFromMenu = () => {
    closeModalsAndUnpause();
    props.onEndGame();
  };

  const handleExitFromMenu = () => {
    closeModalsAndUnpause();
    props.onExitGame();
  };

  return (
    <div className="game-container relative flex flex-col justify-between h-full">
      <TopBar round={props.round} onPause={props.onPause} onOpenMenu={handleMenuButton} buttonsDisabled={isMenuOpen} />

      <div className="flex justify-between items-start px-8 pt-4" style={{ marginTop: '80px' }}>
        <TeamInfo
          team="blue"
          score={props.scores.blue}
          players={props.teams.blue}
          activePlayerIndex={props.bluePlayerIndex}
        />

        <div className="flex flex-col items-center pt-2">
          <CustomerArea customer={props.customer} emotion={props.customerEmotion} />
          <OrderSequence order={props.order} />
        </div>

        <TeamInfo
          team="red"
          score={props.scores.red}
          players={props.teams.red}
          activePlayerIndex={props.redPlayerIndex}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto flex justify-around items-end px-8 pb-4" style={{ height: '420px' }}>
        <AssemblyStation
          team="blue"
          stackedIngredients={props.blueAssembly}
          onIngredientClick={(ing) => props.onIngredientClick('blue', ing)}
          isLocked={isLocked}
          wrongIngredient={props.wrongIngredient.team === 'blue' ? props.wrongIngredient.ingredient : null}
          isTeamFinished={props.blueTeamFinished}
          newlyAddedIngredient={props.blueNewIngredient}
        />
        <AssemblyStation
          team="red"
          stackedIngredients={props.redAssembly}
          onIngredientClick={(ing) => props.onIngredientClick('red', ing)}
          isLocked={isLocked}
          wrongIngredient={props.wrongIngredient.team === 'red' ? props.wrongIngredient.ingredient : null}
          isTeamFinished={props.redTeamFinished}
          newlyAddedIngredient={props.redNewIngredient}
        />
      </div>

      {props.quiz && <QuizModal quiz={props.quiz} onAnswer={props.onQuizAnswer} />}

      {props.isPaused && !isMenuOpen && !isMenuGuideOpen && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1100] font-[Pretendard]">
          <div className="bg-white/95 rounded-3xl px-12 py-10 text-center shadow-2xl">
            <h2 className="text-5xl font-bold text-slate-800 mb-6">Paused</h2>
            <button
              onClick={props.onPause}
              className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white text-xl font-bold transition-transform transform hover:scale-105 shadow-lg"
            >
              Resume
            </button>
          </div>
        </div>
      )}

      <GameMenuModal
        isOpen={isMenuOpen}
        onClose={closeModalsAndUnpause}
        onOpenGuide={handleOpenGuide}
        onEndGame={handleEndGameFromMenu}
        onExit={handleExitFromMenu}
        buttonLabels={{ menuTitle: 'Game Menu', guide: 'Game Guide', endGame: 'End Game', exit: 'Exit' }}
      />
      <TutorialModal isOpen={isMenuGuideOpen} onClose={handleCloseGuide} variant="stage" />
    </div>
  );
};

export default GameScreen;
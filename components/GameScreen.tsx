
import React from 'react';
import type { Team, Player, Customer, Quiz, Teams } from '../types';
import TopBar from './TopBar';
import TeamInfo from './TeamInfo';
import CustomerArea from './CustomerArea';
import OrderSequence from './OrderSequence';
import AssemblyStation from './AssemblyStation';
import QuizModal from './QuizModal';

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
  onEndGame: () => void;
  onIngredientClick: (team: Team, ingredient: string) => void;
  onQuizAnswer: (answer: string) => void;
}

const GameScreen: React.FC<GameScreenProps> = (props) => {
  // 동시 터치를 위해 라운드가 활성화되어 있으면 모든 팀이 클릭 가능
  const isBlueLocked = !props.isRoundActive;
  const isRedLocked = !props.isRoundActive;

  return (
    <div className="game-container relative flex flex-col justify-between h-full">
      <TopBar round={props.round} onEndGame={props.onEndGame} />

      <div className="flex justify-between items-start px-8 pt-4" style={{ marginTop: '56px' }}>
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
          isLocked={isBlueLocked}
          wrongIngredient={props.wrongIngredient.team === 'blue' ? props.wrongIngredient.ingredient : null}
          isTeamFinished={props.blueTeamFinished}
          newlyAddedIngredient={props.blueNewIngredient}
        />
        <AssemblyStation
          team="red"
          stackedIngredients={props.redAssembly}
          onIngredientClick={(ing) => props.onIngredientClick('red', ing)}
          isLocked={isRedLocked}
          wrongIngredient={props.wrongIngredient.team === 'red' ? props.wrongIngredient.ingredient : null}
          isTeamFinished={props.redTeamFinished}
          newlyAddedIngredient={props.redNewIngredient}
        />
      </div>

      {props.quiz && <QuizModal quiz={props.quiz} onAnswer={props.onQuizAnswer} />}
    </div>
  );
};

export default GameScreen;
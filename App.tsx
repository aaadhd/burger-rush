import React from 'react';
import type { Team } from './types';
import { useGameLogic } from './hooks/useGameLogic';
import GameSettingsModal from './components/GameSettingsModal';
import SplashScreen from './components/SplashScreen';
import TeamSetupScreen from './components/TeamSetupScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import MessageBox from './components/MessageBox';
import { TEAM_MASCOTS } from './constants';
import { SuccessParticles } from './components/Confetti';

const GameOverSummary: React.FC<{ winner: Team | 'tie' }> = ({ winner }) => {
    let winnerMessage = '';
    let winnerMascot = '🏆';
    if (winner === 'tie') {
        winnerMessage = "It's a Tie!";
    } else {
        winnerMessage = `${winner.charAt(0).toUpperCase() + winner.slice(1)} Team Wins!`;
        winnerMascot = TEAM_MASCOTS[winner];
    }
    return (
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center z-[1001] animate-pop-in">
            <div className="text-white text-center">
                <h2 className="text-9xl text-shadow-lg">Game Over!</h2>
                <p className="text-7xl mt-4 text-shadow-lg flex items-center gap-4">
                    <span className="text-8xl">{winnerMascot}</span>
                    {winnerMessage}
                </p>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  const game = useGameLogic();

  const renderScreen = () => {
    switch (game.gameState) {
      case 'settings':
        return (
          <GameSettingsModal
            onStart={game.handleStartGameWithSettings}
            onBack={game.handleBackToStart}
            gameGuideText="Game Guide"
            availableLessons={[1, 2, 3, 4, 5, 6, 7, 8]}
            availableLearningFocus={['Vocabulary', 'Reading', 'Speaking', 'Grammar', 'Writing', 'Action Learning']}
            maxRounds={12}
            disabledLessons={[8]}
            customStyles={{
              primaryColor: 'purple',
              buttonColor: 'cyan-500'
            }}
          />
        );
      case 'splash':
        return <SplashScreen />;
      case 'team-setup':
        return <TeamSetupScreen teams={game.teams} onShuffle={game.handleShuffleTeams} onStart={game.handleStartPlaying} />;
      case 'playing':
        return (
          <GameScreen
            round={game.round}
            scores={game.scores}
            teams={game.teams}
            bluePlayerIndex={game.bluePlayerIndex}
            redPlayerIndex={game.redPlayerIndex}
            customer={game.customer}
            order={game.order}
            blueAssembly={game.blueAssembly}
            redAssembly={game.redAssembly}
            quizWinningTeam={game.quizWinningTeam}
            wrongIngredient={game.wrongIngredient}
            quiz={game.quiz}
            customerEmotion={game.customerEmotion}
            isRoundActive={game.isRoundActive}
            blueTeamFinished={game.blueTeamFinished}
            redTeamFinished={game.redTeamFinished}
            blueNewIngredient={game.blueNewIngredient}
            redNewIngredient={game.redNewIngredient}
            onEndGame={game.handleEndGame}
            onIngredientClick={game.handleIngredientClick}
            onQuizAnswer={game.handleQuizAnswer}
          />
        );
      case 'game-over':
        const winner = game.scores.blue > game.scores.red ? 'blue' : game.scores.red > game.scores.blue ? 'red' : 'tie';
        const winnerPlayers = winner === 'tie' ? [...game.teams.blue, ...game.teams.red] : game.teams[winner];
        
        return (
            <div className="w-full h-full game-container">
                {game.gameOverSubState === 'summary' && <GameOverSummary winner={winner} />}
                {game.gameOverSubState === 'final' && <GameOverScreen 
                    scores={game.scores} 
                    winner={winner}
                    winnerPlayers={winnerPlayers}
                    onPlayAgain={game.handlePlayAgain}
                    onExit={game.handleExitGame}
                />}
            </div>
        )
      default:
        return (
          <GameSettingsModal
            onStart={game.handleStartGameWithSettings}
            onBack={game.handleBackToStart}
            gameGuideText="Game Guide"
            availableLessons={[1, 2, 3, 4, 5, 6, 7, 8]}
            availableLearningFocus={['Vocabulary', 'Reading', 'Speaking', 'Grammar', 'Writing', 'Action Learning']}
            maxRounds={12}
            disabledLessons={[8]}
            customStyles={{
              primaryColor: 'purple',
              buttonColor: 'cyan-500'
            }}
          />
        );
    }
  };

  return (
    <main style={{ width: '1280px', height: '800px', overflow: 'hidden' }}>
        {renderScreen()}
        <MessageBox message={game.message} type="info" />
        <MessageBox message={game.comboMessage} type="combo" />

        {/* 성공 파티클 효과 */}
        <SuccessParticles trigger={game.showBlueSuccess} teamColor="blue" />
        <SuccessParticles trigger={game.showRedSuccess} teamColor="red" />
        <SuccessParticles trigger={game.showComboEffect} teamColor={game.quizWinningTeam || 'blue'} />
    </main>
  );
};

export default App;
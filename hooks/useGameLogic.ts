import { useCallback, useMemo, useState } from 'react';
import type { Customer, GameState, Quiz, Team, Teams } from '../types';
import { MAX_ROUNDS, MOCK_CUSTOMERS, MOCK_ORDERS, MOCK_PLAYERS } from '../constants';

type Scores = { blue: number; red: number };

type WrongIngredientState = { team: Team | null; ingredient: string | null };

type GameOverSubState = 'summary' | 'final';

interface GameLogicState {
  gameState: GameState;
  gameOverSubState: GameOverSubState;
  round: number;
  scores: Scores;
  teams: Teams;
  bluePlayerIndex: number;
  redPlayerIndex: number;
  customer: Customer | null;
  order: string[];
  blueAssembly: string[];
  redAssembly: string[];
  quizWinningTeam: Team | null;
  wrongIngredient: WrongIngredientState;
  quiz: Quiz | null;
  customerEmotion: 'happy' | 'angry' | null;
  isRoundActive: boolean;
  blueTeamFinished: boolean;
  redTeamFinished: boolean;
}

interface GameLogicHandlers {
  handleStartGame: () => void;
  handleShuffleTeams: () => void;
  handleStartPlaying: () => void;
  handleEndGame: () => void;
  handlePlayAgain: () => void;
  handleExitGame: () => void;
  handleIngredientClick: (team: Team, ingredient: string) => void;
  handleQuizAnswer: (answer: string) => void;
}

export function useGameLogic(): GameLogicState & GameLogicHandlers {
  const initialTeams: Teams = useMemo(() => {
    // 간단한 팀 배정: 앞 6명 blue, 다음 6명 red
    const blue = MOCK_PLAYERS.slice(0, 6).map((p) => ({ ...p, team: 'blue' as const }));
    const red = MOCK_PLAYERS.slice(6, 12).map((p) => ({ ...p, team: 'red' as const }));
    return { blue, red };
  }, []);

  const [gameState, setGameState] = useState<GameState>('start');
  const [gameOverSubState, setGameOverSubState] = useState<GameOverSubState>('summary');
  const [round, setRound] = useState<number>(1);
  const [scores, setScores] = useState<Scores>({ blue: 0, red: 0 });
  const [teams, setTeams] = useState<Teams>(initialTeams);
  const [bluePlayerIndex, setBluePlayerIndex] = useState<number>(0);
  const [redPlayerIndex, setRedPlayerIndex] = useState<number>(0);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [blueAssembly, setBlueAssembly] = useState<string[]>([]);
  const [redAssembly, setRedAssembly] = useState<string[]>([]);
  const [quizWinningTeam, setQuizWinningTeam] = useState<Team | null>(null);
  const [wrongIngredient, setWrongIngredient] = useState<WrongIngredientState>({ team: null, ingredient: null });
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [customerEmotion, setCustomerEmotion] = useState<'happy' | 'angry' | null>(null);
  const [isRoundActive, setIsRoundActive] = useState<boolean>(false);
  const [blueTeamFinished, setBlueTeamFinished] = useState<boolean>(false);
  const [redTeamFinished, setRedTeamFinished] = useState<boolean>(false);

  const prepareRound = useCallback(() => {
    setCustomer(MOCK_CUSTOMERS[(round - 1) % MOCK_CUSTOMERS.length]);
    setOrder(MOCK_ORDERS[(round - 1) % MOCK_ORDERS.length]);
    setBlueAssembly([]);
    setRedAssembly([]);
    setQuiz(null);
    setQuizWinningTeam(null);
    setWrongIngredient({ team: null, ingredient: null });
    setCustomerEmotion(null);
    setIsRoundActive(true);
    setBlueTeamFinished(false);
    setRedTeamFinished(false);
  }, [round]);

  const handleStartGame = useCallback(() => {
    setScores({ blue: 0, red: 0 });
    setRound(1);
    setGameState('team-setup');
  }, []);

  const handleShuffleTeams = useCallback(() => {
    // 간단 셔플: 배열 회전
    setTeams((prev) => ({
      blue: [...prev.blue.slice(1), prev.blue[0]],
      red: [...prev.red.slice(1), prev.red[0]],
    }));
  }, []);

  const handleStartPlaying = useCallback(() => {
    setGameState('playing');
    prepareRound();
  }, [prepareRound]);

  const handleEndGame = useCallback(() => {
    setIsRoundActive(false);
    setGameState('game-over');
    setGameOverSubState('summary');
    // 요약을 잠깐 보여준 뒤 최종 화면으로 전환 (UI 프레임만)
    setTimeout(() => setGameOverSubState('final'), 800);
  }, []);

  const handlePlayAgain = useCallback(() => {
    setScores({ blue: 0, red: 0 });
    setRound(1);
    setGameState('start');
  }, []);

  const handleExitGame = useCallback(() => {
    setGameState('start');
  }, []);

  const finishIfCompleted = useCallback((team: Team, next: string[]) => {
    const target = order;
    if (next.length === target.length && next.every((v, i) => v === target[i])) {
      if (team === 'blue') setBlueTeamFinished(true);
      if (team === 'red') setRedTeamFinished(true);
      setScores((s) => ({ ...s, [team]: s[team] + 1 }));
    }
  }, [order]);

  const handleIngredientClick = useCallback((team: Team, ingredient: string) => {
    if (!isRoundActive) return;

    const indexForTeam = team === 'blue' ? blueAssembly.length : redAssembly.length;
    const expected = order[indexForTeam];
    if (ingredient !== expected) {
      setWrongIngredient({ team, ingredient });
      setCustomerEmotion('angry');
      setTimeout(() => setWrongIngredient({ team: null, ingredient: null }), 600);
      return;
    }

    if (team === 'blue') {
      const next = [...blueAssembly, ingredient];
      setBlueAssembly(next);
      finishIfCompleted('blue', next);
    } else {
      const next = [...redAssembly, ingredient];
      setRedAssembly(next);
      finishIfCompleted('red', next);
    }

    setCustomerEmotion('happy');
    setTimeout(() => setCustomerEmotion(null), 400);

    // 라운드 종료 체크 (두 팀 모두 완료되면 다음 라운드 또는 게임 종료)
    setTimeout(() => {
      const bothFinished = (team === 'blue' ? blueTeamFinished : redTeamFinished) && (team === 'blue' ? redTeamFinished : blueTeamFinished);
      if (bothFinished) {
        if (round >= MAX_ROUNDS) {
          handleEndGame();
        } else {
          setRound((r) => r + 1);
          prepareRound();
        }
      }
    }, 0);
  }, [isRoundActive, blueAssembly, redAssembly, order, blueTeamFinished, redTeamFinished, round, handleEndGame, prepareRound, finishIfCompleted]);

  const handleQuizAnswer = useCallback((answer: string) => {
    // 데모: 정답이면 파란팀 가산점, 아니면 변화 없음
    if (!quiz) return;
    if (answer === quiz.answer) {
      setQuizWinningTeam('blue');
      setScores((s) => ({ ...s, blue: s.blue + 1 }));
    }
    setQuiz(null);
  }, [quiz]);

  return {
    // state
    gameState,
    gameOverSubState,
    round,
    scores,
    teams,
    bluePlayerIndex,
    redPlayerIndex,
    customer,
    order,
    blueAssembly,
    redAssembly,
    quizWinningTeam,
    wrongIngredient,
    quiz,
    customerEmotion,
    isRoundActive,
    blueTeamFinished,
    redTeamFinished,

    // handlers
    handleStartGame,
    handleShuffleTeams,
    handleStartPlaying,
    handleEndGame,
    handlePlayAgain,
    handleExitGame,
    handleIngredientClick,
    handleQuizAnswer,
  };
}
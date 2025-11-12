import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { GameState, Team, Player, Customer, Quiz, Teams } from '../types';
import type { GameSettings } from '../reference/game-settings-types';
import { MAX_ROUNDS, MOCK_PLAYERS, MOCK_CUSTOMERS, MOCK_ORDERS, MOCK_QUIZZES, BASE_COINS } from '../constants';
import { playSuccess, playError, playBurgerComplete, playQuizCorrect, playQuizWrong, playCombo, playCountdown, playVictory, startBackgroundMusic, stopBackgroundMusic } from '../utils/audioUtils';

type GameOverSubState = 'summary' | 'final';

export const useGameLogic = () => {
    const [gameState, setGameState] = useState<GameState>('settings');
    const [round, setRound] = useState(1);
    const [scores, setScores] = useState({ blue: 0, red: 0 });
    const [teams, setTeams] = useState<Teams>({ blue: [], red: [] });
    const [bluePlayerIndex, setBluePlayerIndex] = useState(0);
    const [redPlayerIndex, setRedPlayerIndex] = useState(0);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [order, setOrder] = useState<string[]>([]);
    const [blueAssembly, setBlueAssembly] = useState<string[]>([]);
    const [redAssembly, setRedAssembly] = useState<string[]>([]);
    const [wrongIngredient, setWrongIngredient] = useState<{ team: Team | null, ingredient: string | null }>({ team: null, ingredient: null });
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [quizWinningTeam, setQuizWinningTeam] = useState<Team | null>(null);
    const [customerEmotion, setCustomerEmotion] = useState<'happy' | 'angry' | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [comboMessage, setComboMessage] = useState<React.ReactNode | null>(null);
    const [combos, setCombos] = useState({ blue: 0, red: 0 });
    const [gameOverSubState, setGameOverSubState] = useState<GameOverSubState | null>(null);

    // 동시 터치를 위한 새로운 상태들
    const [isRoundActive, setIsRoundActive] = useState(false);
    const [blueTeamFinished, setBlueTeamFinished] = useState(false);
    const [redTeamFinished, setRedTeamFinished] = useState(false);
    const [roundEndTime, setRoundEndTime] = useState<number | null>(null);
    const roundTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 파티클 효과를 위한 상태
    const [showBlueSuccess, setShowBlueSuccess] = useState(false);
    const [showRedSuccess, setShowRedSuccess] = useState(false);
    const [showComboEffect, setShowComboEffect] = useState(false);

    // 새로 추가된 재료 추적 (애니메이션용)
    const [blueNewIngredient, setBlueNewIngredient] = useState<string | null>(null);
    const [redNewIngredient, setRedNewIngredient] = useState<string | null>(null);

    // 일시정지 상태
    const [isPaused, setIsPaused] = useState(false);

    const showMessage = (msg: string, duration = 1500) => {
        setMessage(msg);
        setTimeout(() => setMessage(null), duration);
    };
    
    const showCombo = (content: React.ReactNode, duration = 2500) => {
        setComboMessage(content);
        setTimeout(() => setComboMessage(null), duration);
    };
    
    const initializeTeams = useCallback(() => {
        const blue: Player[] = [];
        const red: Player[] = [];
        MOCK_PLAYERS.forEach((p, i) => {
            if (i % 2 === 0) blue.push({ ...p, team: 'blue' });
            else red.push({ ...p, team: 'red' });
        });
        setTeams({ blue, red });
    }, []);

    const handleOpenSettings = () => {
        setGameState('settings');
    };

    const handleBackToStart = () => {
        setGameState('settings');
    };

    const handleStartGameWithSettings = (settings: GameSettings) => {
        // 설정을 저장하거나 사용할 수 있음
        console.log('Game settings:', settings);
        // 예: settings.rounds를 사용하여 MAX_ROUNDS를 변경할 수 있음
        // 예: settings.quizIncluded를 사용하여 퀴즈 기능을 제어할 수 있음
        initializeTeams();
        setGameState('splash');
        // 2초 후 팀 셋업 화면으로 이동
        setTimeout(() => {
            setGameState('team-setup');
        }, 2000);
    };

    const handleStartGame = () => {
        initializeTeams();
        setGameState('team-setup');
    };
    
    const handleShuffleTeams = () => {
        const allPlayers = [...teams.blue, ...teams.red].sort(() => Math.random() - 0.5);
        const blue: Player[] = [];
        const red: Player[] = [];
        allPlayers.forEach((p, i) => {
            if (i % 2 === 0) blue.push({ ...p, team: 'blue' });
            else red.push({ ...p, team: 'red' });
        });
        setTeams({ blue, red });
    };

    const prepareNextRound = useCallback(() => {
        const nextRound = round + 1;

        if (nextRound > MAX_ROUNDS) {
            setGameState('game-over');
            setGameOverSubState('summary');

            // 배경음악 정지 및 승리 효과음
            stopBackgroundMusic();
            playVictory();

            setTimeout(() => setGameOverSubState('final'), 2000);
            return;
        }

        setRound(nextRound);
        setBluePlayerIndex(prev => (prev + 1) % (teams.blue.length || 1));
        setRedPlayerIndex(prev => (prev + 1) % (teams.red.length || 1));
        
    }, [round, teams.blue.length, teams.red.length]);
    
    const startNewRound = useCallback(() => {
        setIsRoundActive(false);
        setBlueTeamFinished(false);
        setRedTeamFinished(false);
        setRoundEndTime(null);

        // 모든 타이머 정리
        if (roundTimeoutRef.current) {
            clearTimeout(roundTimeoutRef.current);
        }
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
        }
        if (messageTimeoutRef.current) {
            clearTimeout(messageTimeoutRef.current);
        }

        setCustomer(MOCK_CUSTOMERS[Math.floor(Math.random() * MOCK_CUSTOMERS.length)]);
        setOrder(MOCK_ORDERS[Math.floor(Math.random() * MOCK_ORDERS.length)]);
        setBlueAssembly([]);
        setRedAssembly([]);
        setQuiz(null);
        setQuizWinningTeam(null);
        setCustomerEmotion(null);
        setBlueNewIngredient(null);
        setRedNewIngredient(null);

        showMessage(`Round ${round}`, 1500);
        const msgTimeout = setTimeout(() => {
            if (isPaused) return;

            let countdown = 3;
            const interval = setInterval(() => {
                if (isPaused) {
                    clearInterval(interval);
                    return;
                }

                if (countdown > 0) {
                    showMessage(`${countdown}`, 900);
                    playCountdown(countdown);
                    countdown--;
                } else {
                    showMessage('Go!', 900);
                    playCountdown(0);
                    setIsRoundActive(true);

                    startBackgroundMusic();

                    const timeout = setTimeout(() => {
                        if (isRoundActive && !isPaused) {
                            endRound();
                        }
                    }, 30000);
                    roundTimeoutRef.current = timeout;

                    clearInterval(interval);
                    countdownIntervalRef.current = null;
                }
            }, 1000);
            countdownIntervalRef.current = interval;
        }, 1500);
        messageTimeoutRef.current = msgTimeout;

    }, [round, isPaused]);

    const endRound = useCallback(() => {
        setIsRoundActive(false);
        setRoundEndTime(Date.now());

        // 배경음악 정지
        stopBackgroundMusic();

        // 두 팀 모두 완성하지 못한 경우
        if (!blueTeamFinished && !redTeamFinished) {
            showMessage('Time\'s up!', 2000);
            setTimeout(() => {
                prepareNextRound();
            }, 2500);
        }
    }, [blueTeamFinished, redTeamFinished, prepareNextRound]);

    useEffect(() => {
        if(gameState === 'playing') {
            startNewRound();
        }
    }, [round, gameState, startNewRound]);

    const handleStartPlaying = () => {
        setRound(1);
        setScores({ blue: 0, red: 0 });
        setBluePlayerIndex(0);
        setRedPlayerIndex(0);
        setCombos({ blue: 0, red: 0 });
        setGameState('playing');
    };
    
    const handleIngredientClick = (team: Team, ingredient: string) => {
        if (!isRoundActive || isPaused) {
            return;
        }

        // 즉시 처리하여 동시 터치 허용
        const currentAssembly = team === 'blue' ? blueAssembly : redAssembly;
        const setAssembly = team === 'blue' ? setBlueAssembly : setRedAssembly;
        
        // 디버깅 로그
        console.log(`${team} team clicked ${ingredient}, current length: ${currentAssembly.length}, order length: ${order.length}`);
        
        // 이미 완성된 팀은 더 이상 재료를 추가하지 않음 (하지만 클릭은 허용)
        if (currentAssembly.length >= order.length) {
            console.log(`${team} team already finished, click ignored`);
            // 완성된 팀이 클릭해도 아무 일도 일어나지 않음 (시각적 피드백만)
            return;
        }

        const nextExpectedIngredient = order[currentAssembly.length];

        if (ingredient === nextExpectedIngredient) {
            const newAssembly = [...currentAssembly, ingredient];
            setAssembly(newAssembly);
            console.log(`${team} team added ${ingredient}, new length: ${newAssembly.length}`);

            // 새로 추가된 재료 표시 (애니메이션 트리거)
            if (team === 'blue') {
                setBlueNewIngredient(ingredient);
                setTimeout(() => setBlueNewIngredient(null), 500);
            } else {
                setRedNewIngredient(ingredient);
                setTimeout(() => setRedNewIngredient(null), 500);
            }

            if (newAssembly.length === order.length) {
                // 팀이 완성함
                if (team === 'blue') {
                    setBlueTeamFinished(true);
                    setShowBlueSuccess(true);
                    setTimeout(() => setShowBlueSuccess(false), 2000);
                } else {
                    setRedTeamFinished(true);
                    setShowRedSuccess(true);
                    setTimeout(() => setShowRedSuccess(false), 2000);
                }

                console.log(`${team} team finished!`);
                showMessage(`${team.charAt(0).toUpperCase() + team.slice(1)} Team finished!`);

                // 햄버거 완성 효과음 (완성시에는 완성 사운드만)
                playBurgerComplete();

                // 배경음악 정지
                stopBackgroundMusic();

                // 첫 번째로 완성한 팀이 나오면 즉시 퀴즈를 오픈하고 라운드 입력을 잠금
                if (!quizWinningTeam) {
                    setIsRoundActive(false);
                    setQuizWinningTeam(team);
                    setTimeout(() => {
                        setQuiz(MOCK_QUIZZES[Math.floor(Math.random() * MOCK_QUIZZES.length)]);
                    }, 1000);
                }
            } else {
                // 일반 재료 추가 성공 효과음 (완성이 아닐 때만)
                console.log(`Playing SUCCESS sound for ${team} team`);
                playSuccess();
            }
        } else {
            console.log(`${team} team wrong ingredient: ${ingredient}, expected: ${nextExpectedIngredient}`);
            console.log(`Playing ERROR sound for ${team} team`);
            setWrongIngredient({ team, ingredient });
            setTimeout(() => setWrongIngredient({ team: null, ingredient: null }), 500);

            // 실패 효과음 재생
            playError();
        }
    };

    const handleQuizAnswer = (answer: string) => {
        if (!quiz || !quizWinningTeam) return;

        const opponentTeam = quizWinningTeam === 'blue' ? 'red' : 'blue';

        if (answer === quiz.answer) {
            const newCombo = combos[quizWinningTeam] + 1;
            setCombos(prev => ({...prev, [quizWinningTeam]: newCombo, [opponentTeam]: 0}));

            let points = BASE_COINS;
            let bonus = 0;

            // 정답 효과음
            playQuizCorrect();

            if (newCombo >= 2) {
                bonus = 10 + (10 * (newCombo - 2));
                points += bonus;

                // 콤보 효과음
                playCombo(newCombo);

                // 콤보 파티클 효과
                setShowComboEffect(true);
                setTimeout(() => setShowComboEffect(false), 2000);

                showCombo(
                    React.createElement('div', { className: "flex flex-col items-center text-center" },
                        React.createElement('span', { className: "text-5xl" }, `${newCombo} Combos!`),
                        React.createElement('span', { className: "text-3xl mt-2" }, `${BASE_COINS} coins! + ${bonus} coins!`)
                    )
                );
            } else {
                 showMessage('Good Job!');
            }

            setScores(prev => ({ ...prev, [quizWinningTeam]: prev[quizWinningTeam] + points }));
            setCustomerEmotion('happy');
        } else {
            showMessage('Uh-oh!');
            setCombos(prev => ({...prev, [quizWinningTeam]: 0}));
            setCustomerEmotion('angry');

            // 오답 효과음
            playQuizWrong();
        }
        setQuiz(null);
        // 첫 팀의 퀴즈 결과 발표 후 즉시 다음 라운드로 진행
        setTimeout(prepareNextRound, 2500);
    };

    const handleEndGame = () => {
      setGameState('game-over');
      setGameOverSubState('final');

      // 배경음악 정지
      stopBackgroundMusic();

      // 승리 효과음
      playVictory();
    };

    const resetGame = () => {
        setGameState('start');
        setRound(1);
        setScores({ blue: 0, red: 0 });
        setTeams({ blue: [], red: [] });
        setBluePlayerIndex(0);
        setRedPlayerIndex(0);
        setCustomer(null);
        setOrder([]);
        setBlueAssembly([]);
        setRedAssembly([]);
        setQuiz(null);
        setQuizWinningTeam(null);
        setCustomerEmotion(null);
        setMessage(null);
        setCombos({ blue: 0, red: 0 });
        setGameOverSubState(null);
        setIsRoundActive(false);
        setBlueTeamFinished(false);
        setRedTeamFinished(false);
        setRoundEndTime(null);
        setBlueNewIngredient(null);
        setRedNewIngredient(null);
        if (roundTimeoutRef.current) {
            clearTimeout(roundTimeoutRef.current);
        }

        // 배경음악 정지
        stopBackgroundMusic();
    }

    const handlePlayAgain = () => {
        resetGame();
        setGameState('settings');
    };

    const handleExitGame = () => {
        resetGame();
        setGameState('settings');
    };

    const handlePause = () => {
        setIsPaused(prev => {
            const newPaused = !prev;

            if (newPaused) {
                // 일시정지: 모든 타이머 멈추기
                if (roundTimeoutRef.current) {
                    clearTimeout(roundTimeoutRef.current);
                    roundTimeoutRef.current = null;
                }
                if (countdownIntervalRef.current) {
                    clearInterval(countdownIntervalRef.current);
                    countdownIntervalRef.current = null;
                }
                if (messageTimeoutRef.current) {
                    clearTimeout(messageTimeoutRef.current);
                    messageTimeoutRef.current = null;
                }
                // 배경음악 정지
                stopBackgroundMusic();
            }

            return newPaused;
        });
    };

    return {
        gameState,
        round,
        scores,
        teams,
        bluePlayerIndex,
        redPlayerIndex,
        customer,
        order,
        blueAssembly,
        redAssembly,
        wrongIngredient,
        quiz,
        quizWinningTeam,
        customerEmotion,
        message,
        comboMessage,
        gameOverSubState,
        isRoundActive,
        blueTeamFinished,
        redTeamFinished,
        showBlueSuccess,
        showRedSuccess,
        showComboEffect,
        blueNewIngredient,
        redNewIngredient,
        isPaused,
        handleOpenSettings,
        handleBackToStart,
        handleStartGameWithSettings,
        handleStartGame,
        handleShuffleTeams,
        handleStartPlaying,
        handleIngredientClick,
        handleQuizAnswer,
        handleEndGame,
        handlePlayAgain,
        handleExitGame,
        handlePause,
    };
};

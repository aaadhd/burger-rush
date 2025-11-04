// 필요한 타입 정의들
export type Team = 'blue' | 'red';

export interface Player {
  id: string;
  name: string;
  avatarEmoji: string;
  team: Team;
}

export interface Teams {
  blue: Player[];
  red: Player[];
}

// 팀 세팅에 필요한 상수들
export const TEAM_MASCOTS: { [key in Team]: string } = {
  blue: '🐻', // Bear
  red: '🦊'   // Fox
};

export const MOCK_PLAYERS: Omit<Player, 'team'>[] = [
  { id: 'p1', name: 'Emily', avatarEmoji: '👩‍🦰' },
  { id: 'p2', name: 'John', avatarEmoji: '👨‍🦱' },
  { id: 'p3', name: 'Olivia', avatarEmoji: '👩🏻‍🦱' },
  { id: 'p4', name: 'Mike', avatarEmoji: '👨🏼‍🦳' },
  { id: 'p5', name: 'James', avatarEmoji: '👨🏽‍🦱' },
  { id: 'p6', name: 'Lily', avatarEmoji: '👩🏻‍🦳' },
  { id: 'p7', name: 'Jacob', avatarEmoji: '🧑🏾‍🦱' },
  { id: 'p8', name: 'Bella', avatarEmoji: '👱‍♀️' },
  { id: 'p9', name: 'David', avatarEmoji: '🧑🏻‍🦰' },
  { id: 'p10', name: 'Tom', avatarEmoji: '👨🏻‍🎤' },
  { id: 'p11', name: 'Alice', avatarEmoji: '👩🏼‍🎤' },
  { id: 'p12', name: 'Chloe', avatarEmoji: '👧🏽' }
];

// 팀 초기화 유틸리티 함수들
export const initializeTeams = (players: Omit<Player, 'team'>[]) => {
  const blue: Player[] = [];
  const red: Player[] = [];
  
  players.forEach((player, index) => {
    if (index % 2 === 0) {
      blue.push({ ...player, team: 'blue' });
    } else {
      red.push({ ...player, team: 'red' });
    }
  });
  
  return { blue, red };
};

export const shuffleTeams = (teams: Teams) => {
  const allPlayers = [...teams.blue, ...teams.red].sort(() => Math.random() - 0.5);
  const blue: Player[] = [];
  const red: Player[] = [];
  
  allPlayers.forEach((player, index) => {
    if (index % 2 === 0) {
      blue.push({ ...player, team: 'blue' });
    } else {
      red.push({ ...player, team: 'red' });
    }
  });
  
  return { blue, red };
};



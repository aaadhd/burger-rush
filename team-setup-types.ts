// 필요한 타입 정의들
export type Team = 'blue' | 'red';

export interface Player {
  id: string;
  name: string;
  avatarUrl: string;
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
  { id: 'p1', name: 'Emily', avatarUrl: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Emily' },
  { id: 'p2', name: 'John', avatarUrl: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=John' },
  { id: 'p3', name: 'Olivia', avatarUrl: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Olivia' },
  { id: 'p4', name: 'Mike', avatarUrl: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Mike' },
  { id: 'p5', name: 'James', avatarUrl: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=James' },
  { id: 'p6', name: 'Lily', avatarUrl: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Lily' },
  { id: 'p7', name: 'Jacob', avatarUrl: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Jacob' },
  { id: 'p8', name: 'Bella', avatarUrl: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Bella' },
  { id: 'p9', name: 'David', avatarUrl: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=David' },
  { id: 'p10', name: 'Tom', avatarUrl: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Tom' },
  { id: 'p11', name: 'Alice', avatarUrl: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Alice' },
  { id: 'p12', name: 'Chloe', avatarUrl: 'https://api.dicebear.com/9.x/open-peeps/svg?seed=Chloe' }
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



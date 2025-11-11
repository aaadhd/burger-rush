
export type GameState = 'settings' | 'splash' | 'team-setup' | 'playing' | 'game-over';
export type Team = 'blue' | 'red';

export interface Player {
  id: string;
  name: string;
  avatarUrl: string;
  team: Team;
}

export interface Ingredient {
  name: string;
  emoji: string;
}

export interface Ingredients {
  [key: string]: Ingredient;
}

export interface Customer {
  name: string;
  emoji: string;
  happyEmoji: string;
  angryEmoji: string;
}

export interface Quiz {
  question: string;
  options: string[];
  answer: string;
}

export interface Teams {
  blue: Player[];
  red: Player[];
}

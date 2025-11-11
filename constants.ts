import type { Player, Ingredients, Customer, Quiz, Team } from './types';

export const MAX_ROUNDS = 5;
export const BASE_COINS = 20;

export const TEAM_MASCOTS: { [key in Team]: string } = {
  blue: '🐻', // Bear
  red: '🦊'   // Fox
};

export const INGREDIENTS: Ingredients = {
  'bun-bottom': { name: '아래 빵', emoji: '🍞' },
  'patty': { name: '패티', emoji: '🥩' },
  'cheese': { name: '치즈', emoji: '🧀' },
  'lettuce': { name: '상추', emoji: '🥬' },
  'tomato': { name: '토마토', emoji: '🍅' },
  'onion': { name: '양파', emoji: '🧅' },
  'bun-top': { name: '위 빵', emoji: '🍞' }
};

// Defines the height of each ingredient for realistic stacking
export const INGREDIENT_STYLES: { [key: string]: { height: number } } = {
  'bun-bottom': { height: 20 },
  'patty':      { height: 18 },
  'cheese':     { height: 5 },
  'lettuce':    { height: 8 },
  'tomato':     { height: 10 },
  'onion':      { height: 12 },
  'bun-top':    { height: 25 }
};


export const MOCK_CUSTOMERS: Customer[] = [
  { name: 'Cat', emoji: '🐱', happyEmoji: '😊', angryEmoji: '😠' },
  { name: 'Dog', emoji: '🐶', happyEmoji: '😊', angryEmoji: '😠' },
  { name: 'Rabbit', emoji: '🐰', happyEmoji: '😊', angryEmoji: '😠' },
  { name: 'Frog', emoji: '🐸', happyEmoji: '😊', angryEmoji: '😠' },
  { name: 'Bear', emoji: '🐻', happyEmoji: '😊', angryEmoji: '😠' }
];

export const MOCK_ORDERS: string[][] = [
  ['bun-bottom', 'patty', 'cheese', 'bun-top'], // Classic Cheese
  ['bun-bottom', 'lettuce', 'patty', 'tomato', 'bun-top'], // Classic Salad
  ['bun-bottom', 'patty', 'onion', 'lettuce', 'bun-top'], // Classic Onion
  ['bun-bottom', 'patty', 'cheese', 'tomato', 'lettuce', 'bun-top'], // The Works
  ['bun-bottom', 'patty', 'onion', 'bun-top'], // Simple Onion
  ['bun-bottom', 'patty', 'cheese', 'onion', 'tomato', 'bun-top'], // Deluxe Onion
  ['bun-bottom', 'lettuce', 'tomato', 'onion', 'bun-top'], // Veggie (no patty)
  ['bun-bottom', 'patty', 'patty', 'cheese', 'bun-top'], // Double Patty
];

export const MOCK_QUIZZES: Quiz[] = [
  {
    question: "What animal says 'meow'?",
    options: ["Dog", "Cat", "Pig", "Cow"],
    answer: "Cat"
  },
  {
    question: "Which color is a banana?",
    options: ["Red", "Blue", "Yellow", "Green"],
    answer: "Yellow"
  },
  {
    question: "What do you use to write?",
    options: ["Spoon", "Pencil", "Shoe", "Hat"],
    answer: "Pencil"
  },
  {
    question: "How many eyes do you have?",
    options: ["One", "Two", "Three", "Four"],
    answer: "Two"
  },
  {
    question: "What is the opposite of 'hot'?",
    options: ["Warm", "Cold", "Big", "Small"],
    answer: "Cold"
  }
];

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
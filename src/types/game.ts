// src/types/game.ts

export type CardType = 'number' | 'operator' | 'mixed';
export type Operator = '+' | '-' | '×' | '÷';

export interface Card {
  id: string;
  value: string;
  type: CardType;
  isUsed: boolean;
  position: number;
}

export interface GameState {
  targetNumber: number;
  cards: Card[];
  selectedCards: Card[];
  timeLeft: number;
  score: number;
  totalScore: number;
  shufflesLeft: number;
  gameOver: boolean;
  calculationResult: number | null;
  message: string;
  solvedProblems: number;
  isCalculating: boolean;
}

export interface Position {
  row: number;
  col: number;
}
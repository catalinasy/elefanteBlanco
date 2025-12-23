export interface GameCard {
  id: number;
  instruction: string;
  type: 'swap' | 'steal' | 'choose' | 'special';
}

export interface GameState {
  currentPlayerIndex: number;
  totalPlayers: number;
  totalGifts: number;
  drawnCards: number[];
  gameStarted: boolean;
}
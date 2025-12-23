import { GameCard } from './types';

export const gameCards: GameCard[] = [
  { id: 1, instruction: "Intercambia tu regalo con la persona a tu derecha", type: 'swap' },
  { id: 2, instruction: "Intercambia tu regalo con la persona a tu izquierda", type: 'swap' },
  { id: 3, instruction: "El regalo número 5 intercambia con el número 9", type: 'swap' },
  { id: 4, instruction: "Roba el regalo de cualquier persona que ya haya jugado", type: 'steal' },
  { id: 5, instruction: "Elige cualquier regalo de la mesa", type: 'choose' },
  { id: 6, instruction: "Intercambia tu regalo con el jugador que tenga el regalo más pequeño", type: 'swap' },
  { id: 7, instruction: "El regalo número 3 intercambia con el número 7", type: 'swap' },
  { id: 8, instruction: "Todos los regalos rotan una posición hacia la derecha", type: 'special' },
  { id: 9, instruction: "Roba el regalo del jugador anterior", type: 'steal' },
  { id: 10, instruction: "Intercambia tu regalo con el primer jugador", type: 'swap' },
  { id: 11, instruction: "El regalo número 2 intercambia con el número 8", type: 'swap' },
  { id: 12, instruction: "Elige entre los últimos 3 regalos de la mesa", type: 'choose' },
  { id: 13, instruction: "Intercambia tu regalo con el jugador que esté sentado frente a ti", type: 'swap' },
  { id: 14, instruction: "Roba el regalo más grande que veas", type: 'steal' },
  { id: 15, instruction: "El regalo número 1 intercambia con el número 6", type: 'swap' },
  { id: 16, instruction: "Todos los regalos rotan una posición hacia la izquierda", type: 'special' },
  { id: 17, instruction: "Puedes quedarte con tu regalo o robarte cualquier otro", type: 'choose' },
  { id: 18, instruction: "Intercambia tu regalo con el jugador más joven", type: 'swap' },
  { id: 19, instruction: "El regalo número 4 intercambia con el número 10", type: 'swap' },
  { id: 20, instruction: "¡Comodín! Puedes hacer lo que quieras con tu regalo", type: 'special' }
];
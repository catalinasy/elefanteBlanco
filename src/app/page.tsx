'use client';

import { useState } from 'react';
import GameCard from './components/GameCard';
import { GameCard as GameCardType } from './types';

export default function Home() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [drawnCards, setDrawnCards] = useState<GameCardType[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [numberOfPresents, setNumberOfPresents] = useState<number>(14);
  const [gameCards, setGameCards] = useState<GameCardType[]>([]);

  const generateGameCards = (numPresents: number): GameCardType[] => {
    const baseCards: Omit<GameCardType, 'id'>[] = [
      { type: 'steal', instruction: 'Roba el regalo de cualquier jugador' },
      { type: 'steal', instruction: 'Roba el regalo del jugador con más colores en la ropa' },
      { type: 'swap', instruction: 'Intercambia regalos con el jugador a tu derecha' },
      { type: 'swap', instruction: 'Intercambia regalos con el jugador a tu izquierda' },
      { type: 'swap', instruction: 'Intercambia regalos con el jugador de enfrente' },
      { type: 'swap', instruction: 'Intercambia regalos con el jugador que esté más lejos de ti' },
      { type: 'special', instruction: 'Todos los jugadores pasan su regalo al jugador de la derecha' },
      { type: 'special', instruction: 'Todos los jugadores pasan su regalo al jugador de la izquierda' },
      { type: 'steal', instruction: 'Roba 2 regalos diferentes de jugadores distintos, quédate con uno y devuelve el otro' },
      { type: 'special', instruction: 'Mezcla todos los regalos y redistribuye aleatoriamente' },
      { type: 'steal', instruction: 'Roba el regalo más grande que veas' },
      { type: 'steal', instruction: 'Roba el regalo más pequeño que veas' },
      { type: 'steal', instruction: 'Roba el regalo del jugador que lleve puesto más verde' },
      { type: 'steal', instruction: 'Roba el regalo del jugador con más botones en la ropa' },
      { type: 'steal', instruction: 'Roba el regalo del jugador más joven' },
      { type: 'steal', instruction: 'Roba el regalo del jugador de mayor edad' },
      { type: 'swap', instruction: 'Intercambia regalos con quien esté vestido de rojo' },
      { type: 'special', instruction: 'Todos intercambian regalos con la persona de enfrente' },
      { type: 'steal', instruction: 'Roba el regalo de quien tenga más joyas puestas' },
      { type: 'steal', instruction: 'Roba el regalo de quien tenga el cabello más largo' }
    ];

    const finalCard: Omit<GameCardType, 'id'> = {
      type: 'special',
      instruction: 'Cualquier jugador que tenga su propio regalo intercambia con el jugador de la derecha 🔄'
    };

    const cards: GameCardType[] = [];
    
    // Generate cards for numPresents - 1 (save last spot for final card)
    const cardsNeeded = numPresents - 1;
    
    for (let i = 0; i < cardsNeeded && i < baseCards.length; i++) {
      cards.push({
        id: i + 1,
        ...baseCards[i]
      });
    }

    // If we need more cards than base cards, repeat some
    if (cardsNeeded > baseCards.length) {
      const remaining = cardsNeeded - baseCards.length;
      for (let i = 0; i < remaining; i++) {
        const baseCard = baseCards[i % baseCards.length];
        cards.push({
          id: baseCards.length + i + 1,
          ...baseCard
        });
      }
    }

    // Always add the final card as the last card
    cards.push({
      id: numPresents,
      ...finalCard
    });

    return cards;
  };

  const drawNextCard = () => {
    const availableCards = gameCards.filter(card => !drawnCards.some(drawn => drawn.id === card.id));
    
    if (availableCards.length === 0) {
      return; // No more cards to draw
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];
    
    const newDrawnCards = [...drawnCards, selectedCard];
    setDrawnCards(newDrawnCards);
    setCurrentCardIndex(newDrawnCards.length - 1);
  };

  const goToPrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentCardIndex < drawnCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      drawNextCard();
    }
  };

  const resetGame = () => {
    setCurrentCardIndex(0);
    setDrawnCards([]);
    setGameStarted(false);
    setGameCards([]);
  };

  const startGame = () => {
    const cards = generateGameCards(numberOfPresents);
    setGameCards(cards);
    setGameStarted(true);
    // Draw first card
    const randomIndex = Math.floor(Math.random() * cards.length);
    const firstCard = cards[randomIndex];
    setDrawnCards([firstCard]);
    setCurrentCardIndex(0);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const cardWidth = rect.width;
    
    if (clickX < cardWidth / 2) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(to bottom right, #EEA727, #FFEF5F)'}}>
      <div className="h-screen p-6 flex flex-col">
        {!gameStarted ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
              <h1 className="text-4xl font-bold mb-4" style={{color: '#4D2B8C'}}>
                🎁 Elefante Blanco 🎁
              </h1>
              <p className="text-lg mb-8" style={{color: '#4D2B8C'}}>
                ¡Bienvenido al juego navideño de intercambio de regalos! Cada carta tiene una instrucción especial que hará que el juego sea divertido e impredecible.
              </p>
              <div className="mb-6 flex flex-col items-center space-y-3">
                <label className="text-lg font-bold" style={{color: '#4D2B8C'}}>
                  Número de regalos:
                </label>
                <input
                  type="number"
                  min="4"
                  max="30"
                  value={numberOfPresents}
                  onChange={(e) => setNumberOfPresents(Math.max(4, Math.min(30, parseInt(e.target.value) || 4)))}
                  className="w-24 px-3 py-2 text-lg text-center border-2 rounded-lg"
                  style={{borderColor: '#EEA727', backgroundColor: '#FFEF5F', color: '#4D2B8C'}}
                />
              </div>
              <button
                onClick={startGame}
                className="text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
                style={{backgroundColor: '#4D2B8C'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#85409D'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4D2B8C'}
              >
                Iniciar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full h-[80%]">
              <GameCard
                card={drawnCards[currentCardIndex] || null}
                isRevealed={true}
                onClick={handleCardClick}
              />
            </div>

            <div className="h-[20%] flex items-center justify-center">
              <button
                onClick={resetGame}
                className="text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
                style={{backgroundColor: '#4D2B8C'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#85409D'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4D2B8C'}
              >
                Reset
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

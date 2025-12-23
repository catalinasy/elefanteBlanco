'use client';

import { useState } from 'react';
import GameCard from '../components/GameCard';
import { GameCard as GameCardType } from '../types';

export default function CardsPage() {
  const [selectedCard, setSelectedCard] = useState<GameCardType | null>(null);

  const generateAllCards = (): GameCardType[] => {
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
      { type: 'steal', instruction: 'Roba el regalo de quien tenga el cabello más largo' },
      { type: 'special', instruction: 'Cualquier jugador que tenga su propio regalo intercambia con el jugador de la derecha 🔄' }
    ];

    return baseCards.map((card, index) => ({
      id: index + 1,
      ...card
    }));
  };

  const allCards = generateAllCards();

  const getCardTypeColor = (type: GameCardType['type']) => {
    switch (type) {
      case 'swap': return '#4D2B8C';
      case 'steal': return '#85409D';
      case 'choose': return '#EEA727';
      case 'special': return '#FFEF5F';
      default: return '#4D2B8C';
    }
  };

  const getCardTypeName = (type: GameCardType['type']) => {
    switch (type) {
      case 'swap': return 'Intercambio';
      case 'steal': return 'Robo';
      case 'choose': return 'Elección';
      case 'special': return 'Especial';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen p-8" style={{background: 'linear-gradient(to bottom right, #EEA727, #FFEF5F)'}}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{color: '#4D2B8C'}}>
          🎴 Todas las Cartas Disponibles
        </h1>

        <div className="flex gap-8">
          {/* Card List */}
          <div className="w-1/2">
            <div className="bg-white rounded-lg p-6 shadow-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: '#4D2B8C'}}>
                Lista de Cartas ({allCards.length})
              </h2>
              
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {allCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-3 rounded-lg cursor-pointer transition-all hover:shadow-md border-l-4"
                    style={{
                      backgroundColor: selectedCard?.id === card.id ? 'rgba(77, 43, 140, 0.1)' : 'white',
                      borderLeftColor: getCardTypeColor(card.type)
                    }}
                    onClick={() => setSelectedCard(card)}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{backgroundColor: getCardTypeColor(card.type)}}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium" style={{color: '#4D2B8C'}}>
                          {getCardTypeName(card.type)} #{card.id}
                        </div>
                        <div className="text-sm text-gray-600 line-clamp-2">
                          {card.instruction}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card Preview */}
          <div className="w-1/2">
            <div className="bg-white rounded-lg p-6 shadow-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: '#4D2B8C'}}>
                Vista Previa
              </h2>
              
              {selectedCard ? (
                <div className="w-full max-w-sm mx-auto" style={{aspectRatio: '5/3'}}>
                  <GameCard
                    card={selectedCard}
                    isRevealed={true}
                    onClick={() => {}}
                  />
                </div>
              ) : (
                <div 
                  className="w-full max-w-sm mx-auto flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg"
                  style={{aspectRatio: '5/3'}}
                >
                  Selecciona una carta para verla
                </div>
              )}

              {selectedCard && (
                <div className="mt-4 p-4 rounded-lg" style={{backgroundColor: 'rgba(77, 43, 140, 0.05)'}}>
                  <div className="text-sm font-medium mb-2" style={{color: '#4D2B8C'}}>
                    Detalles de la Carta
                  </div>
                  <div className="space-y-1 text-sm">
                    <div><strong>ID:</strong> {selectedCard.id}</div>
                    <div><strong>Tipo:</strong> {getCardTypeName(selectedCard.type)}</div>
                    <div><strong>Color:</strong> {getCardTypeColor(selectedCard.type)}</div>
                    <div><strong>Instrucción:</strong> {selectedCard.instruction}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/"
            className="inline-block px-6 py-3 text-white font-bold rounded-lg transition-colors"
            style={{backgroundColor: '#4D2B8C'}}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#85409D'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4D2B8C'}
          >
            ← Volver al Juego
          </a>
        </div>
      </div>
    </div>
  );
}
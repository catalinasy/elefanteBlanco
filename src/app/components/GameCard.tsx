'use client';

import { useState, useRef } from 'react';
import { GameCard as GameCardType } from '../types';

interface GameCardProps {
  card: GameCardType | null;
  isRevealed: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export default function GameCard({ card, isRevealed, onClick }: GameCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const getCardColor = (type: GameCardType['type']) => {
    switch (type) {
      case 'swap': return '#4D2B8C';
      case 'steal': return '#85409D';
      case 'choose': return '#EEA727';
      case 'special': return '#FFEF5F';
      default: return '#4D2B8C';
    }
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    setTranslateX(deltaX);
  };

  const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const threshold = 50;
    if (Math.abs(translateX) > threshold) {
      // Trigger swipe action based on direction
      if (translateX > 0) {
        // Swipe right - simulate click on right side
        const mockEvent = {
          ...e,
          currentTarget: cardRef.current,
          clientX: cardRef.current ? cardRef.current.getBoundingClientRect().right - 10 : 0
        } as React.MouseEvent;
        onClick(mockEvent);
      } else {
        // Swipe left - simulate click on left side  
        const mockEvent = {
          ...e,
          currentTarget: cardRef.current,
          clientX: cardRef.current ? cardRef.current.getBoundingClientRect().left + 10 : 0
        } as React.MouseEvent;
        onClick(mockEvent);
      }
    } else {
      // Small movement - treat as regular click
      onClick(e as React.MouseEvent);
    }

    // Reset
    setIsDragging(false);
    setTranslateX(0);
  };

  return (
    <div 
      ref={cardRef}
      className="w-full h-full rounded-xl cursor-pointer transition-transform duration-200"
      style={{
        transform: `translateX(${translateX}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
      }}
      onClick={(e) => !isDragging && onClick(e)}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      {!isRevealed ? (
        <div className="w-full h-full rounded-xl flex items-center justify-center shadow-xl border-4" style={{background: 'linear-gradient(to bottom right, #4D2B8C, #85409D)', borderColor: '#EEA727'}}>
          <div className="text-center text-white">
            <div className="text-3xl font-bold mb-2">🎁</div>
            <div className="text-xl font-bold mb-2">Elefante Blanco</div>
            <div className="text-sm opacity-90 bg-black bg-opacity-20 rounded-lg px-3 py-1">
              Haz clic para revelar
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full rounded-xl flex items-center justify-center shadow-xl border-4 p-6" style={{backgroundColor: card ? getCardColor(card.type) : '#4D2B8C', borderColor: '#EEA727', color: card?.type === 'special' ? '#4D2B8C' : 'white'}}>
          <div className="text-center">
            <div className="text-xl font-bold leading-tight mb-3">
              {card?.instruction || 'Carta no encontrada'}
            </div>
            <div className="text-sm opacity-80 rounded-lg px-3 py-1 inline-block" style={{backgroundColor: card?.type === 'special' ? '#4D2B8C' : 'rgba(0,0,0,0.2)', color: card?.type === 'special' ? 'white' : 'inherit'}}>
              {card?.type === 'swap' && '🔄 Intercambio'}
              {card?.type === 'steal' && '🥷 Robo'}
              {card?.type === 'choose' && '🎯 Elección'}
              {card?.type === 'special' && '⭐ Especial'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
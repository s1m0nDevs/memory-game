import React from 'react';
import { Card } from './Card';

export const Board = ({ cards, flipped, handleCardFlip, solved, disabled }) => {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          value={card.value}
          flipped={Object.values(flipped).indexOf(card.id) > -1}
          solved={solved.includes(card.id)}
          handleCardFlip={handleCardFlip}
          disabled={disabled || solved.includes(card.id)}
        />
      ))}
    </div>
  );
};

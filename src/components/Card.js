import React from 'react';

export const Card = ({ handleCardFlip, id, value, flipped, solved, disabled }) => {
  return (
    <div
      className={`card ${solved ? 'success ' : ''} ${flipped ? 'flipped ' : ''}`}
      onClick={() => (disabled ? null : handleCardFlip(id))}>
      <div className={flipped ? 'front' : 'back'}>{flipped || solved ? value : 'Click me'}</div>
    </div>
  );
};

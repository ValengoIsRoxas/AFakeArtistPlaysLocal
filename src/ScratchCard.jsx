import React, { useState } from 'react';
import './ScratchCard.css';

const ScratchCard = ({onClick, children, label }) => {
  const [scratched, setScratched] = useState(false);

  const handleScratch = () => {
    setScratched(true);
  };

  return (
    <div className="scratch-card-container">
      {scratched ? (
        <div className="revealed-content">{children}</div>
      ) : (
        <div className="scratch-surface" onClick={handleScratch}>
          <span>{label || 'Toca para revelar'}</span>
        </div>
      )}
    </div>
  );
};

export default ScratchCard;
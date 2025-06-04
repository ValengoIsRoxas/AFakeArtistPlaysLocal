import React, { useState } from 'react';
import './ScratchCard.css';

const ScratchCard = ({ children, label, onScratch }) => {
  const [scratched, setScratched] = useState(false);

  const handleScratch = () => {
    setScratched(true);
    if (typeof onScratch === 'function') {
      onScratch();
    }
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
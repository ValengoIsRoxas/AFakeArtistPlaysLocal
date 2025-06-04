import React, { useRef, useEffect, useState } from 'react';
import './ScratchCard.css';

/**
 * Scratch card component that gradually reveals its children as
 * the user drags across the surface.
 */
const ScratchCard = ({ children, label = 'Rasca para revelar', onScratch }) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [started, setStarted] = useState(false);

useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#cecece';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineWidth = 30;
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const draw = (x, y) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleStart = (e) => {
    if (!started) {
      setStarted(true);
      if (typeof onScratch === 'function') onScratch();
    }
    isDrawing.current = true;
    const { x, y } = getPos(e);
    draw(x, y);
  };

  const handleMove = (e) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    draw(x, y);
  };

  const handleEnd = () => {
    isDrawing.current = false;
  };

  return (
    <div className="scratch-card-container">
      <div className="scratch-card-wrapper">
        <div className="scratch-card-content">{children}</div>
        <canvas
          ref={canvasRef}
          className="scratch-card-canvas"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
        {!started && (
          <div className="scratch-card-label">{label}</div>
        )}
      </div>
 
    </div>
  );
};

export default ScratchCard;

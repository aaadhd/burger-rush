
import React from 'react';

const ConfettiPiece: React.FC<{ index: number }> = ({ index }) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    width: '10px',
    height: '10px',
    backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
    opacity: 0,
    animation: `confetti-fall 3s linear infinite`,
    '--x': `${Math.random() * 100}vw`,
    '--y': `${Math.random() * 100}vh`,
    '--x-end': `${Math.random() * 200 - 50}vw`,
    '--y-end': `${window.innerHeight + 100}px`,
    animationDelay: `${Math.random() * 3}s`,
  } as React.CSSProperties;

  const keyframes = `
    @keyframes confetti-fall {
        0% { transform: translate(var(--x), var(--y)) rotate(0deg); opacity: 1; }
        100% { transform: translate(var(--x-end), var(--y-end)) rotate(720deg); opacity: 0; }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={style}></div>
    </>
  );
};

const Confetti: React.FC = () => {
  return (
    <>
      {Array.from({ length: 50 }).map((_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </>
  );
};

export default Confetti;

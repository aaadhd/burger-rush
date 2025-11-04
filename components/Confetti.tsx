
import React, { useEffect } from 'react';

interface ConfettiProps {
  trigger?: boolean;
  colors?: string[];
  particleCount?: number;
  duration?: number;
}

const ConfettiPiece: React.FC<{
  index: number;
  colors: string[];
  duration: number;
}> = ({ index, colors, duration }) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 8 + 4; // 4-12px
  const shape = Math.random() > 0.5 ? 'square' : 'circle';

  const style: React.CSSProperties = {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: randomColor,
    borderRadius: shape === 'circle' ? '50%' : '0',
    opacity: 1,
    animation: `confetti-fall-${index} ${duration}s ease-out forwards`,
    left: `${Math.random() * 100}%`,
    top: '-20px',
    zIndex: 9999,
    pointerEvents: 'none'
  };

  const animationDelay = Math.random() * 0.5;
  const xMovement = (Math.random() - 0.5) * 200;
  const rotation = Math.random() * 720;

  const keyframes = `
    @keyframes confetti-fall-${index} {
        0% {
          transform: translateY(0) translateX(0) rotate(0deg);
          opacity: 1;
        }
        10% {
          transform: translateY(50px) translateX(${xMovement * 0.2}px) rotate(${rotation * 0.2}deg);
        }
        100% {
          transform: translateY(calc(100vh + 50px)) translateX(${xMovement}px) rotate(${rotation}deg);
          opacity: 0;
        }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div
        style={{
          ...style,
          animationDelay: `${animationDelay}s`
        }}
      />
    </>
  );
};

const Confetti: React.FC<ConfettiProps> = ({
  trigger = true,
  colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'],
  particleCount = 50,
  duration = 3
}) => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      {Array.from({ length: particleCount }).map((_, i) => (
        <ConfettiPiece
          key={`${trigger}-${i}`}
          index={i}
          colors={colors}
          duration={duration}
        />
      ))}
    </div>
  );
};

// 성공 시 파티클 효과 컴포넌트
export const SuccessParticles: React.FC<{ trigger: boolean; teamColor: 'blue' | 'red' }> = ({
  trigger,
  teamColor
}) => {
  const teamColors = {
    blue: ['#3b82f6', '#1d4ed8', '#60a5fa', '#93c5fd'],
    red: ['#ef4444', '#dc2626', '#f87171', '#fca5a5']
  };

  return (
    <Confetti
      trigger={trigger}
      colors={teamColors[teamColor]}
      particleCount={30}
      duration={2}
    />
  );
};

export default Confetti;

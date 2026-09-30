import React, { useMemo } from 'react';

export const FloatingStars: React.FC = () => {
  // Generate random static positions so they don't re-render jitter
  const stars = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 95}%`,
      left: `${Math.random() * 98}%`,
      size: Math.random() * 12 + 6,
      opacity: Math.random() * 0.4 + 0.15,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 4 + 4}s`,
      isSparkle: i % 4 === 0,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute text-amber-300"
          style={{
            top: star.top,
            left: star.left,
            fontSize: `${star.size}px`,
            opacity: star.opacity,
            animation: `floatSlow ${star.duration} ease-in-out infinite, pulseGlow ${star.duration} ease-in-out infinite`,
            animationDelay: star.delay,
            filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.4))'
          }}
        >
          {star.isSparkle ? '✦' : '★'}
        </div>
      ))}
    </div>
  );
};

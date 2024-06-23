import React, { useEffect, useState } from 'react';

interface CountProps {
  from: number;
  to: number;
  duration: number;
  direction?: 'up' | 'down'; // Optional prop for direction
}

const easeOutQuad = (t: number) => t * (2 - t);

const Count: React.FC<CountProps> = ({ from, to, duration, direction = 'up' }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const start = from;
    const end = to;
    const range = Math.abs(end - start);
    const startTime = Date.now();
    const isCountingUp = direction === 'up';
    let animationFrameId: number;

    const updateCount = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const currentCount = isCountingUp
        ? Math.round(start + range * easedProgress)
        : Math.round(start - range * easedProgress);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
  }, [from, to, duration, direction]);

  return <>{count}</>;
};

export default Count;

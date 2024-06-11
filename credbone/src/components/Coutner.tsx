import React, { useEffect, useState } from 'react';

interface CountProps {
  from: number;
  to: number;
  duration: number;
  direction?: 'up' | 'down'; // New optional prop for direction
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
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [from, to, duration, direction]);

  return <>{count}</>;
};

export default Count;

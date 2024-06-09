import React, { useEffect, useState } from 'react';

interface CountProps {
  from: number;
  to: number;
  duration: number;
}

const easeOutQuad = (t: number) => t * (2 - t);

const Count: React.FC<CountProps> = ({ from, to, duration }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const start = from;
    const end = to;
    const range = end - start;
    const startTime = Date.now();

    const updateCount = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const currentCount = Math.round(start + range * easedProgress);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [from, to, duration]);

  return <div>{count}</div>;
};

export default Count;

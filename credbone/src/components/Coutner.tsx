import React, { useEffect, useState, useRef } from 'react';

interface CountProps {
  from?: number;
  to: number;
  duration: number;
}

const easeOutQuad = (t: number) => t * (2 - t);

const Count: React.FC<CountProps> = ({ from, to, duration }) => {
  const [count, setCount] = useState(from ?? 0);
  const lastValue = useRef(from ?? 0);

  useEffect(() => {
    const start = from !== undefined ? from : lastValue.current;
    const end = to;
    const range = Math.abs(end - start);
    const startTime = Date.now();
    const isCountingUp = start < end;
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
      } else {
        lastValue.current = end; // Update the lastValue when animation finishes
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
  }, [from, to, duration]);

  return <>{count}</>;
};

export default Count;

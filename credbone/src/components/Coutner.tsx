import React, { useEffect, useState, useRef } from 'react';

interface CountProps {
  from?: number;
  to: number;
  duration: number;
  start?: boolean; // Added start prop (default true)
}

const easeOutQuad = (t: number) => t * (2 - t);

const Count: React.FC<CountProps> = ({ from, to, duration, start = true }) => {
  const [count, setCount] = useState(from ?? 0);
  const lastValue = useRef(from ?? 0);

  useEffect(() => {
    if (!start) return; // If start is false, don't begin counting

    const startValue = from !== undefined ? from : lastValue.current;
    const end = to;
    const range = Math.abs(end - startValue);
    const startTime = Date.now();
    const isCountingUp = startValue < end;
    let animationFrameId: number;

    const updateCount = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const currentCount = isCountingUp
        ? Math.round(startValue + range * easedProgress)
        : Math.round(startValue - range * easedProgress);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        lastValue.current = end; // Update the lastValue when animation finishes
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId); // Cleanup on unmount
  }, [from, to, duration, start]);

  return <>{count}</>;
};

export default Count;

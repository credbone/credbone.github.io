import React from 'react';

// Heights that have a matching data-height value in control.css
type TickHeight = 5 | 6 | 8 | 10 | 12 | 14 | 15 | 16 | 18 | 20 | 25 | 30 | 35 | 36 | 40 | 45 | 50;

interface TickHeights {
  minor?: TickHeight;
  mid?: TickHeight;
  major?: TickHeight;
  center?: TickHeight;
}

interface TickComponentProps extends React.HTMLAttributes<HTMLElement> {
  tickCount: number; // The number of ticks you want
  majorEvery?: number; // Every Nth tick is major (0, N, 2N…)
  midEvery?: number; // Every Nth tick is mid, when not already major
  emphasizeEdges?: boolean; // First and last ticks are major
  emphasizeCenter?: boolean; // Center tick gets the center height
  heights?: TickHeights;
  [key: `data-${string}`]: string | number | boolean | undefined;
}

const defaultHeights: Required<TickHeights> = { minor: 10, mid: 18, major: 20, center: 30 };

const TickComponent: React.FC<TickComponentProps> = ({
  tickCount,
  majorEvery,
  midEvery,
  emphasizeEdges = true,
  emphasizeCenter = true,
  heights,
  ...rest
}) => {

  const middleIndex = Math.floor(tickCount / 2);
  const h = { ...defaultHeights, ...heights };

  const getHeight = (index: number) => {
    if (emphasizeCenter && index === middleIndex) return h.center;
    if (emphasizeEdges && (index === 0 || index === tickCount - 1)) return h.major;
    if (majorEvery && index % majorEvery === 0) return h.major;
    if (midEvery && index % midEvery === 0) return h.mid;
    return h.minor;
  };

  return (
    // rest is spread last so passed attributes override the defaults
    <group data-wrap="no" data-justify="space-between" data-align="end" {...rest}>
      {Array.from({ length: tickCount }, (_, index) => (
        <group
          data-length="1"
          data-background="neutral-stable"
          data-height={getHeight(index)}
          data-vertical=""
          key={index}
        ></group>
      ))}
    </group>
  );
};

export default TickComponent;

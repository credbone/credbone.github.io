import React from 'react';

interface TickComponentProps {
  tickCount: number; // The number of ticks you want
}

const TickComponent: React.FC<TickComponentProps> = ({ tickCount }) => {

  const middleIndex = Math.floor(tickCount / 2);

  return (
    <group data-wrap="no" data-justify="space-between" data-align="end">
      {Array.from({ length: tickCount }, (_, index) => (



        <group data-length="1"
         data-background="neutral-stable"
         data-height={index === 0 || index === tickCount - 1 ? 20 : index === middleIndex ? 30 : 15}
           data-vertical=""
            key={index}>
          {/* Tick {index + 1} */}
        </group>
      ))}
    </group>
  );
};

export default TickComponent;

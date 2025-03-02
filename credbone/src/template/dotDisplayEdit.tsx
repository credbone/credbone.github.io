import React, { useState } from 'react';

type GridProps = {
  activeIndexes?: Set<number>;
  isEditMode?: boolean;
};

const DotDisplayEdit: React.FC<GridProps> = ({ activeIndexes = new Set(), isEditMode = false }) => {
  const [currentActiveIndexes, setCurrentActiveIndexes] = useState<Set<number>>(new Set(activeIndexes));
  const [isMouseDown, setIsMouseDown] = useState(false);  // Track if mouse button is held down
  const rows = 16;
  const cols = 16;

  const handleCircleClick = (index: number) => {
    const newActiveIndexes = new Set(currentActiveIndexes);
    if (newActiveIndexes.has(index)) {
      newActiveIndexes.delete(index); // Remove if already active
    } else {
      newActiveIndexes.add(index); // Add if inactive
    }
    setCurrentActiveIndexes(newActiveIndexes);
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);  // Mouse button pressed down
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);  // Mouse button released
  };

  const handleMouseMove = (index: number) => {
    if (isMouseDown) {
      const newActiveIndexes = new Set(currentActiveIndexes);
      newActiveIndexes.add(index); // Keep adding as the mouse moves
      setCurrentActiveIndexes(newActiveIndexes);
    }
  };

  const getTextareaContent = () => {
    return Array.from(currentActiveIndexes).join(', ');
  };

  return (
    <div>
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {Array.from({ length: rows * cols }).map((_, index) => {
          const x = (index % cols) * 10 + 5;
          const y = Math.floor(index / cols) * 10 + 5;
          return (
            <Dot
              key={index}
              x={x}
              y={y}
              active={currentActiveIndexes.has(index)}
              onClick={() => isEditMode && handleCircleClick(index)}
              onMouseMove={() => isEditMode && handleMouseMove(index)}
            />
          );
        })}
      </svg>

      {isEditMode && (
        <textarea
          rows={4}
          cols={40}
          value={getTextareaContent()}
          readOnly
        />
      )}
    </div>
  );
};

type DotProps = {
  x: number;
  y: number;
  active: boolean;
  onClick: () => void;
  onMouseMove: () => void;  // Added onMouseMove handler
};

const Dot: React.FC<DotProps> = ({ x, y, active, onClick, onMouseMove }) => {
  return (
    <circle
      cx={x}
      cy={y}
      r="4"
      fill={active ? 'text' : 'lightgray'}
      onClick={onClick}
      onMouseMove={onMouseMove}  // Mouse move event for the dot
      style={{ cursor: 'pointer' }}
    />
  );
};

export default DotDisplayEdit;

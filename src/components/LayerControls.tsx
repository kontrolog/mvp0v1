import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface LayerControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
  disabled?: boolean;
}

export const LayerControls: React.FC<LayerControlsProps> = ({ onMove, disabled }) => {
  const buttonClass = `p-2 rounded-full ${
    disabled
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
      : 'bg-white hover:bg-gray-100 active:bg-gray-200 shadow-md'
  }`;

  return (
    <div className="absolute" style={{ inset: '-5px' }}>
      {/* Up Button */}
      <button
        className={`${buttonClass} absolute left-1/2 -translate-x-1/2`}
        style={{ top: '-35px' }}
        onClick={() => onMove('up')}
        disabled={disabled}
      >
        <ArrowUp size={18} />
      </button>

      {/* Down Button */}
      <button
        className={`${buttonClass} absolute left-1/2 -translate-x-1/2`}
        style={{ bottom: '-35px' }}
        onClick={() => onMove('down')}
        disabled={disabled}
      >
        <ArrowDown size={18} />
      </button>

      {/* Left Button */}
      <button
        className={`${buttonClass} absolute top-1/2 -translate-y-1/2`}
        style={{ left: '-35px' }}
        onClick={() => onMove('left')}
        disabled={disabled}
      >
        <ArrowLeft size={18} />
      </button>

      {/* Right Button */}
      <button
        className={`${buttonClass} absolute top-1/2 -translate-y-1/2`}
        style={{ right: '-35px' }}
        onClick={() => onMove('right')}
        disabled={disabled}
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
};
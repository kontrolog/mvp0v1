import React from 'react';

interface ScaleSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  disabled?: boolean;
}

export const ScaleSlider: React.FC<ScaleSliderProps> = ({
  value,
  onChange,
  min,
  max,
  disabled = false,
}) => {
  return (
    <div className="w-16 bg-white border-r p-2 flex items-center justify-center">
      <input
        type="range"
        min={min}
        max={max}
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        className="h-full w-3 appearance-none bg-transparent cursor-pointer
          [&::-webkit-slider-runnable-track]:bg-gray-200 
          [&::-webkit-slider-runnable-track]:rounded-full 
          [&::-webkit-slider-runnable-track]:h-2
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:h-4 
          [&::-webkit-slider-thumb]:w-4 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-blue-500
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:mt-[-5px]
          [&::-moz-range-track]:bg-gray-200
          [&::-moz-range-track]:rounded-full
          [&::-moz-range-track]:h-2
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-blue-500
          [&::-moz-range-thumb]:border-none
          [&::-moz-range-thumb]:shadow-md
          disabled:opacity-50
          disabled:cursor-not-allowed"
        style={{
          writingMode: 'bt-lr',
          WebkitAppearance: 'slider-vertical',
          transform: 'rotate(180deg)'
        }}
      />
    </div>
  );
};
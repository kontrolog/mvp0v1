import React from 'react';
import Joystick from '../Joystick';

interface JoystickControlsProps {
  onMove: (x: number, y: number) => void;
  onClose: () => void;
}

export const JoystickControls: React.FC<JoystickControlsProps> = ({
  onMove,
  onClose,
}) => {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-white border-t p-4 animate-slide-up">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <Joystick onMove={onMove} size={120} />
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Click to return to text input
          </button>
        </div>
      </div>
    </div>
  );
};
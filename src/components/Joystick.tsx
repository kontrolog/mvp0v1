import React, { useState, useCallback, useEffect } from 'react';

interface JoystickProps {
  onMove: (x: number, y: number) => void;
  size?: number;
}

const Joystick: React.FC<JoystickProps> = ({ onMove, size = 120 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const maxDistance = size / 3;

  const handleStart = useCallback((clientX: number, clientY: number, rect: DOMRect) => {
    setIsDragging(true);
    const x = clientX - rect.left - size / 2;
    const y = clientY - rect.top - size / 2;
    setPosition({ x, y });
  }, [size]);

  const handleMove = useCallback((clientX: number, clientY: number, rect: DOMRect) => {
    if (!isDragging) return;

    const x = clientX - rect.left - size / 2;
    const y = clientY - rect.top - size / 2;
    
    const distance = Math.sqrt(x * x + y * y);
    const angle = Math.atan2(y, x);
    
    const clampedX = Math.min(Math.max(Math.cos(angle) * Math.min(distance, maxDistance), -maxDistance), maxDistance);
    const clampedY = Math.min(Math.max(Math.sin(angle) * Math.min(distance, maxDistance), -maxDistance), maxDistance);
    
    setPosition({ x: clampedX, y: clampedY });
    onMove(clampedX / 3, clampedY / 3);
  }, [isDragging, maxDistance, onMove, size]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    onMove(0, 0);
  }, [onMove]);

  useEffect(() => {
    const handleMouseUp = () => handleEnd();
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleEnd]);

  return (
    <div 
      className="relative bg-gray-50 rounded-lg shadow-lg border-2 border-gray-200 touch-none"
      style={{ 
        width: size, 
        height: size,
        touchAction: 'none'
      }}
      onMouseDown={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        handleStart(e.clientX, e.clientY, rect);
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        handleMove(e.clientX, e.clientY, rect);
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY, rect);
      }}
      onTouchMove={(e) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY, rect);
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-1/3 h-full bg-gray-100 rounded-md opacity-50" />
        <div className="absolute w-full h-1/3 bg-gray-100 rounded-md opacity-50" />
      </div>
      
      <div
        className="absolute bg-blue-500 rounded-full shadow-lg transition-transform duration-50"
        style={{
          width: size / 2.5,
          height: size / 2.5,
          left: '50%',
          top: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </div>
  );
};

export default Joystick;
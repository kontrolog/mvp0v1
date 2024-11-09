import React, { forwardRef } from 'react';
import Draggable from 'react-draggable';
import type { Layer } from '../types';

interface MockupCanvasProps {
  layers: Layer[];
  selectedLayerIndex: number | null;
  showEditingTools: boolean;
  onSelectLayer: (index: number) => void;
  onLayerMove: (index: number, x: number, y: number) => void;
}

export const MockupCanvas = forwardRef<HTMLDivElement, MockupCanvasProps>(({
  layers,
  selectedLayerIndex,
  showEditingTools,
  onSelectLayer,
  onLayerMove,
}, ref) => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100 p-4">
      <div className="relative">
        <div 
          ref={ref}
          className="relative w-[300px] h-[300px] bg-white rounded-lg shadow-md"
        >
          {layers.map((layer, index) => (
            <Draggable
              key={index}
              position={{ x: layer.x, y: layer.y }}
              disabled={!showEditingTools || selectedLayerIndex !== index}
              onDrag={(e, data) => onLayerMove(index, data.x, data.y)}
            >
              <div 
                className={`absolute cursor-move ${
                  selectedLayerIndex === index ? 'opacity-100' : 'opacity-50'
                }`}
                onClick={() => onSelectLayer(index)}
              >
                {layer.type === 'text' ? (
                  <div
                    style={{
                      fontFamily: layer.font,
                      fontSize: layer.fontSize,
                      textAlign: 'center',
                      whiteSpace: 'pre-line',
                      userSelect: 'none',
                    }}
                  >
                    {layer.content}
                  </div>
                ) : (
                  <img
                    src={layer.content}
                    alt={layer.name}
                    style={{
                      width: layer.width,
                      height: layer.height,
                      transform: `scale(${layer.scaleFactor})`,
                      userSelect: 'none',
                    }}
                  />
                )}
              </div>
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  );
});

MockupCanvas.displayName = 'MockupCanvas';